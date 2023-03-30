import { FORM_EMAIL, SAVE_USER, REMOVE_USER, THEME_CHANGE, GET_QUANTITY } from '../types/types';

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
    theme : false,
    quantity : 0
}
const defaultState = userInfo ? { userInfo } : { ...initialDefaultState };

const login = (state = defaultState, action) => {
    switch (action.type) {
        case FORM_EMAIL:
            return { ...state, ...action };
        case SAVE_USER:
            return { userInfo: action.userInfo };
        case GET_QUANTITY:
            return { ...state, quantity : action.quantity };
        case THEME_CHANGE:
            return { ...state, [action.field] : action.value };
        case REMOVE_USER:
            return { ...initialDefaultState };
        default:
            return defaultState;
    }
};

export default login;