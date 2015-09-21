/**
 * Created by vigi on 9/21/15:1:52 PM.
 */
import {Map, List} from 'immutable'

export default function (state = Map(), action = '') {
    switch (action.type) {
        case 'LOAD_DOODLE_TEMPLATES':
            return loadTemplates(state, action.templates);
        case 'SELECT_DOODLE_TEMPLATE':
            return selectDoodleTemplate(state, action.selectedTemplate);
    }
    return state;
};

function loadTemplates(state, doodleTemplates) {
    return state.set('templates', List(doodleTemplates));
}

function selectDoodleTemplate(state, doodleTemplate) {
    var state = state.set('selectedTemplate', doodleTemplate);
    return state;
}
