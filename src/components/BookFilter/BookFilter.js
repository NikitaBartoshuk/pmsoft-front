import React, { useState } from 'react';
import { Input, Checkbox, DatePicker, Card, Row, Col, Button, Select } from 'antd';

const { Option } = Select;

const BookFilter = () => {
    const [filterByAuthor, setFilterByAuthor] = useState(false);
    const [filterByYear, setFilterByYear] = useState(false);
    const [genre, setGenre] = useState(null);  // Значение по умолчанию null

    return (
        <Card style={{ margin: '20px 0', padding: '10px' }}>
            <Row gutter={[16, 16]} align="middle" justify="center">
                {/* Поле для поиска по названию книги */}
                <Col>
                    <Input placeholder="Название книги" style={{ width: 220 }} />
                </Col>

                {/* Фильтр по автору */}
                <Col>
                    <Checkbox onChange={(e) => setFilterByAuthor(e.target.checked)}>
                        Фильтр по автору
                    </Checkbox>
                </Col>

                <Col>
                    <Input
                        placeholder="Имя автора"
                        disabled={!filterByAuthor}
                        style={{ width: 180 }}
                    />
                </Col>

                {/* Фильтр по году */}
                <Col>
                    <Checkbox onChange={(e) => setFilterByYear(e.target.checked)}>
                        Фильтр по году
                    </Checkbox>
                </Col>

                <Col>
                    <DatePicker
                        picker="year"
                        disabled={!filterByYear}
                        style={{ width: 120 }}
                    />
                </Col>

                {/* Селектор жанра */}
                <Col>
                    <Select
                        placeholder="Жанр"  // Этот текст должен показываться, если ничего не выбрано
                        value={genre}
                        onChange={(value) => setGenre(value)}
                        style={{ width: 180 }}
                    >
                        <Option value="fantasy">Фэнтези</Option>
                        <Option value="adventure">Приключения</Option>
                        <Option value="humor">Юмор</Option>
                        <Option value="poetry">Поэзия</Option>
                        <Option value="horror">Ужасы</Option>
                        <Option value="fantasy_science">Фантастика</Option>
                        <Option value="thriller">Триллер</Option>
                        <Option value="action">Боевик</Option>
                        <Option value="romance">Любовный роман</Option>
                    </Select>
                </Col>

                {/* Кнопка поиска */}
                <Col>
                    <Button type="primary">Поиск</Button>
                </Col>
            </Row>
        </Card>
    );
};

export default BookFilter;


