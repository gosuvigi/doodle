/**
 * Created by vigi on 2/7/2016.
 */
// import { combineReducers } from 'redux'
// import { reducer as formReducer } from 'redux-form'
import { LOAD_DOODLE_TEMPLATES, SELECT_DOODLE_TEMPLATE } from '../actions/actions'

export const initialState = {
    selectedTemplate: {},
    templates: []
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


// const doodleReducers = combineReducers({
//     selectedTemplate: selectDoodleTemplate,
//     templates: loadDoodleTemplates,
//     form: formReducer // Mounted at 'form', redux-form
// })
//
// export default doodleReducers
