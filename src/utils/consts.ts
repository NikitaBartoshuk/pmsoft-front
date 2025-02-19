export const REGISTRATION_ROUTE: string = '/registration';
export const LOGIN_ROUTE: string = '/login';
export const MAIN_ROUTE: string = '/main';

interface IAPIEndpoints {
    baseUrl: string;
    user: {
        login: string;
        registration: string;
        auth: string;
    };
    book: {
        getAll: string;
        create: string;
        delete: string;
        update: string;
    };
}

export const API: IAPIEndpoints = {
    baseUrl: 'http://localhost:5000/',
    user: {
        login: 'http://localhost:5000/api/user/login',
        registration: 'http://localhost:5000/api/user/registration',
        auth: 'http://localhost:5000/api/user/auth'
    },
    book: {
        getAll: 'http://localhost:5000/api/book',
        create: 'http://localhost:5000/api/book',
        delete: 'http://localhost:5000/api/book/',
        update: 'http://localhost:5000/api/book/'
    }
};

export interface IGenreOption {
    id: number;
    title: string;
}

export const GENRE_OPTIONS: IGenreOption[] = [
    { id: 1, title: "Фэнтези" },
    { id: 2, title: "Приключения" },
    { id: 3, title: "Юмор" },
    { id: 4, title: "Поэзия" },
    { id: 5, title: "Ужасы" },
    { id: 6, title: "Фантастика" },
    { id: 7, title: "Триллер" },
    { id: 8, title: "Боевик" },
    { id: 9, title: "Любовный роман" }
];
