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
            };
        case "CREATE_BOOK":
            return {
                ...state,
                books: {
                    ...state.books,
                    items: [...state.books.items, action.payload] // Добавление новой книги
                }
            };
        case "DELETE_BOOK":
            return {
                ...state,
                books: {
                    ...state.books,
                    items: state.books.items.filter(book => book.id !== action.payload) // Удаление книги по id
                }
            };
        case "UPDATE_BOOK":
            return {
                ...state,
                books: {
                    ...state.books,
                    items: state.books.items.map(book =>
                        book.id === action.payload.id ? action.payload : book // Обновление информации о книге
                    )
                }
            };
        case "ERROR_BOOK":
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
}

