import { FORM_EMAIL, SAVE_USER, REMOVE_USER, THEME_CHANGE, GET_QUANTITY } from '../types/types';

export const textAction = email => ({
    type: FORM_EMAIL,
    email,
});

export const submitAction = userInfo => ({
    type: SAVE_USER,
    userInfo
});

export const clickAction = () => ({
    type: REMOVE_USER,
});

export const handleThemeChange = (value) => ({
    type  : THEME_CHANGE,
    value : value,
    field : 'theme'
});

export const getCartQuantity = (quantity) => ({
    type : GET_QUANTITY,
    quantity : quantity
});