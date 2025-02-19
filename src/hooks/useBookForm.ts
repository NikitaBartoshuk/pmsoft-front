import { useEffect } from "react";
import { Form, message } from "antd";
import { createBook, updateBook } from "../stores/actions/bookAction";
import { useAppDispatch } from "../hooks/reduxHooks";
import dayjs from "dayjs";
import { BookFormValues, UseBookFormProps, UseBookFormReturn } from "../types";

const useBookForm = ({ isEdit, book, onClose }: UseBookFormProps): UseBookFormReturn => {
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (isEdit && book) {
            form.setFieldsValue({
                name: book.name,
                author: book.author,
                genre: book.genre,
                year: book.year ? dayjs(String(book.year), "YYYY") : null,
                description: book.description,
            });
        } else {
            form.resetFields();
        }
    }, [isEdit, book, form]);

    const onFinish = (values: BookFormValues) => {
        const formData: any = {
            name: values.name,
            author: values.author,
            genre: values.genre,
            year: values.year ? values.year.format("YYYY") : "",
            description: values.description || "",
        };

        const file = values.image?.[0]?.originFileObj;
        if (file) {
            formData.img = file;
        } else if (!isEdit) {
            message.error("Ошибка: загрузите изображение!");
            return;
        }

        console.log("Данные, отправляемые в экшен:");
        Object.keys(formData).forEach((key) => {
            console.log(key, formData[key]);
        });

        const action = isEdit ? updateBook(book?.id as number, formData) : createBook(formData);
        dispatch(action)
            .then(() => {
                message.success(isEdit ? "Книга обновлена!" : "Книга добавлена!");
                form.resetFields();
                onClose();
            })
            .catch(() => message.error("Ошибка при сохранении книги!"));
    };

    const handleImageUpload = (e: any) => (Array.isArray(e) ? e : e?.fileList);

    return {
        form,
        initialValues: {
            name: book?.name || "",
            author: book?.author || "",
            genre: book?.genre || "",
            year: book?.year ? dayjs(String(book.year), "YYYY") : null,
            description: book?.description || "",
        },
        onFinish,
        handleImageUpload,
    };
};

export default useBookForm;


