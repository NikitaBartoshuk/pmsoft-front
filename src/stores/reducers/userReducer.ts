import { IUserState, UserAction, UserActionTypes } from "../../types";

const defaultState: IUserState = {
    token: ''
};

export const userReducer = (
    state: IUserState = defaultState,
    action: UserAction
): IUserState => {
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
