import { useState, useEffect, useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { getBooks } from "../stores/actions/bookAction";
import { IUseBooksReturn, IUseBooksFilters } from "../types/hooksTypes";

export const useBooks = (): IUseBooksReturn => {
    const dispatch = useAppDispatch();
    const books = useAppSelector((state) => state.book.books);
    const [filters, setFilters] = useState<IUseBooksFilters>({
        name: undefined,
        author: undefined,
        year: undefined,
        genre: undefined,
    });

    useEffect(() => {
        dispatch(getBooks(filters));
    }, [dispatch, filters]);

    const updateFilters = useCallback((newFilters: IUseBooksFilters) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            ...newFilters,
        }));
    }, []);

    const handleFilterChange = useCallback(
        (newFilters: { name: string | null; author: string | null; year: string | null; genre: string | null }) => {
            const filtersWithUndefined = Object.fromEntries(
                Object.entries(newFilters).map(([key, value]) => [key, value === null ? undefined : value])
            );

            updateFilters(filtersWithUndefined as IUseBooksFilters);
        },
        [updateFilters]
    );

    return useMemo(() => ({ books, handleFilterChange }), [books, handleFilterChange]);
};
