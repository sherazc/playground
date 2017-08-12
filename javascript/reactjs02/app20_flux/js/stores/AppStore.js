var AppDispatcher = require("../dispatcher/AppDispatcher");
var AppConstants = require("../dispatcher/AppConstants");
var EventEmitter = require("events").EventEmitter;
var assign = require("object-assign");
var AppApi = require("../utils/AppApi");

var CHANGE_EVENT = "change";

var _items = [];

var AppStore = assign({}, EventEmitter.prototype, {
    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },
    addChangeListener: function (callback) {
        this.on("change", callback)
    },
    removeChangeListner: function (callback) {
        this.removeListener("change", callback);
    }
});

AppDispatcher.register(function (payload) {
    var action = payload.action;

    switch (action.actionType) {

    }
    return true;
});

module.exports = AppStore;