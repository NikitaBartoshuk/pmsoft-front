import React, { useState } from 'react';
import { Modal, Row, Col, Typography, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { deleteBook } from '../../stores/actions/bookAction';
import AddBookPopup from '../AddBookPopup/AddBookPopup';

const { Title, Text } = Typography;

const BookPopup = ({ book, visible, onClose }) => {
    const dispatch = useDispatch();
    const [isEditMode, setIsEditMode] = useState(false);
    const [isPopupVisible, setIsPopupVisible] = useState(visible);

    const handleDelete = (bookId) => {
        dispatch(deleteBook(bookId));
        setIsPopupVisible(false);
        onClose();
    };

    const handleEdit = () => {
        setIsEditMode(true);
        setIsPopupVisible(false); // Закрываем BookPopup
    };

    const handleSaveEdit = (updatedBook) => {
        setIsEditMode(false);
        setIsPopupVisible(true); // Открываем BookPopup заново
        setTimeout(() => {
            onClose(); // Закрываем, чтобы обновились данные
        }, 0);
    };

    return (
        <>
            <Modal
                title={null}
                visible={isPopupVisible}
                onCancel={() => {
                    setIsPopupVisible(false);
                    onClose();
                }}
                footer={null}
                width={800}
            >
                <Row gutter={24}>
                    <Col span={12}>
                        <img
                            src={`http://localhost:5000/${book.img}`}
                            alt={book.name}
                            style={{
                                width: '100%',
                                borderRadius: '8px',
                            }}
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

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                    <Button type="danger" onClick={() => handleDelete(book.id)} style={{ width: '48%' }}>
                        Удалить
                    </Button>
                    <Button type="primary" onClick={handleEdit} style={{ width: '48%' }}>
                        Изменить
                    </Button>
                </div>
            </Modal>

            {isEditMode && (
                <AddBookPopup
                    visible={isEditMode}
                    onClose={handleSaveEdit}
                    book={book}
                    isEdit={true}
                />
            )}
        </>
    );
};

export default BookPopup;




