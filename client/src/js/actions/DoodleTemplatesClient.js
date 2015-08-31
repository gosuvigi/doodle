/**
 * Created by ratoico on 8/31/15.
 */
var $ = require('jquery');

var DoodleTemplatesClient = {
    load: function (success, failure) {
            var result = $.ajax({
                url: "/doodle/templates",
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