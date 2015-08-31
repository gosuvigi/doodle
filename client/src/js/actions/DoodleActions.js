/**
 * Created by ratoico on 8/21/15.
 */
/*
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * TodoActions
 */
var DoodleConstants = require('../constants/DoodleConstants');
var DoodleTemplatesClient = require('./DoodleTemplatesClient');

var DoodleActions = {

    loadDoodleTemplates: function() {
        this.dispatch(DoodleConstants.LOAD_DOODLE_TEMPLATES);

        DoodleTemplatesClient.load(function(templates) {
            this.dispatch(DoodleConstants.LOAD_DOODLE_TEMPLATES_SUCCESS, {templates: templates});
        }.bind(this), function(error) {
            this.dispatch(DoodleConstants.LOAD_DOODLE_TEMPLATES_FAIL, {error: error});
        }.bind(this));
    }

};

module.exports = DoodleActions;
