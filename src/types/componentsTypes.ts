import { IBook } from './bookTypes'

// AddBookPopup
export interface IAddBookPopupProps {
    visible: boolean;
    onClose: () => void;
    isEdit?: boolean;
    book?: IBook;
}

// BookFilter
export interface IBookFilterProps {
    onFilterChange: (filters: {
        name: string | null;
        author: string | null;
        year: string | null;
        genre: string | null;
    }) => void;
}

// BookPopup
export interface IBookPopupProps {
    book: IBook;
    visible: boolean;
    onClose: () => void;
}