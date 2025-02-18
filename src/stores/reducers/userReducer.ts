interface UserState {
    token: string;
}

const defaultState: UserState = {
    token: ''
};

interface RegUserAction {
    type: 'REG_USER';
    payload: string;
}

interface LoginUserAction {
    type: 'LOGIN_USER';
    payload: string;
}

type UserAction = RegUserAction | LoginUserAction;

export const userReducer = (state: UserState = defaultState, action: UserAction): UserState => {
    switch (action.type) {
        case 'REG_USER':
        case 'LOGIN_USER':
            return {
                ...state,
                token: action.payload
            };

        default:
            return state;
    }
};
