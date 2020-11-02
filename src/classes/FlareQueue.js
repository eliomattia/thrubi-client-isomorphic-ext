class FlareQueue {
    static queue = Promise.resolve();

    static addToQueue(f) {
        this.queue = this.queue.then(f);
    }
}

export default FlareQueue;