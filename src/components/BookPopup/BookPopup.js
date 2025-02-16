import React, { useState } from 'react';
import { Modal, Card } from 'antd';
import { useSelector } from 'react-redux';

const { Meta } = Card;

const BookPopup = ({ book, visible, onClose }) => {
    return (
        <Modal
            title={book.name}
            visible={visible}
            onCancel={onClose}
            footer={null} // Можно добавить кнопки для закрытия или других действий
            width={600}
        >
            <p><strong>Автор:</strong> {book.author}</p>
            <p><strong>Жанр:</strong> {book.genre}</p>
            <p><strong>Год:</strong> {book.year}</p>
            <p><strong>Описание:</strong> {book.description}</p>
            <img src={`http://localhost:5000/${book.img}`} alt={book.name} style={{ width: '100%' }} />
        </Modal>
    );
};

export default BookPopup