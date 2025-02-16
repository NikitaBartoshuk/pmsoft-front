import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBooks } from "../../stores/actions/bookAction";
import { Card, Row, Col } from "antd";
import AppHeader from "./Header/AppHeader";
import BookFilter from "../../components/BookFilter/BookFilter";

const { Meta } = Card;

const MainPage = () => {
    const dispatch = useDispatch();
    const books = useSelector((state) => state.book.books);

    useEffect(() => {
        dispatch(getBooks());
    }, []);

    console.log(books);

    return (
        <div>
            <AppHeader />
            <BookFilter />
            <Row gutter={[24, 24]} justify="start" style={{ padding: '0 16px' }}>
                {books.items.map((book) => {
                    const imageUrl = `http://localhost:5000/${book.img}`;
                    return (
                        <Col key={book.id} xs={24} sm={12} md={8} lg={6} xl={6}>
                            <Card
                                hoverable
                                cover={<img alt="book" src={imageUrl} />}
                            >
                                <Meta title={book.name} description={book.year} />
                            </Card>
                        </Col>
                    );
                })}
            </Row>
        </div>
    );
};

export default MainPage;

