import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBooks } from "../stores/actions/bookAction";

export const useBooks = () => {
    const dispatch = useDispatch();
    const books = useSelector((state) => state.book.books);
    const [filters, setFilters] = useState({});

    useEffect(() => {
        dispatch(getBooks(filters));
    }, [dispatch, filters]);

    const updateFilters = useCallback((newFilters) => {
        setFilters(newFilters);
    }, []);

    return { books, updateFilters };
};