/**
 * Created by vigi on 9/21/15:1:52 PM.
 */
import {Map, List, fromJS} from 'immutable'
import {LOAD_DOODLE_TEMPLATES, SELECT_DOODLE_TEMPLATE} from './constants/DoodleConstants'

const initialState = fromJS({
    templates: List(),
    selectedTemplate: fromJS({})
});

export default function (state = initialState, action = '') {
    switch (action.type) {
        case LOAD_DOODLE_TEMPLATES:
            return loadTemplates(state, action.templates);
        case SELECT_DOODLE_TEMPLATE:
            return selectDoodleTemplate(state, action.selectedTemplate);
    }
    return state;
};

function loadTemplates(state, doodleTemplates) {
    return state.set('templates', List(doodleTemplates));
}

function selectDoodleTemplate(state, doodleTemplate) {
    var template = state.set('selectedTemplate', fromJS(doodleTemplate));
    console.log('--- state: ' + template);
    return template;
}
