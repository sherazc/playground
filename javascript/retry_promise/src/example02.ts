import {registerDevice, setupNotification} from "./NotificationService";

const deviceName = "B"
const maxFailureCount = 3;
let failureCount = 0;
let successfullyRegistered = false;

const notifications = Array(10)
    .fill(1)
    .map((x, y) => x + y)
    .map(i => "N" + i);


const process = async () => {
    for(const notification of notifications) {
        if (failureCount >= maxFailureCount) {
            return
        }
        try {
            if (successfullyRegistered) {
                await setupNotification(notification);
            } else {
                await registerDevice(deviceName);
                successfullyRegistered = true;
                await setupNotification(notification);
            }
        } catch (e) {
            failureCount++
        }

    }
}


process().then(() => console.log('Done!'));






