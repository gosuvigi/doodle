/**
 * Created by ratoico on 8/21/15.
 */
var Fluxxor = require('fluxxor');
var DoodleConstants = require('../constants/DoodleConstants');

var DoodleStore = Fluxxor.createStore({

    initialize: function() {
        this.loading = false;
        this.error = null;
        this.templates = [];
        this.bindActions(
            DoodleConstants.LOAD_DOODLE_TEMPLATES, this.onLoadTemplates,
            DoodleConstants.LOAD_DOODLE_TEMPLATES_SUCCESS, this.onLoadTemplatesSuccess,
            DoodleConstants.LOAD_DOODLE_TEMPLATES_FAIL, this.onLoadTemplatesFail
        );
    },

    onLoadTemplates: function() {
        this.loading = true;
        this.emit("change");
    },

    onLoadTemplatesSuccess: function(payload) {
        this.loading = false;
        this.error = null;
        this.templates = payload.templates;
        this.emit("change");
    },

    onLoadTemplatesFail: function(payload) {
        this.loading = false;
        this.error = payload.error;
        this.emit("change");
    }

});

module.exports = DoodleStore;
