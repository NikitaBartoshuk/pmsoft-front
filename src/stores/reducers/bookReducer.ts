interface Book {
    id: number;
    title: string;
    author: string;
    genre: string;
}

interface BookState {
    books: {
        items: Book[];
        isError: boolean;
    };
}

const defaultState: BookState = {
    books: {
        items: [],
        isError: false
    }
};

interface GetBooksAction {
    type: "GET_BOOKS";
    payload: Book[];
}

interface CreateBookAction {
    type: "CREATE_BOOK";
    payload: Book;
}

interface DeleteBookAction {
    type: "DELETE_BOOK";
    payload: number;
}

interface UpdateBookAction {
    type: "UPDATE_BOOK";
    payload: Book;
}

interface ErrorBookAction {
    type: "ERROR_BOOK";
}

type BookAction = GetBooksAction | CreateBookAction | DeleteBookAction | UpdateBookAction | ErrorBookAction;

export const bookReducer = (state: BookState = defaultState, action: BookAction): BookState => {
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
                    items: [...state.books.items, action.payload]
                }
            };
        case "DELETE_BOOK":
            return {
                ...state,
                books: {
                    ...state.books,
                    items: state.books.items.filter(book => book.id !== action.payload)
                }
            };
        case "UPDATE_BOOK":
            return {
                ...state,
                books: {
                    ...state.books,
                    items: state.books.items.map(book =>
                        book.id === action.payload.id ? action.payload : book
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
};

