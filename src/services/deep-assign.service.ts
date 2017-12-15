import { Injectable } from '@angular/core';

@Injectable()
export class DeepAssignService {

    constructor(){}

    isObj = (x) => {
        const type = typeof x;
        return x !== null && (type === 'object' || type === 'function');
    };

    toObject = (val) => {
        if (val === null || val === undefined) {
            throw new TypeError('Sources cannot be null or undefined');
        }

        return Object(val);
    };

    deepAssign = (target, ...args) => {
        target = this.toObject(target);

        for (let s = 0; s < args.length; s++) {
            this.assign(target, args[s]);
        }

        return target;
    };

    assign = (to, from) => {
        if (to === from) {
            return to;
        }

        from = Object(from);

        for (let key in from) {
            if (Object.prototype.hasOwnProperty.call(from, key)) {
                this.assignKey(to, from, key);
            }
        }

        return to;
    };

    assignKey = (to, from, key) => {
        let val = from[key];

        if (val === undefined || val === null) {
            return;
        }

        if (Object.prototype.hasOwnProperty.call(to, key)) {
            if (to[key] === undefined || to[key] === null) {
                throw new TypeError('Cannot convert undefined or null to object (' + key + ')');
            }
        }

        if (!Object.prototype.hasOwnProperty.call(to, key) || !this.isObj(val)) {
            to[key] = val;
        } else {
            to[key] = this.assign(Object(to[key]), from[key]);
        }
    }

}

/*
var isObj = function (x) {
    var type = typeof x;
    return x !== null && (type === 'object' || type === 'function');
};
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
    if (val === null || val === undefined) {
        throw new TypeError('Sources cannot be null or undefined');
    }

    return Object(val);
}

function assignKey(to, from, key) {
    var val = from[key];

    if (val === undefined || val === null) {
        return;
    }

    if (hasOwnProperty.call(to, key)) {
        if (to[key] === undefined || to[key] === null) {
            throw new TypeError('Cannot convert undefined or null to object (' + key + ')');
        }
    }

    if (!hasOwnProperty.call(to, key) || !isObj(val)) {
        to[key] = val;
    } else {
        to[key] = assign(Object(to[key]), from[key]);
    }
}

function assign(to, from) {
    if (to === from) {
        return to;
    }

    from = Object(from);

    for (var key in from) {
        if (hasOwnProperty.call(from, key)) {
            assignKey(to, from, key);
        }
    }

    return to;
}

export function deepAssign(target, ...args) {
    target = toObject(target);

    for (var s = 0; s < args.length; s++) {
        assign(target, args[s]);
    }

    return target;
}*/
