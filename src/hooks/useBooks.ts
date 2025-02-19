import { useState, useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { getBooks } from "../stores/actions/bookAction";
import { UseBooksReturn, UseBooksFilters } from "../types/hooksTypes";

export const useBooks = (): UseBooksReturn => {
    const dispatch = useAppDispatch();
    const books = useAppSelector((state) => state.book.books);
    const [filters, setFilters] = useState<UseBooksFilters>({});

    useEffect(() => {
        dispatch(getBooks(filters));
    }, [dispatch, filters]);

    const updateFilters = useCallback((newFilters: UseBooksFilters) => {
        setFilters(newFilters);
    }, []);

    const handleFilterChange = (filters: { name: string | null; author: string | null; year: string | null; genre: string | null }) => {
        updateFilters({
            name: filters.name ?? undefined,
            author: filters.author ?? undefined,
            year: filters.year ?? undefined,
            genre: filters.genre ?? undefined,
        });
    };

    return { books, handleFilterChange };
};
