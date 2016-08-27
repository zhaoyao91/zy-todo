import SO from '../lib/simple-observable';

export default {
    count1: new SO(0),
    count2: new SO(2),
    app: {
        show: new SO(1)
    }
}