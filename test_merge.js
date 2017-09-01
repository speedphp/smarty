var merge = function() {
    var obj = {},
        i = 0,
        il = arguments.length,
        key;
    for (; i < il; i++) {
        for (key in arguments[i]) {
            if (arguments[i].hasOwnProperty(key)) {
                obj[key] = arguments[i][key];
            }
        }
    }
    return obj;
};

var t1 = {
    key1: 1,
    key2: "test",
    key3: [5, 2, 76, 21]
};
var t2 = {
    key1: {
        ik1: "hello",
        ik2: "world",
        ik3: 3
    }
};
var t3 = {
    key2: 3,
    key3: {
        t1: 1,
        t2: 2,
        t3: {
            a1: 1,
            a2: 3,
            a4: [21, 3, 42, "asd"]
        }
    }
};

console.log(merge(t1, t2));
console.log(merge(t1, t3));
console.log(merge(t2, t3));
console.log(merge(t1, t2, t3));
console.log(merge({}, t1, { key1: 1 }));