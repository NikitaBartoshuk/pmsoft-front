import { useState, useCallback } from "react";
import dayjs from "dayjs";
import { IFilters, IUseBookFiltersProps, IUseBookFiltersReturn } from "../types";

const useBookFilters = ({ onFilterChange }: IUseBookFiltersProps): IUseBookFiltersReturn => {
    const [filters, setFilters] = useState<IFilters>({
        name: "",
        author: "",
        genre: null,
        year: null,
        filterByAuthor: false,
        filterByYear: false,
        filterByName: true,
    });
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const handleChange = useCallback((key: keyof IFilters, value: string | boolean | null) => {

        setFilters(prev => {
            if (key === "year" && value === null) {
                value = null;
            }

            const newFilters = { ...prev, [key]: value };

            let formattedYear = null;

            if (newFilters.filterByYear && newFilters.year) {
                const year = dayjs(newFilters.year);
                if (year.isValid()) {
                    formattedYear = year.format("YYYY");
                }
            }

            onFilterChange({
                name: newFilters.filterByName ? newFilters.name : null,
                author: newFilters.filterByAuthor ? newFilters.author : null,
                year: formattedYear,
                genre: newFilters.genre,
            });

            return newFilters;
        });
    }, [onFilterChange]);


    const openModal = useCallback(() => setIsModalOpen(true), []);
    const closeModal = useCallback(() => setIsModalOpen(false), []);

    return {
        filters,
        isModalOpen,
        handleChange,
        openModal,
        closeModal,
    };
};


export default useBookFilters;

