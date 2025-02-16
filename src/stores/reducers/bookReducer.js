export const defaultState = {
    books: {
        items: [],
        isError: false
    }
}

export const bookReducer = (state = defaultState, action) => {
    switch (action.type) {
        case "GET_BOOKS":
            return {
                ...state,
                books: {
                    ...state.books,
                    items: action.payload
                }
            }
        default:
            return state
    }
}