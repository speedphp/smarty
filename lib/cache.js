exports = module.exports = {
    _data: Object.create(null),

    set: function set(key, val) {
        this._data[key] = val;
    },

    get: function get(key) {
        return this._data[key];
    }
};

// TODO： 测试是否真能缓存，如果在module里面用的话
