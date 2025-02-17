export const REGISTRATION_ROUTE = '/registration'
export const LOGIN_ROUTE = '/login'
export const MAIN_ROUTE = '/main'

export const API = {
    baseUrl: 'http://localhost:5000/api/',
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
}

export const GENRE_OPTIONS = [
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
