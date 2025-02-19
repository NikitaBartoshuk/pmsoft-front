import axios from "axios";
import { API } from "../../utils/consts";
import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../index";
import { IBook, BookAction, BookActionTypes } from "../../types";

const handleAxiosError = (error: unknown): string => {
    if (axios.isAxiosError(error)) {
        return error.response?.data || "Ошибка запроса к серверу";
    }
    return "Неизвестная ошибка";
};

export const getBooks = (filters: Record<string, any> = {}): ThunkAction<void, RootState, unknown, BookAction> => {
    return async (dispatch: Dispatch<BookAction>) => {
        try {
            const response = await axios.get<IBook[]>(API.book.getAll, { params: filters });
            dispatch({ type: BookActionTypes.GET_BOOKS, payload: response.data });
        } catch (error: unknown) {
            dispatch({ type: BookActionTypes.ERROR_BOOK, payload: handleAxiosError(error) });
        }
    };
};

export const createBook = (bookData: FormData) => {
    return async (dispatch: Dispatch<BookAction>) => {
        try {
            const response = await axios.post<IBook>(API.book.create, bookData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            dispatch({ type: BookActionTypes.CREATE_BOOK, payload: response.data });
        } catch (error: unknown) {
            dispatch({ type: BookActionTypes.ERROR_BOOK, payload: handleAxiosError(error) });
        }
    };
};

export const deleteBook = (bookId: number) => {
    return async (dispatch: Dispatch<BookAction>) => {
        try {
            await axios.delete(`${API.book.delete}${bookId}`);
            dispatch({ type: BookActionTypes.DELETE_BOOK, payload: bookId });
        } catch (error: unknown) {
            dispatch({ type: BookActionTypes.ERROR_BOOK, payload: handleAxiosError(error) });
        }
    };
};

export const updateBook = (bookId: number, updatedData: FormData) => {
    return async (dispatch: Dispatch<BookAction>) => {
        try {
            const response = await axios.put<IBook>(`${API.book.update}${bookId}`, updatedData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            dispatch({ type: BookActionTypes.UPDATE_BOOK, payload: response.data });
        } catch (error: unknown) {
            dispatch({ type: BookActionTypes.ERROR_BOOK, payload: handleAxiosError(error) });
        }
    };
};


