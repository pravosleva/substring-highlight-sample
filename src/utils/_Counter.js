// const makeCounter = () => {
//     let counter = 0;

//     return {
//         inc: (step = 1) => counter += step,
//     }
// }

export class Counter {
    constructor (defaultState = 0, step = 1, timestamp = new Date().getTime()) {
        this.state = defaultState;
        this.timestamp = timestamp;
        this.step = step;
    }
    getValue (name) {
        return this[name];
    }
    inc() {
        this.state += this.step;
        this.timestamp = new Date().getTime();
    }
}
