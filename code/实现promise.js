setInterval(() => {

}, 10000);

function myPromise(executor) {
    const self = this;
    self.status = "PENDING";
    self.value = null;
    self.error = null;
    self.onFulfilled = null;
    self.onRejected = null;

    function resolve(value) {
        if (self.status !== "PENDING")
            return;
        self.status = "FUlLFILLED";
        self.value = value;
        self.onFulfilled(value);
    };

    function reject(error) {
        if (self.status !== "PENDING")
            return;
        self.status = "REJECTED";
        self.error = error;
        self.onRejected(error);
    }

    executor(resolve, reject);
};

myPromise.prototype.then = function(onFulfilled, onRejected) {
    if (this.status === "PENDING") {
        this.onFulfilled = onFulfilled;
        this.onRejected = onRejected;
    };

    if (this.status === "FUlLFILLED") {
        this.onFulfilled(this.value);
    };

    if (this.status === "REJECTED") {
        this.onRejected(this.error);
    };

    return;
};



new myPromise(resolve => {
    setTimeout(resolve.bind(null, 1), 1000);
}).then(data => {
    console.log(data);
})