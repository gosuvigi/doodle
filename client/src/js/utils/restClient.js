/**
 * Created by vigi on 3/20/2016.
 */
'use strict'

var rest = require('rest')
var defaultRequest = require('rest/interceptor/defaultRequest')
var mime = require('rest/interceptor/mime')
var uriTemplateInterceptor = require('./uriTemplateInterceptor')
var errorCode = require('rest/interceptor/errorCode')
var baseRegistry = require('rest/mime/registry')

var registry = baseRegistry.child()

registry.register('text/uri-list', require('./uriListConverter'))
registry.register('application/json', require('rest/mime/type/application/json'))

module.exports.restClient = rest
    .wrap(mime, { registry: registry })
    .wrap(uriTemplateInterceptor)
    .wrap(errorCode)
    .wrap(defaultRequest, { headers: { 'Accept': 'application/json' }})