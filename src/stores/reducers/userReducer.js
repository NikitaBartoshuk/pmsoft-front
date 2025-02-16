const defaultState = {
    token: ''
}

export const userReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'REG_USER' :
            return {
                ...state,
                token: action.payload
            }

        case 'LOGIN_USER':
            return {
                ...state,
                token: action.payload
            }


        default:
            return state
    }
}