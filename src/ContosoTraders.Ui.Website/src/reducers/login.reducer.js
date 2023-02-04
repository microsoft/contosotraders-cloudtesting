import { FORM_EMAIL, SAVE_USER, REMOVE_USER, THEME_CHANGE } from '../types/types';

let userInfo = JSON.parse(localStorage.getItem('state'));

const initialDefaultState = {
    userInfo: {
        loggedIn: false,
        token: '',
        user: {
            email: '',
            type: ''
        }
    },
    theme : false
}
const defaultState = userInfo ? { userInfo } : { ...initialDefaultState };

const login = (state = defaultState, action) => {
    switch (action.type) {
        case FORM_EMAIL:
            return { ...state, ...action };
        case SAVE_USER:
            return { userInfo: action.userInfo };
        case THEME_CHANGE:
            return { ...state, [action.field] : action.value };
        case REMOVE_USER:
            return { ...initialDefaultState };
        default:
            return defaultState;
    }
};

export default login;