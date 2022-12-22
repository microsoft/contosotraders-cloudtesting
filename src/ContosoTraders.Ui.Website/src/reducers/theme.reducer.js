import { THEME_CHANGE } from "../types/types";

const defaultState = {
    theme : false
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case THEME_CHANGE:
            return { ...state, [action.field] : action.value };
        default:
            return state;
    }
};