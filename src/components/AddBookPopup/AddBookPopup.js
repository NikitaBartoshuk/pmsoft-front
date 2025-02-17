import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, DatePicker, Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { createBook, updateBook } from '../../stores/actions/bookAction';
import { GENRE_OPTIONS } from "../../utils/consts";
import dayjs from 'dayjs';

const { Option } = Select;

const AddBookPopup = ({ visible, onClose, isEdit, book }) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    useEffect(() => {
        if (isEdit && book) {
            form.setFieldsValue({
                name: book.name,
                author: book.author,
                genre: book.genre,
                year: book.year ? dayjs(book.year.toString(), "YYYY", true) : null,
                description: book.description,
            });
        } else {
            form.resetFields();
        }
    }, [isEdit, book, form]);


    const onFinish = (values) => {
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('author', values.author);
        formData.append('genre', values.genre);
        formData.append('year', values.year ? values.year.format('YYYY') : '');
        formData.append('description', values.description || '');

        const file = values.image?.[0]?.originFileObj;
        if (file) {
            formData.append('img', file);
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

    return (
        <Modal
            title={isEdit ? "Изменить книгу" : "Добавить книгу"}
            open={visible}
            onCancel={onClose}
            footer={null}
        >
            <Form layout="vertical" form={form} onFinish={onFinish}>
                <Form.Item name="name" label="Название книги" rules={[{ required: true, message: 'Введите название' }]}>
                    <Input />
                </Form.Item>

                <Form.Item name="author" label="Автор" rules={[{ required: true, message: 'Введите автора' }]}>
                    <Input />
                </Form.Item>

                <Form.Item name="genre" label="Жанр" rules={[{ required: true, message: 'Выберите жанр' }]}>
                    <Select placeholder="Выберите жанр">
                        {GENRE_OPTIONS.map(option => {
                            return <Option key={option.id} value={option.title}>{option.title}</Option>
                        })}
                    </Select>
                </Form.Item>

                <Form.Item name="year" label="Год" rules={[{ required: true, message: 'Выберите год' }]}>
                    <DatePicker picker="year" style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item name="description" label="Описание">
                    <Input.TextArea rows={3} />
                </Form.Item>

                <Form.Item
                    name="image"
                    label="Обложка"
                    valuePropName="fileList"
                    getValueFromEvent={e => (Array.isArray(e) ? e : e?.fileList)}
                    rules={isEdit ? [] : [{ required: true, message: 'Загрузите изображение' }]}
                >
                    <Upload
                        beforeUpload={(file) => {
                            const isImage = file.type.startsWith('image/');
                            if (!isImage) {
                                message.error("Можно загружать только изображения!");
                            }
                            return isImage ? false : Upload.LIST_IGNORE;
                        }}
                        listType="picture"
                    >
                        <Button icon={<UploadOutlined />}>Загрузить изображение</Button>
                    </Upload>
                </Form.Item>

                <Form.Item>
                    <Button onClick={onClose} style={{ marginRight: 8 }}>
                        Отмена
                    </Button>
                    <Button type="primary" htmlType="submit">
                        {isEdit ? 'Изменить' : 'Добавить'}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddBookPopup;
