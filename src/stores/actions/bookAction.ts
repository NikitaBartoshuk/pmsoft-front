import axios from "axios";
import { API } from "../../utils/consts";
import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../index";

export interface Book {
    id: number;
    title: string;
    author: string;
    year: number;
    genre: string;
}

enum BookActionTypes {
    GET_BOOKS = "GET_BOOKS",
    ERROR_BOOKS = "ERROR_BOOKS",
    ERROR_BOOK = "ERROR_BOOK",
    CREATE_BOOK = "CREATE_BOOK",
    DELETE_BOOK = "DELETE_BOOK",
    UPDATE_BOOK = "UPDATE_BOOK",
}

interface GetBooksAction {
    type: BookActionTypes.GET_BOOKS;
    payload: Book[];
}

interface ErrorBooksAction {
    type: BookActionTypes.ERROR_BOOKS | BookActionTypes.ERROR_BOOK;
    payload: boolean | string;
}

interface CreateBookAction {
    type: BookActionTypes.CREATE_BOOK;
    payload: Book;
}

interface DeleteBookAction {
    type: BookActionTypes.DELETE_BOOK;
    payload: number;
}

interface UpdateBookAction {
    type: BookActionTypes.UPDATE_BOOK;
    payload: Book;
}

type BookActions =
    | GetBooksAction
    | ErrorBooksAction
    | CreateBookAction
    | DeleteBookAction
    | UpdateBookAction;

const handleAxiosError = (error: unknown): string => {
    if (axios.isAxiosError(error)) {
        return error.response?.data || "Ошибка запроса к серверу";
    }
    return "Неизвестная ошибка";
};

export const getBooks = (filters: Record<string, any> = {}): ThunkAction<void, RootState, unknown, BookActions> => {
    return async (dispatch: Dispatch<BookActions>) => {
        try {
            const response = await axios.get<Book[]>(API.book.getAll, { params: filters });
            dispatch({ type: BookActionTypes.GET_BOOKS, payload: response.data });
        } catch (error: unknown) {
            dispatch({ type: BookActionTypes.ERROR_BOOKS, payload: handleAxiosError(error) });
        }
    };
};

export const createBook = (bookData: Omit<Book, "id">) => {
    return async (dispatch: Dispatch<BookActions>) => {
        try {
            const response = await axios.post<Book>(API.book.create, bookData);
            dispatch({ type: BookActionTypes.CREATE_BOOK, payload: response.data });
            console.log("Книга успешно добавлена:", response.data);
        } catch (error: unknown) {
            dispatch({ type: BookActionTypes.ERROR_BOOK, payload: handleAxiosError(error) });
            console.error("Ошибка при добавлении книги:", error);
        }
    };
};

export const deleteBook = (bookId: number) => {
    return async (dispatch: Dispatch<BookActions>) => {
        try {
            await axios.delete(`${API.book.delete}${bookId}`);
            dispatch({ type: BookActionTypes.DELETE_BOOK, payload: bookId });
            console.log(`Книга с ID ${bookId} успешно удалена.`);
        } catch (error: unknown) {
            dispatch({ type: BookActionTypes.ERROR_BOOK, payload: handleAxiosError(error) });
            console.error("Ошибка при удалении книги:", error);
        }
    };
};

export const updateBook = (bookId: number, updatedData: Partial<Book>) => {
    return async (dispatch: Dispatch<BookActions>) => {
        try {
            const response = await axios.put<Book>(`${API.book.update}${bookId}`, updatedData);
            dispatch({ type: BookActionTypes.UPDATE_BOOK, payload: response.data });
            console.log(`Книга с ID ${bookId} успешно обновлена.`);
        } catch (error: unknown) {
            dispatch({ type: BookActionTypes.ERROR_BOOK, payload: handleAxiosError(error) });
            console.error("Ошибка при обновлении книги:", error);
        }
    };
};
