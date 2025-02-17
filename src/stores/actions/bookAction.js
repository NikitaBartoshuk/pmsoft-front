import axios from 'axios'
import { API } from '../../utils/consts'

export const getBooks = (filters = {}) => {
    console.log("Отправляемые фильтры:", filters);

    return async (dispatch) => {
        try {
            const response = await axios.get(`${API.book.getAll}`, {
                params: filters,
            });
            dispatch({
                type: "GET_BOOKS",
                payload: response.data
            });
        } catch (error) {
            dispatch({
                type: "ERROR_BOOKS",
                payload: true
            });
        }
    };
};


export const createBook = (bookData) => async (dispatch) => {
    try {
        const response = await axios.post(`${API.book.create}`, bookData);

        dispatch({
            type: "CREATE_BOOK",
            payload: response.data
        });

        console.log("Книга успешно добавлена:", response.data);
    } catch (error) {
        dispatch({
            type: "ERROR_BOOK",
            payload: error.response?.data || "Ошибка при добавлении книги"
        });

        console.error("Ошибка при добавлении книги:", error);
    }
};

export const deleteBook = (bookId) => async (dispatch) => {
    try {
        await axios.delete(`${API.book.delete + bookId}`);

        dispatch({
            type: "DELETE_BOOK",
            payload: bookId
        });

        console.log(`Книга с ID ${bookId} успешно удалена.`);
    } catch (error) {
        dispatch({
            type: "ERROR_BOOK",
            payload: error.response?.data || "Ошибка при удалении книги"
        });

        console.error("Ошибка при удалении книги:", error);
    }
};

export const updateBook = (bookId, updatedData) => async (dispatch) => {
    try {
        const response = await axios.put(`${API.book.update + bookId}`, updatedData);

        dispatch({
            type: "UPDATE_BOOK",
            payload: response.data
        });

        console.log(`Книга с ID ${bookId} успешно обновлена.`);
    } catch (error) {
        dispatch({
            type: "ERROR_BOOK",
            payload: error.response?.data || "Ошибка при обновлении книги"
        });

        console.error("Ошибка при обновлении книги:", error);
    }
};


