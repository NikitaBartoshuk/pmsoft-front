import React, { useState } from "react";
import { Card, Row, Col, Typography } from "antd";
import { API } from '../../utils/consts';
import AppHeader from "./Header/AppHeader";
import BookFilter from "./BookFilter/BookFilter";
import BookPopup from "./BookPopup/BookPopup";
import { useBooks } from "../../hooks/useBooks";

const { Meta } = Card;

const MainPage = () => {
    const { books, updateFilters } = useBooks();
    const [selectedBook, setSelectedBook] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = (book) => {
        setSelectedBook(book);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectedBook(null);
    };

    return (
        <div>
            <AppHeader />
            <BookFilter onFilterChange={updateFilters} />

            {books.items.length === 0 ? (
                <Typography.Title level={4} style={{ textAlign: "center", marginTop: 50 }}>
                    Нет доступных книг
                </Typography.Title>
            ) : (
                <Row gutter={[24, 24]} justify="start" style={{ padding: "0 16px" }}>
                    {books.items.map((book) => (
                        <Col key={book.id} xs={24} sm={12} md={8} lg={6} xl={6}>
                            <Card
                                hoverable
                                cover={<img alt="book" src={`${API.baseUrl + book.img}`} />}
                                onClick={() => showModal(book)}
                            >
                                <Meta title={book.name} description={book.year} />
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}

            {selectedBook && (
                <BookPopup book={selectedBook} visible={isModalVisible} onClose={handleCancel} />
            )}
        </div>
    );
};

export default MainPage;




