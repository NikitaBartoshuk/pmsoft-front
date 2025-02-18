import { useEffect } from "react";
import { Form, message } from "antd";
import { useDispatch } from "react-redux";
import { createBook, updateBook } from "../stores/actions/bookAction";
import dayjs from "dayjs";

const useBookForm = (isEdit, book, onClose) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();

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

    const onFinish = values => {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("author", values.author);
        formData.append("genre", values.genre);
        formData.append("year", values.year ? values.year.format("YYYY") : "");
        formData.append("description", values.description || "");

        const file = values.image?.[0]?.originFileObj;
        if (file) {
            formData.append("img", file);
        } else if (!isEdit) {
            message.error("Ошибка: загрузите изображение!");
            return;
        }

        const action = isEdit ? updateBook(book.id, formData) : createBook(formData);
        dispatch(action)
            .then(() => {
                message.success(isEdit ? "Книга обновлена!" : "Книга добавлена!");
                form.resetFields();
                onClose();
            })
            .catch(() => message.error("Ошибка при сохранении книги!"));
    };

    const handleImageUpload = e => (Array.isArray(e) ? e : e?.fileList);

    return {
        form,
        initialValues: {
            ...book,
            year: book?.year ? dayjs(String(book.year), "YYYY") : null,
        },
        onFinish,
        handleImageUpload,
    };
};

export default useBookForm;
