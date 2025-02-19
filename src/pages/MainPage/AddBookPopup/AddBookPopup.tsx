import React from "react";
import { Modal, Form, Input, Select, DatePicker, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { GENRE_OPTIONS } from "../../../utils/consts";
import useBookForm from "../../../hooks/useBookForm";
import { IAddBookPopupProps} from "../../../types";

const { Option } = Select;

const AddBookPopup: React.FC<IAddBookPopupProps> = ({ visible, onClose, isEdit = false, book = {} }) => {
    const { form, initialValues, onFinish, handleImageUpload } = useBookForm({ isEdit, book, onClose });

    const handleCancel = () => {
        onClose();
    };

    return (
        <Modal title={isEdit ? "Изменить книгу" : "Добавить книгу"} open={visible} onCancel={handleCancel} footer={null}>
            <Form layout="vertical" form={form} initialValues={initialValues} onFinish={onFinish}>
                <Form.Item name="name" label="Название книги" rules={[{ required: true, message: "Введите название" }]}>
                    <Input />
                </Form.Item>

                <Form.Item name="author" label="Автор" rules={[{ required: true, message: "Введите автора" }]}>
                    <Input />
                </Form.Item>

                <Form.Item name="genre" label="Жанр" rules={[{ required: true, message: "Выберите жанр" }]}>
                    <Select placeholder="Выберите жанр">
                        {GENRE_OPTIONS.map(option => (
                            <Option key={option.id} value={option.title}>
                                {option.title}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item name="year" label="Год" rules={[{ required: true, message: "Выберите год" }]}>
                    <DatePicker picker="year" style={{ width: "100%" }} />
                </Form.Item>

                <Form.Item name="description" label="Описание">
                    <Input.TextArea rows={3} />
                </Form.Item>

                <Form.Item
                    name="image"
                    label="Обложка"
                    valuePropName="fileList"
                    getValueFromEvent={handleImageUpload}
                >
                    <Upload beforeUpload={() => false} listType="picture">
                        <Button icon={<UploadOutlined />}>Загрузить изображение</Button>
                    </Upload>
                </Form.Item>

                <Form.Item>
                    <Button onClick={handleCancel} style={{ marginRight: 8 }}>
                        Отмена
                    </Button>
                    <Button type="primary" htmlType="submit">
                        {isEdit ? "Изменить" : "Добавить"}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddBookPopup;

