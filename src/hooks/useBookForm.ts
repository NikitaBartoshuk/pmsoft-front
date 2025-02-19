import { useEffect } from "react";
import { Form } from "antd";
import { createBook, updateBook } from "../stores/actions/bookAction";
import { useAppDispatch } from "../hooks/reduxHooks";
import { IBookFormValues, IUseBookFormProps, IUseBookFormReturn } from "../types";
import dayjs from "dayjs";

const useBookForm = ({ isEdit, book, onClose }: IUseBookFormProps): IUseBookFormReturn => {
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

    const onFinish = (values: IBookFormValues) => {
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
            return;
        }

        const action = isEdit ? updateBook(book?.id as number, formData) : createBook(formData);
        dispatch(action)
            .then(() => {
                form.resetFields();
                onClose();
            })
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


