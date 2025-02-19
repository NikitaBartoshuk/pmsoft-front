import { FormInstance } from "antd";
import dayjs from "dayjs";
import { Book } from "./bookTypes";

// Типы для useBookFilters
export interface Filters {
    name: string;
    author: string;
    genre: string | null;
    year: string | null;
    filterByAuthor: boolean;
    filterByYear: boolean;
}

export interface UseBookFiltersProps {
    onFilterChange: (filters: {
        name: string | null;
        author: string | null;
        year: string | null;
        genre: string | null;
    }) => void;
}

export interface UseBookFiltersReturn {
    filters: Filters;
    isModalOpen: boolean;
    handleChange: (key: keyof Filters, value: string | boolean | null) => void;
    applyFilters: () => void;
    openModal: () => void;
    closeModal: () => void;
}

// Типы для useBookForm
export interface BookFormValues {
    name: string;
    author: string;
    genre: string;
    year: dayjs.Dayjs | null;
    description: string;
    image?: any;
}

export interface UseBookFormProps {
    isEdit: boolean;
    book: any;
    onClose: () => void;
}

export interface UseBookFormReturn {
    form: FormInstance;
    initialValues: BookFormValues;
    onFinish: (values: BookFormValues) => void;
    handleImageUpload: (e: any) => any;
}

// Типы для useBooks

export interface UseBooksFilters {
    name?: string;
    author?: string;
    genre?: string;
    year?: number | string;
}

// Описание состояния книг
export interface UseBookState {
    items: Book[];
    isError: boolean;
}

// Описание возвращаемого значения useBooks
export interface UseBooksReturn {
    books: UseBookState;
    handleFilterChange: (filters: {
        name: string | null;
        author: string | null;
        year: string | null;
        genre: string | null;
    }) => void;
}

// Типы для useLogin
export interface LoginValues {
    email: string;
    password: string;
}

export interface UseLoginReturn {
    onLogin: (values: LoginValues) => Promise<void>;
    loading: boolean;
}

// Типы для useRegister
export interface RegisterValues {
    email: string;
    password: string;
}

export interface UseRegisterReturn {
    onRegister: (values: RegisterValues) => Promise<void>;
    loading: boolean;
}

export interface RegisterFormValues {
    email: string;
    password: string;
    confirm: string;
}
