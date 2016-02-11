/**
 * Created by vigi on 2/7/2016.
 */
import { combineReducers } from 'redux'
import { LOAD_DOODLE_TEMPLATES, SELECT_DOODLE_TEMPLATE } from '../actions/actions'

const initialState = {
    selectedTemplate: {},
    templates: [{
        title: "Monday VUB",
        location: "VUB 1",
        dateTime: "Monday",
        initiator: "vigi",
        players: ["messi", "neymar", "suarez"],
        emailText: "gogo"
    }, {
        title: "Friday VUB",
        location: "VUB 2",
        dateTime: "Friday",
        initiator: "vigi",
        players: ["messi", "suarez"],
        emailText: "gogo"
    }]
}

function selectDoodleTemplate(previousState = initialState.selectedTemplate, action = '') {
    switch (action.type) {
        case SELECT_DOODLE_TEMPLATE:
            return action.selectedTemplate
        default:
            return previousState
    }
}

function loadDoodleTemplates(previousState = initialState.templates, action = '') {
    switch (action.type) {
        case LOAD_DOODLE_TEMPLATES:
            return action.templates
        default:
            return previousState
    }
}

const doodleReducer = combineReducers({
    selectedTemplate: selectDoodleTemplate,
    templates: loadDoodleTemplates
})

export default doodleReducer
