import { Book } from './bookTypes'

// AddBookPopup
export interface AddBookPopupProps {
    visible: boolean;
    onClose: () => void;
    isEdit?: boolean;
    book?: Book;
}

// BookFilter
export interface BookFilterProps {
    onFilterChange: (filters: {
        name: string | null;
        author: string | null;
        year: string | null;
        genre: string | null;
    }) => void;
}

// BookPopup
export interface BookPopupProps {
    book: Book;
    visible: boolean;
    onClose: () => void;
}