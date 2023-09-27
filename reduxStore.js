import { configureStore } from '@reduxjs/toolkit'
// Initial state
const initialState = {
    fullName: '',
    userName: '',
    email: '',
    address: '',
};

// Reducer
function userReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_USERNAME':
            return {
                ...state,
                userName: action.payload,
            };
        case 'SET_EMAIL':
            return {
                ...state,
                email: action.payload,
            };
        case 'SET_FULLNAME':
            return {
                ...state,
                fullName: action.payload,
            };
        case 'SET_ADDRESS':
            return {
                ...state,
                address: action.payload,
            };
        default:
            return state;
    }
}
const rootReducer = {
    user: userReducer,
};

// Create store
export const store = configureStore({ reducer: rootReducer });