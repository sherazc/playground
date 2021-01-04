export const longRunningTask = (count: number = 20) => {
    let index = 0
    const interval = setInterval(() => {
        console.log(`######### Long running task ${index} ${new Date().toISOString()}`);

        for(let i = 0; i<100000; i++) {
            const k = `${i} ${i} ${i} `
        }
        if (index++ > count) {
            clearInterval(interval);
        }
    }, 1000);
}