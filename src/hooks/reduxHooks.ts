import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../stores/index';  // Путь к вашему store

// Используйте их вместо обычных `useDispatch` и `useSelector` в компоненте
export const useAppDispatch = () => useDispatch<AppDispatch>();  // Типизируем dispatch
export const useAppSelector = <TSelected>(selector: (state: RootState) => TSelected): TSelected =>
    useSelector(selector);  // Типизируем selector