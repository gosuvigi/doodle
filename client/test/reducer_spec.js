/**
 * Created by vigi on 9/21/15:3:31 PM.
 */
import {List, Map, fromJS} from 'immutable'
import {expect} from 'chai'

import reducer from '../src/js/reducer'

describe('reducer', () => {

    it('has an initial state', () => {
        const action = {
            type: 'BOGUS'
        };

        const nextState = reducer(undefined, action);

        expect(nextState).to.equal(fromJS({
            templates: [],
            selectedTemplate: {}
        }));
    });

    it('handles LOAD_DOODLE_TEMPLATES', () => {
        const oldTemplates = List()
        const initialState = Map({templates: oldTemplates});
        const newTemplates = [{
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
        }];
        const action = {
            type: 'LOAD_DOODLE_TEMPLATES',
            templates: newTemplates
        };

        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            templates: List(newTemplates)
        }));
    });

    it('handles SELECT_DOODLE_TEMPLATE', () => {
        const oldTemplate = fromJS({
            id: 666,
            name: "play football",
            title: "football indoor"
        });
        const newTemplate = {
            id: 1,
            name: "indoor",
            title: "football indoor",
            location: "the wall",
            dateTime: 1442839798856,
            initiator: "hodor 1",
            emailText: "text 1",
            recipients: [
                {id: 666, firstName: "gogu", lastName: null, email: "gogu@gogu.com", active: false},
                {id: 667, firstName: "hodor", lastName: null, email: "hodor@hodor.com", active: false}
            ]
        };
        const initialState = Map({selectedTemplate: oldTemplate});
        const action = {
            type: 'SELECT_DOODLE_TEMPLATE',
            selectedTemplate: newTemplate
        };

        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            selectedTemplate: newTemplate
        }));
    });
});