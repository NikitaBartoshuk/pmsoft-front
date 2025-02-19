import React, { memo, FC } from 'react';
import { Input, Checkbox, DatePicker, Card, Row, Col, Button, Select } from 'antd';
import AddBookPopup from '../AddBookPopup/AddBookPopup';
import { GENRE_OPTIONS } from '../../../utils/consts';
import useBookFilters from '../../../hooks/useBookFilters';
import styles from './bookfilter.module.css';
import { IBookFilterProps } from "../../../types";

const { Option } = Select;

const BookFilter: FC<IBookFilterProps> = memo(({ onFilterChange }) => {
    const {
        filters,
        isModalOpen,
        handleChange,
        openModal,
        closeModal
    } = useBookFilters({ onFilterChange });

    return (
        <>
            <Card className={styles['filters-container']}>
                <Row gutter={[16, 16]} align="middle">
                    <Col flex="1">
                        <Input
                            placeholder="Название книги"
                            value={filters.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                        />
                    </Col>
                    <Col>
                        <Checkbox
                            checked={filters.filterByAuthor}
                            onChange={(e) => handleChange('filterByAuthor', e.target.checked)}
                        >
                            Фильтр по автору
                        </Checkbox>
                    </Col>
                    <Col flex="1">
                        <Input
                            placeholder="Имя автора"
                            value={filters.author}
                            onChange={(e) => handleChange('author', e.target.value)}
                            disabled={!filters.filterByAuthor}
                        />
                    </Col>
                    <Col>
                        <Checkbox
                            checked={filters.filterByYear}
                            onChange={(e) => handleChange('filterByYear', e.target.checked)}
                        >
                            Фильтр по году
                        </Checkbox>
                    </Col>
                    <Col>
                        <DatePicker
                            picker="year"
                            value={filters.year}
                            onChange={(date) => handleChange('year', date)}
                            disabled={!filters.filterByYear}
                            allowClear
                        />
                    </Col>
                    <Col flex="1">
                        <Select
                            placeholder="Жанр"
                            value={filters.genre}
                            onChange={(value) => handleChange('genre', value)}
                            allowClear
                            style={{ width: '100%' }}
                        >
                            {GENRE_OPTIONS.map(option => (
                                <Option key={option.id} value={option.title}>{option.title}</Option>
                            ))}
                        </Select>
                    </Col>
                    <Col flex="auto" className={styles['filter-buttons-container']}>
                        <Button type="default" onClick={openModal} style={{ marginLeft: 8 }}>Добавить книгу</Button>
                    </Col>
                </Row>
            </Card>
            <AddBookPopup visible={isModalOpen} onClose={closeModal} />
        </>
    );
});

export default BookFilter;
