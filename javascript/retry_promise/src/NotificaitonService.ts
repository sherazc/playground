/**
 * How can I keep this function pure that it would not depend on global variable?
 * @param name
 */

export const registerDevice = (name: string) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if ("B" === name) {
                console.log(`Can not register device ${name}`)
                reject(`Failed to register ${name}...`);
            } else {
                console.log(`Successfully register device ${name}`)
                resolve(name);
            }
        }, 1000);
    });
}

export const setupNotification = (notification: string) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(notification);
        }, 500);
    });
}