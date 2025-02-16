import axios from 'axios'

export const getBooks = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get('http://localhost:5000/api/book');
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
