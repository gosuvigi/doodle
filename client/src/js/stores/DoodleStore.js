/**
 * Created by ratoico on 8/21/15.
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var DoodleConstants = require('../constants/DoodleConstants');
var assign = require('object-assign');
var $ = require('jquery');
var CHANGE_EVENT = 'change';
var _templates = {};


var DoodleStore = assign({}, EventEmitter.prototype, {

    /**
     * Get the entire collection of TODOs.
     * @return {object}
     */
    getAll: function() {
        $.ajax({
            url: "/templates",
            dataType: 'json',
            cache: false,
            success: function (data) {
                for (var i = 0; i < data.length; i++) {
                    var templ = data[i];
                    templates.push(templ);
                }
            },
            fail: function (xhr, status, err) {
                console.error("/templates", status, err.toString());
            }
        });
        return _templates;
    },
    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },
    /**
     * @param {function} callback
     */
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },
    /**
     * @param {function} callback
     */
    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});
// Register callback to handle load all templates
AppDispatcher.register(function(action) {
    var text;
    switch(action.actionType) {
        case DoodleConstants.LOAD_DOODLE_TEMPLATES:
            DoodleStore.emitChange();
            break;
        default:
// no op
    }
});
module.exports = DoodleStore;
