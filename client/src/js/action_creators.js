/**
 * Created by vigi on 9/21/15:5:07 PM.
 */
export function loadDoodleTemplates(templates) {
    return {
        type: 'LOAD_DOODLE_TEMPLATES',
        templates: templates
    };
}

export function selectDoodleTemplate(template) {
    return {
        type: 'SELECT_DOODLE_TEMPLATE',
        selectedTemplate: template
    };
}
