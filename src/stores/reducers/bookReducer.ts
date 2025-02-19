import { IBookState, BookAction, BookActionTypes } from "../../types";

const defaultState: IBookState = {
    books: {
        items: [],
        isError: false
    }
};

export const bookReducer = (
    state: IBookState = defaultState,
    action: BookAction
): IBookState => {
    switch (action.type) {
        case BookActionTypes.GET_BOOKS:
            return {
                ...state,
                books: {
                    ...state.books,
                    items: action.payload
                }
            };
        case BookActionTypes.CREATE_BOOK:
            return {
                ...state,
                books: {
                    ...state.books,
                    items: [...state.books.items, action.payload]
                }
            };
        case BookActionTypes.DELETE_BOOK:
            return {
                ...state,
                books: {
                    ...state.books,
                    items: state.books.items.filter(book => book.id !== action.payload)
                }
            };
        case BookActionTypes.UPDATE_BOOK:
            return {
                ...state,
                books: {
                    ...state.books,
                    items: state.books.items.map(book =>
                        book.id === action.payload.id ? action.payload : book
                    )
                }
            };
        case BookActionTypes.ERROR_BOOK:
            return {
                ...state,
                books: {
                    ...state.books,
                    isError: true
                }
            };
        default:
            return state;
    }
};


