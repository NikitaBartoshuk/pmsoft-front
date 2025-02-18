import { useState, useCallback } from 'react';
import dayjs from 'dayjs';

// Типизация фильтров
interface Filters {
    name: string;
    author: string;
    genre: string | null;
    year: string | null;
    filterByAuthor: boolean;
    filterByYear: boolean;
}

// Типизация пропсов хука
interface UseBookFiltersProps {
    onFilterChange: (filters: {
        name: string | null;
        author: string | null;
        year: string | null;
        genre: string | null;
    }) => void;
}

// Типизация возвращаемого значения хука
interface UseBookFiltersReturn {
    filters: Filters;
    isModalOpen: boolean;
    handleChange: (key: keyof Filters, value: string | boolean | null) => void;
    applyFilters: () => void;
    openModal: () => void;
    closeModal: () => void;
}

const useBookFilters = ({ onFilterChange }: UseBookFiltersProps): UseBookFiltersReturn => {
    const [filters, setFilters] = useState<Filters>({
        name: '',
        author: '',
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
            year: filters.filterByYear && filters.year ? dayjs(filters.year).format('YYYY') : null,
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
        closeModal
    };
};

export default useBookFilters;
