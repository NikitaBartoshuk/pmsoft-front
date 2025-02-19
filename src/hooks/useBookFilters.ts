import { useState, useCallback } from "react";
import dayjs from "dayjs";
import { Filters, UseBookFiltersProps, UseBookFiltersReturn } from "../types";

const useBookFilters = ({ onFilterChange }: UseBookFiltersProps): UseBookFiltersReturn => {
    const [filters, setFilters] = useState<Filters>({
        name: "",
        author: "",
        genre: null,
        year: null,
        filterByAuthor: false,
        filterByYear: false,
    });
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const handleChange = useCallback((key: keyof Filters, value: string | boolean | null) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    }, []);

    const applyFilters = useCallback(() => {
        onFilterChange({
            name: filters.name || null,
            author: filters.filterByAuthor ? filters.author : null,
            year: filters.filterByYear && filters.year ? dayjs(filters.year).format("YYYY") : null,
            genre: filters.genre,
        });
    }, [filters, onFilterChange]);

    const openModal = useCallback(() => setIsModalOpen(true), []);
    const closeModal = useCallback(() => setIsModalOpen(false), []);

    return {
        filters,
        isModalOpen,
        handleChange,
        applyFilters,
        openModal,
        closeModal,
    };
};

export default useBookFilters;

