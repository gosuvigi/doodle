/**
 * Created by vigi on 9/21/15:5:07 PM.
 */

/*
 * Action types
 */

export const LOAD_DOODLE_TEMPLATES = "LOAD_DOODLE_TEMPLATES";
export const SELECT_DOODLE_TEMPLATE = 'SELECT_DOODLE_TEMPLATE';

/**
 *
 * Action creators
 */

/**
 *
 * @param templates
 * @returns {{type: string, templates: *}}
 */
export function loadDoodleTemplates(templates) {
    return {
        type: LOAD_DOODLE_TEMPLATES,
        templates: templates
    };
}

/**
 *
 * @param template
 * @returns {{type: string, selectedTemplate: *}}
 */
export function selectDoodleTemplate(template) {
    return {
        type: SELECT_DOODLE_TEMPLATE,
        selectedTemplate: template
    };
}
