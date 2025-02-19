export enum BookActionTypes {
    GET_BOOKS = "GET_BOOKS",
    CREATE_BOOK = "CREATE_BOOK",
    DELETE_BOOK = "DELETE_BOOK",
    UPDATE_BOOK = "UPDATE_BOOK",
    ERROR_BOOK = "ERROR_BOOK",
}

export interface Book {
    id?: number;
    name: string;
    author: string;
    genre: string;
    year: string | number | null;
    description: string;
    img?: string;
}

export interface BookState {
    books: {
        items: Book[];
        isError: boolean;
    };
}

export interface GetBooksAction {
    type: BookActionTypes.GET_BOOKS;
    payload: Book[];
}

export interface CreateBookAction {
    type: BookActionTypes.CREATE_BOOK;
    payload: Book;
}

export interface DeleteBookAction {
    type: BookActionTypes.DELETE_BOOK;
    payload: number;
}

export interface UpdateBookAction {
    type: BookActionTypes.UPDATE_BOOK;
    payload: Book;
}

export interface ErrorBookAction {
    type: BookActionTypes.ERROR_BOOK;
    payload: string;
}

export type BookAction =
    | GetBooksAction
    | CreateBookAction
    | DeleteBookAction
    | UpdateBookAction
    | ErrorBookAction;
