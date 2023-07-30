'use client'
import "./css/bookFeed.css";
import React, { useState, useEffect } from 'react';
import { Button, Card, Skeleton } from 'antd';
import SearchPanel from "./searchPanel";
import { Checkbox, Input, Menu, Radio, Form, Select, TreeSelect } from 'antd';
import { Slider } from 'antd';
const { Search } = Input;
const { SubMenu } = Menu;
const RadioGroup = Radio.Group;
const onSearch = (value) => console.log(value);
const { Meta } = Card;

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem('Жанры', 'genres', null, [
    getItem(<Checkbox>Фантастика</Checkbox>, '1'),
    getItem(<Checkbox>Детектив</Checkbox>, '2'),
    getItem(<Checkbox>Роман</Checkbox>, '3'),
    getItem(<Checkbox>Фэнтези</Checkbox>, '4'),
    getItem(<Checkbox>Приключения</Checkbox>, '5'),
    getItem(<Checkbox>Ужасы</Checkbox>, '6'),
    getItem(<Checkbox>Классика</Checkbox>, '7'),
    getItem(<Checkbox>Исторический роман</Checkbox>, '8'),
    getItem(<Checkbox>Научная литература</Checkbox>, '9'),
    getItem(<Checkbox>Биография и автобиография</Checkbox>, '10')
  ]),
  getItem('Языки', 'Language', null, [
    getItem(<Radio>Русский</Radio>, '11'),
    getItem(<Radio>Английский</Radio>, '12'),
    getItem(<Radio>Французский</Radio>, '13'),
    getItem(<Radio>Испанский</Radio>, '14'),
    getItem(<Radio>Немецкий</Radio>, '15'),
    getItem(<Radio>Итальянский</Radio>, '16')
  ]),
  getItem('Страны', 'Country', null, [
    getItem(<Radio>Россия</Radio>, '17'),
    getItem(<Radio>Великобритания</Radio>, '18'),
    getItem(<Radio>Франция</Radio>, '19'),
    getItem(<Radio>США</Radio>, '20'),
    getItem(<Radio>Германия</Radio>, '21'),
    getItem(<Radio>Испания</Radio>, '22'),
    getItem(<Radio>Италия</Radio>, '23')
  ]),
];
export default function BookFeed() {
  const getMenuItems = items => {
    return items.map(item => {
      if (item.type === 'divider') {
        return <Menu.Divider key={item.key} />;
      } else if (item.children) {
        return (
          <SubMenu key={item.key} icon={item.icon} title={item.label}>
            {item.children.map(childItem => (
              <Menu.Item key={childItem.key}>{childItem.label}</Menu.Item>
            ))}
          </SubMenu>
        );
      } else {
        return (
          <Menu.Item key={item.key}>
            <RadioGroup>{item.label}</RadioGroup>
          </Menu.Item>
        );
      }
    });
  };
  const [bookName, setBookName] = useState('Garry Potter');
  const [bookAuthor, setBookAuthor] = useState('Rowling');
  const [publishYear, setPublishYear] = useState([1950,2023]);
  const [bookGenres, setbookGenres] = useState([]);
  const [bookPlaces, setbookPlaces] = useState([]);
  const [books, setBooks] = useState([]);
  const [schoolBooks, setSchoolBooks] = useState([]);
  const [schoolBooksIsbn, setSchoolBooksIsbn] = useState([]);
  const { SHOW_PARENT } = TreeSelect;
  let bookNameResponse = ''
  let authorResponse = ''
  let publishYearResponse = ''
  let fullResponse = ''
  let selectedPlaces = ''
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
          key: '0-1',
          children: [
            {
              value: 'london',
              title: 'Лондон',
              key: '0-2',
            },
            {
              value: 'oxford',
              title: 'Оксфорд',
              key: '0-3',
            },
          ],
        },
        {
          value: 'wales',
          title: 'Уэльс',
          key: '0-4',
          children: [
            {
              value: 'cardiff',
              title: 'Кардифф',
              key: '0-5',
            },
            {
              value: 'monmuthur',
              title: 'Монмутшир',
              key: '0-6',
            },
          ],
        },
        {
          value: 'scotland',
          title: 'Шотландия',
          key: '0-7',
        },
        {
          value: 'ireland',
          title: 'Ирландия',
          key: '0-8',
          children: [
            {
              value: 'leaf1',
              title: 'Дублин',
              key: '0-9',
            },
          ],
        },
      ],
    },
  ];
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
  
  const newBookInfo = (values) => {
    setBookAuthor(values.authorname);
    setBookName(values.bookname);
    setPublishYear(values.publishyear)
    setbookGenres(values.genre)
    setbookPlaces(values.place)
    console.log(values.bookname)
    console.log(values.authorname)
    console.log(values.publishyear)
    console.log(values.genre)
    console.log(values.place)
  }
  const bookAdd = (Identifiers) => {
    console.log('Добавлена книга:', Identifiers);
    setSchoolBooksIsbn(prevId => [...prevId, Identifiers]);
  };
  const bookInfoCheck = () => {
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
    publishYearResponse = `q=first_publish_year:[${publishYear[0]}+TO+${publishYear[1]}]&`
    fullResponse = (`https://openlibrary.org/search.json?${authorResponse}${bookNameResponse}${publishYearResponse}${selectedGenres}${selectedPlaces}`)
    console.log(fullResponse)
    console.log("dfe")
  }
  
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        bookInfoCheck()
        const response = await fetch(fullResponse);
        console.log(response)
        const data = await response.json();
        const items = data.docs || [];
        setBooks(items.map(item => ({
          id: item.key,
          title: item.title,
          authors: item.author_name,
          searchInfo: item.searchInfo,
          isbn: item.isbn && item.isbn[1],
          coverUrl: `https://covers.openlibrary.org/b/isbn/${item.isbn && item.isbn[0]}-M.jpg`,
        })));
      } catch (error) {
        console.error(error);
      }
    };
    fetchBooks();
  }, [bookName, bookAuthor, publishYear, bookGenres, bookPlaces]);

  useEffect(() => {
    if (schoolBooksIsbn.length > 0) {
      const fetchSchoolBooks = async () => {
        try {
          const bookPromises = schoolBooksIsbn.map(isbn => fetch(`https://openlibrary.org/search.json?q=${isbn}`).then(response => response.json()));
          const bookData = await Promise.all(bookPromises);
          const formattedBooks = bookData.map(item => ({
            id: item.docs[0].key,
            title: item.docs[0].title,
            authors: item.docs[0].author_name,
            searchInfo: item.docs[0].searchInfo,
            coverUrl: `https://covers.openlibrary.org/b/isbn/${item.docs[0].isbn[0]}-M.jpg`,
          }));
          setSchoolBooks(formattedBooks);
          console.log('Текущие книгиIsbn:', schoolBooksIsbn);
          console.log('Текущие книги:', formattedBooks);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchSchoolBooks();
    }
  }, [schoolBooksIsbn]);
  
  const tProps = {
    treeData,
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT,
    placeholder: 'Please select',
    style: {
      width: '100%',
    },
  };

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
      <div className="bookColumn">
        {books.length > 0 ? (
          books.map(book => (
            <Card key={book.isbn} className="bookContainer">
              <img src={book.coverUrl} alt={book.title} />
              <Meta
                title={book.title}
                description={book.searchInfo && book.searchInfo.textSnippet && (
                  <p>{book.searchInfo.textSnippet}</p>
                )}
              />
              <p>{book.authors?.join(', ')}</p>
              <div className="buttonContainer">
                <Button type="primary" onClick={() => bookAdd(book.isbn)}>Добавить в список книг</Button>
              </div>
            </Card>
          ))
        ) : (
          <Skeleton active />
        )}
      </div>
      <div className="bookColumn">
        {Array.isArray(schoolBooks) && schoolBooks.length > 0 ? (
          schoolBooks.map(book => (
            <Card key={book.id} className="bookContainer">
              <img src={book.coverUrl} alt={book.title} />
              <Meta
                title={book.title}
                description={book.searchInfo && book.searchInfo.textSnippet && (
                  <p>{book.searchInfo.textSnippet}</p>
                )}
              />
              <p>{book.authors?.join(', ')}</p>
              <div className="buttonContainer">
                <Button type="primary" onClick={() => bookAdd(book.isbn)}>Добавить в список книг</Button>
              </div>
            </Card>
          ))
        ) : (
          <Skeleton active />
        )}
      </div>
    </div>
  );
}