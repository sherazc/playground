# Deploy Todo App to AWS ECS (Fargate + EFS)

Console runbook. Single task, public IP, no load balancer, SQLite on EFS.

Assumptions:
- Container runs as `app` (uid/gid 2001), listens on 8080, `APP_DB_PATH=/data/todo.db`.
- Default VPC, public subnets. Replace `<ACCOUNT_ID>` and `<REGION>` everywhere.

## 1. Build and push the image (ECR)

1. Console: **ECR > Private registry > Repositories > Create repository**. Name `todo`, leave defaults, **Create**.
2. From the repo root:

```bash
aws ecr get-login-password --region <REGION> \
  | docker login --username AWS --password-stdin <ACCOUNT_ID>.dkr.ecr.<REGION>.amazonaws.com

docker buildx build --platform linux/amd64 \
  -t <ACCOUNT_ID>.dkr.ecr.<REGION>.amazonaws.com/todo:latest --push .
```

**Apple Silicon note:** the `--platform linux/amd64` flag is required, otherwise the task fails with `exec format error`. Alternative: build `linux/arm64` and set the task's CPU architecture to ARM64 in step 5 (cheaper).

3. Confirm the `latest` tag appears in the `todo` repo.

## 2. Security groups

**EC2 > Security Groups > Create security group** (VPC: default), twice:

1. `todo-app-sg`: description "todo app". Inbound: Custom TCP, port `8080`, source **My IP**. Outbound: default (all).
2. `todo-efs-sg`: description "todo efs". Inbound: **NFS** (TCP 2049), source **Custom > `todo-app-sg`**.

## 3. EFS

1. **EFS > Create file system > Customize**. Name `todo-data`, Regional, leave encryption on. **Next**.
2. Network: VPC default. Mount targets: one per AZ, select the default subnets, security group `todo-efs-sg` (remove the default SG). **Next > Next > Create**.
3. Wait until the file system and mount targets show **Available**.
4. Open the file system > **Access points > Create access point**:
   - Name `todo`
   - Root directory path: `/todo`
   - POSIX user: User ID `2001`, Group ID `2001`
   - Root directory creation permissions: Owner UID `2001`, Owner GID `2001`, Permissions `755`
   - **Create access point**

## 4. IAM: task execution role

1. **IAM > Roles**: search `ecsTaskExecutionRole`. If it exists, skip.
2. Otherwise **Create role** > AWS service > Elastic Container Service > **Elastic Container Service Task**. Attach `AmazonECSTaskExecutionRolePolicy`. Name `ecsTaskExecutionRole`.
3. No task role is needed. EFS access is authorized through the security group and access point (no IAM authorization).

## 5. ECS cluster and task definition

1. **ECS > Clusters > Create cluster**. Name `todo-cluster`, infrastructure **AWS Fargate** only. **Create**.
2. **ECS > Task definitions > Create new task definition**:
   - Family: `todo`
   - Launch type: **AWS Fargate**; OS/Architecture: **Linux/X86_64** (or ARM64 if you built arm64)
   - CPU `.25 vCPU`, Memory `1 GB` (0.5 GB may be tight for the JVM)
   - Task execution role: `ecsTaskExecutionRole`
3. Container 1:
   - Name `todo`
   - Image URI: `<ACCOUNT_ID>.dkr.ecr.<REGION>.amazonaws.com/todo:latest`
   - Container port `8080`, protocol TCP
   - Environment variable: `APP_DB_PATH` = `/data/todo.db`
   - Logging: **Use log collection** (awslogs) on; the log group is auto-created (`/ecs/todo`)
   - Mount points: source volume `todo-data`, container path `/data` (add after the volume exists; see below)
4. **Storage > Add volume**:
   - Name `todo-data`, type **EFS**
   - File system ID: `todo-data`
   - Access point ID: the `todo` access point
   - Transit encryption: **Enabled**
   - Root directory: `/` (the access point already sets the path)
5. Back in the container, add the mount point `todo-data` -> `/data` (read-only unchecked). **Create**.

## 6. Service

1. Cluster `todo-cluster` > **Services > Create**.
2. Compute: **Launch type > FARGATE**, platform version **LATEST** (EFS needs >= 1.4.0).
3. Deployment: application type **Service**, family `todo`, revision latest. Service name `todo-svc`. Desired tasks `1`.
4. Deployment options: rolling update, **Min running tasks 0%**, **Max running tasks 100%**. This stops the old task before the new one starts, so two tasks never touch the SQLite file.
5. Networking: VPC default, select public subnets only, security group `todo-app-sg` (remove default), **Public IP: Turned on**.
6. No load balancer. **Create**.

## 7. Open the app

1. Cluster > **Services > todo-svc > Tasks** > open the task. Wait for **Last status: Running**.
2. Copy the **Public IP** from the Configuration section.
3. Browse to `http://<public-ip>:8080`.

The IP changes on every new task, and there is no HTTPS.

## Verification (persistence test)

1. Add a todo in the UI.
2. **ECS > Clusters > todo-cluster > Services > todo-svc > Update > Force new deployment** > **Update**.
3. Wait for the old task to stop and the new one to run. Get its new public IP.
4. Reload the app at the new IP: the todo must still be there. That proves EFS persistence.
5. Logs: task > **Logs** tab, or CloudWatch log group `/ecs/todo`.

## Teardown (stop billing)

Do in this order:

1. ECS service `todo-svc`: **Delete** (check **Force delete**). Then delete cluster `todo-cluster`.
2. Task definitions `todo`: select all revisions > **Actions > Deregister** (no cost, tidy only).
3. **EFS**: delete file system `todo-data` (type its ID to confirm). This also removes mount targets and the access point.
4. **ECR**: delete repo `todo` (with images).
5. **EC2 > Security Groups**: delete `todo-efs-sg` first, then `todo-app-sg`.
6. **CloudWatch > Log groups**: delete `/ecs/todo`.
7. Leave `ecsTaskExecutionRole` (free, reusable).

## Troubleshooting

- **Task stops immediately:** open the stopped task > **Stopped reason** and container logs. `exec format error` means an architecture mismatch (rebuild with `--platform linux/amd64` or match the task's CPU architecture). Exit code 137 suggests out of memory: raise memory to 2 GB.
- **CannotPullContainerError:** check the image URI and tag exist in ECR. Tasks in public subnets need **Public IP on** to reach ECR. Verify the execution role has `AmazonECSTaskExecutionRolePolicy`.
- **EFS mount timeout (`ResourceInitializationError ... mount.nfs4 timed out`):** check `todo-efs-sg` allows TCP 2049 from `todo-app-sg`, that mount targets exist in the AZ/subnet the task landed in and are Available, and that the platform version is >= 1.4.0.
- **Permission denied on /data:** the access point must have POSIX uid/gid `2001` and creation permissions `755` with owner 2001:2001, and the image must run as uid 2001. If you created the access point with the wrong values, delete it, recreate it, and update the task definition (new revision) and service.
- **Page does not load but the task is Running:** confirm `todo-app-sg` allows 8080 from your current IP (it changes), and use `http`, not `https`.