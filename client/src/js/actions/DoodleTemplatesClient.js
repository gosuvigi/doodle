/**
 * Created by ratoico on 8/31/15.
 */
var $ = require('jquery');

var templatesUrl = (process.env.NODE_ENV === 'production' ? 'templates' : 'http://158.166.39.148:8080/doodle/templates');

var DoodleTemplatesClient = {
    load: function (success, failure) {
        var result = $.ajax({
            url: templatesUrl,
            dataType: 'json',
            cache: false
        }).done(function (data) {
            success(data);
        }).fail(function () {
            console.error("/doodle/templates", status, err.toString());
        });
    }
};

module.exports = DoodleTemplatesClient;