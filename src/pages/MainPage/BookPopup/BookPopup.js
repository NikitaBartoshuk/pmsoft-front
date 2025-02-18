import React, { useState } from 'react';
import { Modal, Row, Col, Typography, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { deleteBook } from '../../../stores/actions/bookAction';
import AddBookPopup from '../AddBookPopup/AddBookPopup';
import { API } from '../../../utils/consts'
import styles from './bookpopup.module.css'

const { Title, Text } = Typography;

const BookPopup = ({ book, visible, onClose }) => {
    const dispatch = useDispatch();
    const [isEditMode, setIsEditMode] = useState(false);

    const handleDelete = () => {
        dispatch(deleteBook(book.id));
        onClose();
    };

    const handleEdit = () => setIsEditMode(true);

    const handleSaveEdit = () => {
        setIsEditMode(false);
        onClose();
    };

    return (
        <>
            <Modal
                visible={visible && !isEditMode}
                onCancel={onClose}
                footer={null}
                width={800}
            >
                <Row gutter={24}>
                    <Col span={12}>
                        <img
                            src={`${API.baseUrl + book.img}`}
                            alt={book.name}
                            className={styles['book-popup-name']}
                        />
                    </Col>
                    <Col span={12}>
                        <Title level={2}>{book.name}</Title>
                        <Text strong>Автор: {book.author}</Text>
                        <br />
                        <Text strong>Жанр: {book.genre}</Text>
                        <br />
                        <Text strong>Год: {book.year}</Text>
                        <br />
                        <Title level={4}>Описание:</Title>
                        <Text>{book.description}</Text>
                    </Col>
                </Row>
                <div className={styles['book-popup-button-container']}>
                    <Button type="danger" onClick={handleDelete} className={styles['book-popup-btn']}>
                        Удалить
                    </Button>
                    <Button type="primary" onClick={handleEdit} className={styles['book-popup-btn']}>
                        Изменить
                    </Button>
                </div>
            </Modal>

            {isEditMode && (
                <AddBookPopup
                    visible={isEditMode}
                    onClose={handleSaveEdit}
                    book={book}
                    isEdit
                />
            )}
        </>
    );
};

export default BookPopup;




