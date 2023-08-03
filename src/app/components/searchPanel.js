'use client'
import "./css/bookFeed.css";
import React, { useState } from 'react';
import {Input, Form, Select, TreeSelect, Button, Slider } from 'antd';

const Bg = ({ onFinish }) => {

  const [bookName, setBookName] = useState('');
  const [bookAuthor, setBookAuthor] = useState('');
  const [publishYear, setPublishYear] = useState([]);
  const [bookGenres, setbookGenres] = useState([]);
  const [bookPlaces, setbookPlaces] = useState([]);
  const { SHOW_PARENT } = TreeSelect;
  let bookNameResponse, authorResponse, publishYearResponse, fullResponse, selectedPlaces = ''
  let selectedGenres = []
  const treeData = [
    {
      value: 'britain',
      title: 'Британия',
      key: '0-0',
      children: [
        {
          value: 'england',
          title: 'Англия',
          children: [
            {
              value: 'london',
              title: 'Лондон',
            },
            {
              value: 'oxford',
              title: 'Оксфорд',
            },
          ],
        },
        {
          value: 'wales',
          title: 'Уэльс',
          children: [
            {
              value: 'cardiff',
              title: 'Кардифф',
            },
            {
              value: 'monmuthur',
              title: 'Монмутшир',
            },
          ],
        },
        {
          value: 'scotland',
          title: 'Шотландия',
        },
        {
          value: 'ireland',
          title: 'Ирландия',
          children: [
            {
              value: 'dublin',
              title: 'Дублин',
            },
          ],
        },
      ],
    },
  ];
  /* Данные о местах*/
  const OPTIONS = 
  [ 
    {
      value: 'fantasy',
      label: 'Фэнтези',
    },
    {
      value: 'historical_fiction',
      label: 'Художественная история',
    },
    {
      value: 'short_stories',
      label: 'Рассказы',
    },
    {
      value: 'science_fiction',
      label: 'Научная фантастика',
    },
    {
      value: 'romance',
      label: 'Романы',
    },
    {
      value: 'mystery_and_detective_stories',
      label: 'Мистика и детективы',
    },
    {
      value: 'magic',
      label: 'Магия',
    },
    {
      value: 'literature',
      label: 'Классика',
    },
    {
      value: 'young_adult_fiction',
      label: 'Подростковая литература',
    },
    {
      value: 'poetry',
      label: 'Поэзия',
    },
    {
      value: 'horror',
      label: 'Ужасы',
    },
    {
      value: 'humor',
      label: 'Юмор',
    },
    {
      value: 'plays',
      label: 'Пьесы',
    },
    {
      value: 'thriller',
      label: 'Триллеры',
    },
  ];
  /* Данные о жанрах*/
  const newBookInfo = async (values) => {
    await setBookAuthor(values.authorname);
    await setBookName(values.bookname);
    await setPublishYear(values.publishyear);
    await setbookGenres(values.genre);
    await setbookPlaces(values.place);
      /* Присвоение данных полученных при нажатии кнопки из формы*/
    console.log(values.authorname)
    console.log(values.bookname)
    console.log(values.publishyear)
    console.log(values.genre)
    console.log(values.place)
    console.log(bookName)
    console.log(bookAuthor)
    console.log(publishYear)
    console.log(bookGenres)
    console.log(bookPlaces)
    /* Проверка и создание запроса который будет отправлен в bookfeed*/
    if (!bookName) {
      bookNameResponse = ''
    }
    else {
      bookNameResponse = `title=${bookName}&`
      console.log(bookNameResponse)
    }
    if(!bookAuthor) {
      authorResponse = ''
    }
    else{
      authorResponse = `author=${bookAuthor}&`
      console.log(authorResponse)
    }
    if (!bookGenres) {
      selectedGenres = []
    }
    else{
      selectedGenres = bookGenres.map((genre) => `subject=${genre}`).join('&') + '&'
      console.log(selectedGenres)
    }
    if (!bookPlaces) {
      selectedPlaces = []
    }
    else{
      selectedPlaces = bookPlaces.map((place) => `q=place:${place}`).join('&') + '&'
      console.log(selectedPlaces)
    }
    if (!publishYear) {
      publishYearResponse = [1984, 2023]
    }
    else{
      publishYearResponse = `q=first_publish_year:[${publishYear[0]}+TO+${publishYear[1]}]&`
    }
    fullResponse = (`https://openlibrary.org/search.json?${authorResponse}${bookNameResponse}${publishYearResponse}${selectedGenres}${selectedPlaces}`)
    console.log('Это запрос из панели'+fullResponse)
    onFinish(fullResponse)
    /* Функция полученная из bookfeed для передачи туда запроса*/
  }
  /* эта функция вызывается при нажатии кнопки в форме*/
  const tProps = {
    treeData,
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT,
    placeholder: 'Please select',
    style: {
      width: '100%',
    },
  };
  /* Информация о настройке выбора мест*/
  return (
    <div className="bookRow">
      <div>
        <Form
          onFinish={newBookInfo}
          layout="vertical"
        >
          <Form.Item
            label="Название книги"
            name="bookname"
          >
            <Input placeholder="Введите название книги"/>
          </Form.Item>
          <Form.Item
            label="Имя автора"
            name="authorname"
          >
            <Input placeholder="Введите Автора"/>
          </Form.Item>
          <Form.Item
            label="Год публикации книги"
            name="publishyear"
          >
            <Slider 
              range defaultValue={[1984, 2023]} min={1700}  max={2023}
            />
          </Form.Item>
          <Form.Item
            name="genre"
            label="Жанры"
          >
            <Select
              mode="multiple"
              placeholder="Выберите жанры"
              style={{
                width: '100%',
              }}
              options={OPTIONS}
            />
          </Form.Item>
          <Form.Item
            name="place"
            label="Места"
          >
            <TreeSelect {...tProps} />
          </Form.Item>
          <Button type="primary" htmlType="submit">Submit</Button>
        </Form>
      </div>
    </div>
  );
}
export default Bg;