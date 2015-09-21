/**
 * Created by vigi on 9/21/15:3:31 PM.
 */
import {List, Map, fromJS} from 'immutable'
import {expect} from 'chai'

import reducer from '../src/js/reducer'

describe('reducer', () => {

    it('handles LOAD_DOODLE_TEMPLATES', () => {
        const initialState = Map();
        const action = {
            type: 'LOAD_DOODLE_TEMPLATES',
            templates: [{
                "id": 1,
                "name": "indoor",
                "title": "football indoor",
                "location": "the wall",
                "dateTime": 1442839798856,
                "initiator": "hodor 1",
                "emailText": "text 1",
                "recipients": [
                    {"id": 666, "firstName": "gogu", "lastName": null, "email": "gogu@gogu.com", "active": false},
                    {"id": 667, "firstName": "hodor", "lastName": null, "email": "hodor@hodor.com", "active": false}
                ]
            }, {
                "id": 2,
                "name": "outdoor",
                "title": "football outdoor",
                "location": "vub",
                "dateTime": 1442839798858,
                "initiator": "hodor 2",
                "emailText": "please come before 20:50",
                "recipients": [
                    {"id": null, "firstName": "gogu", "lastName": null, "email": "gogu@gogu.com", "active": false},
                    {"id": null, "firstName": "hodor", "lastName": null, "email": "hodor@hodor.com", "active": false}
                ]
            }]
        };

        const nextState = reducer(initialState, action);

        expect(nextState.get('templates').size).to.equal(2);
        expect(nextState.get('templates').get(0).id).to.equal(1);
        expect(nextState.get('templates').get(1).id).to.equal(2);
    });

    it('handles SELECT_DOODLE_TEMPLATE', () => {
        const initialState = Map();
        const action = {
            type: 'SELECT_DOODLE_TEMPLATE',
            selectedTemplate: {
                "id": 1,
                "name": "indoor",
                "title": "football indoor",
                "location": "the wall",
                "dateTime": 1442839798856,
                "initiator": "hodor 1",
                "emailText": "text 1",
                "recipients": [
                    {"id": 666, "firstName": "gogu", "lastName": null, "email": "gogu@gogu.com", "active": false},
                    {"id": 667, "firstName": "hodor", "lastName": null, "email": "hodor@hodor.com", "active": false}
                ]
            }
        };

        const nextState = reducer(initialState, action);

        expect(nextState.get('selectedTemplate').id).to.equal(1);
    });
});