import { FormInstance } from "antd";
import dayjs from "dayjs";
import { IBook } from "./bookTypes";

// Типы для useBookFilters
export interface IFilters {
    name: string;
    author: string;
    genre: string | null;
    year: string | null;
    filterByAuthor: boolean;
    filterByYear: boolean;
    filterByName: boolean;
}

export interface IUseBookFiltersProps {
    onFilterChange: (filters: {
        name: string | null;
        author: string | null;
        year: string | null;
        genre: string | null;
    }) => void;
}

export interface IUseBookFiltersReturn {
    filters: IFilters;
    isModalOpen: boolean;
    handleChange: (key: keyof IFilters, value: string | boolean | null) => void;
    openModal: () => void;
    closeModal: () => void;
}

// Типы для useBookForm
export interface IBookFormValues {
    name: string;
    author: string;
    genre: string;
    year: dayjs.Dayjs | null;
    description: string;
    image?: any;
}

export interface IUseBookFormProps {
    isEdit: boolean;
    book: any;
    onClose: () => void;
}

export interface IUseBookFormReturn {
    form: FormInstance;
    initialValues: IBookFormValues;
    onFinish: (values: IBookFormValues) => void;
    handleImageUpload: (e: any) => any;
}

// Типы для useBooks

export interface IUseBooksFilters {
    name?: string;
    author?: string;
    genre?: string;
    year?: number | string;
}

// Описание состояния книг
export interface IUseBookState {
    items: IBook[];
    isError: boolean;
}

// Описание возвращаемого значения useBooks
export interface IUseBooksReturn {
    books: IUseBookState;
    handleFilterChange: (filters: {
        name: string | null;
        author: string | null;
        year: string | null;
        genre: string | null;
    }) => void;
}

// Типы для useLogin
export interface ILoginValues {
    email: string;
    password: string;
}

export interface IUseLoginReturn {
    onLogin: (values: ILoginValues) => Promise<void>;
    loading: boolean;
}

// Типы для useRegister
export interface IRegisterValues {
    email: string;
    password: string;
}

export interface IUseRegisterReturn {
    onRegister: (values: IRegisterValues) => Promise<void>;
    loading: boolean;
}

export interface IRegisterFormValues {
    email: string;
    password: string;
    confirm: string;
}
