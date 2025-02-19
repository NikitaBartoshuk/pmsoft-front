export enum BookActionTypes {
    GET_BOOKS = "GET_BOOKS",
    CREATE_BOOK = "CREATE_BOOK",
    DELETE_BOOK = "DELETE_BOOK",
    UPDATE_BOOK = "UPDATE_BOOK",
    ERROR_BOOK = "ERROR_BOOK",
}

export interface IBook {
    id?: number;
    name: string;
    author: string;
    genre: string;
    year: string | number | null;
    description: string;
    img?: string;
}

export interface IBookState {
    books: {
        items: IBook[];
        isError: boolean;
    };
}

export interface IGetBooksAction {
    type: BookActionTypes.GET_BOOKS;
    payload: IBook[];
}

export interface ICreateBookAction {
    type: BookActionTypes.CREATE_BOOK;
    payload: IBook;
}

export interface IDeleteBookAction {
    type: BookActionTypes.DELETE_BOOK;
    payload: number;
}

export interface IUpdateBookAction {
    type: BookActionTypes.UPDATE_BOOK;
    payload: IBook;
}

export interface IErrorBookAction {
    type: BookActionTypes.ERROR_BOOK;
    payload: string;
}

export type BookAction =
    | IGetBooksAction
    | ICreateBookAction
    | IDeleteBookAction
    | IUpdateBookAction
    | IErrorBookAction;
