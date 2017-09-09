use mydb

db.createUser(
    {
        user: "myuser",
        pwd: "password123",
        roles: [
            { role: "readWrite", db: "mydb" }
        ]
    }
);

db.dropUser("myuser");