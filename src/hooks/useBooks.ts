import { useState, useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";  // Путь к вашим типизированным хукам
import { getBooks } from "../stores/actions/bookAction";

interface Filters {
    name?: string;
    author?: string;
    genre?: string;
    year?: number | string;
}

export const useBooks = () => {
    const dispatch = useAppDispatch();

    // Типизируем state.book.books как массив книг
    const books = useAppSelector((state) => state.book.books);

    // Типизируем filters с учетом возможных полей
    const [filters, setFilters] = useState<Filters>({});

    useEffect(() => {
        dispatch(getBooks(filters));
    }, [dispatch, filters]);

    // Обновляем фильтры
    const updateFilters = useCallback((newFilters: Filters) => {
        setFilters(newFilters);
    }, []);

    return { books, updateFilters };
};
