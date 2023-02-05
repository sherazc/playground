import {registerDevice, setupNotification} from "./NotificationService";

const deviceName = "A"
const maxFailureCount = 3;
let failureCount = 0;
let successfullyRegistered = false;

const notifications = Array(10)
    .fill(1)
    .map((x, y) => x + y)
    .map(i => "N" + i);
/**
 * This example do not work
 */
(() => {
    notifications.every((notification) => {
        if (successfullyRegistered) {
            setupNotification(notification).then((n) => console.log(`Notification successfully set ${n}. Already device registered`));
        } else {
            registerDevice(deviceName)
                .then(result => {
                    successfullyRegistered = true;
                    setupNotification(notification).then((n) => console.log(`Notification successfully set ${n}. After registering device`));
                })
                .catch(error => {
                    failureCount++;
                    console.log(`Failed to setup ${notification}. failureCount=${failureCount}`)
                });
        }
        console.log(`every() ${failureCount < maxFailureCount}`);
        return failureCount < maxFailureCount;
    })
})();





