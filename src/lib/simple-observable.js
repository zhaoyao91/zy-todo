export default class SimpleObservable {
    constructor(value) {
        this._value = value;
        this._callbacks = new Set();
    }

    set(value) {
        this._value = value;
    }

    get() {
        return this._value;
    }

    subscribe(callback) {
        this._callbacks.add(callback);
        callback(this._value);
        return ()=> this._callbacks.delete(callback);

    }

    update(value, force) {
        if (force || this._value !== value) {
            this._value = value;
            this._callbacks.forEach(callback=>callback(this._value))
        }
    }
}