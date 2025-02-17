import React, { useState } from 'react';
import { Input, Checkbox, DatePicker, Card, Row, Col, Button, Select } from 'antd';
import AddBookPopup from '../AddBookPopup/AddBookPopup';
import {GENRE_OPTIONS} from "../../utils/consts";

const { Option } = Select;

const BookFilter = ({ onFilterChange }) => {
    const [name, setName] = useState('');
    const [filterByAuthor, setFilterByAuthor] = useState(false);
    const [author, setAuthor] = useState('');
    const [filterByYear, setFilterByYear] = useState(false);
    const [year, setYear] = useState(null);
    const [genre, setGenre] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const applyFilters = () => {
        onFilterChange({
            name: name || null,
            author: filterByAuthor ? author : null,
            year: filterByYear && year ? year.format('YYYY') : null,
            genre,
        });
    };

    return (
        <>
            <Card style={{ margin: '20px 0', padding: '10px' }}>
                <Row gutter={[16, 16]} align="middle">
                    <Col>
                        <Input
                            placeholder="Название книги"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={{ width: 220 }}
                        />
                    </Col>

                    <Col>
                        <Checkbox
                            onChange={(e) => setFilterByAuthor(e.target.checked)}
                            checked={filterByAuthor}
                        >
                            Фильтр по автору
                        </Checkbox>
                    </Col>

                    <Col>
                        <Input
                            placeholder="Имя автора"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            disabled={!filterByAuthor}
                            style={{ width: 180 }}
                        />
                    </Col>

                    <Col>
                        <Checkbox
                            onChange={(e) => setFilterByYear(e.target.checked)}
                            checked={filterByYear}
                        >
                            Фильтр по году
                        </Checkbox>
                    </Col>

                    <Col>
                        <DatePicker
                            picker="year"
                            value={year}
                            onChange={setYear}
                            disabled={!filterByYear}
                            style={{ width: 120 }}
                        />
                    </Col>

                    <Col>
                        <Select
                            placeholder="Жанр"
                            value={genre}
                            onChange={setGenre}
                            style={{ width: 180 }}
                            allowClear
                        >
                            {GENRE_OPTIONS.map(option => {
                                return <Option key={option.id} value={option.title}>{option.title}</Option>
                            })}
                        </Select>
                    </Col>

                    <Col flex="auto" style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button type="primary" onClick={applyFilters}>
                            Поиск
                        </Button>
                        <Button type="default" onClick={() => setIsModalOpen(true)}>
                            Добавить книгу
                        </Button>
                    </Col>
                </Row>
            </Card>
            <AddBookPopup visible={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
};

export default BookFilter;



