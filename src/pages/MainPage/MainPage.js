import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBooks } from "../../stores/actions/bookAction";
import { Card, Row, Col } from "antd";
import AppHeader from "./Header/AppHeader";
import BookFilter from "../../components/BookFilter/BookFilter";
import BookPopup from "../../components/BookPopup/BookPopup";

const { Meta } = Card;

const MainPage = () => {
    const [selectedBook, setSelectedBook] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [filters, setFilters] = useState({});

    const dispatch = useDispatch();
    const books = useSelector((state) => state.book.books);

    useEffect(() => {
        dispatch(getBooks(filters));
    }, [dispatch, filters]);

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
            <BookFilter onFilterChange={setFilters} />
            <Row gutter={[24, 24]} justify="start" style={{ padding: '0 16px' }}>
                {books.items.map((book) => (
                    <Col key={book.id} xs={24} sm={12} md={8} lg={6} xl={6}>
                        <Card
                            hoverable
                            cover={<img alt="book" src={`http://localhost:5000/${book.img}`} />}
                            onClick={() => showModal(book)}
                        >
                            <Meta title={book.name} description={book.year} />
                        </Card>
                    </Col>
                ))}
            </Row>
            {selectedBook && (
                <BookPopup
                    book={selectedBook}
                    visible={isModalVisible}
                    onClose={handleCancel}
                />
            )}
        </div>
    );
};

export default MainPage;



