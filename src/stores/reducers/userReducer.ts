import { UserState, UserAction, UserActionTypes } from "../../types";

const defaultState: UserState = {
    token: ''
};

export const userReducer = (
    state: UserState = defaultState,
    action: UserAction
): UserState => {
    switch (action.type) {
        case UserActionTypes.REG_USER:
        case UserActionTypes.LOGIN_USER:
            return {
                ...state,
                token: action.payload
            };

        default:
            return state;
    }
};
