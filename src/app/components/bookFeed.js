'use client'
import "./css/bookFeed.css";
import React, { useState, useEffect } from 'react';
import { Button, Card, Skeleton } from 'antd';
import SearchPanel from "./searchPanel";
import { Checkbox, Input, Menu, Radio } from 'antd';
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
  const [search, setSearch] = useState('Гарри Поттер');
  const [books, setBooks] = useState([]);
  const [schoolBooks, setSchoolBooks] = useState([]);
  const [schoolBooksIsbn, setSchoolBooksIsbn] = useState([]);
  const newValue = (value) => {
    setSearch(value);
    console.log(value)
    console.log(search)
  }
  const bookAdd = (Identifiers) => {
    console.log('Добавлена книга:', Identifiers);
    setSchoolBooksIsbn(prevId => [...prevId, Identifiers]);
  };

  
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(`https://openlibrary.org/search.json?q=${search}`);
        const data = await response.json();
        const items = data.docs || [];
        setBooks(items.map(item => ({
          id: item.key,
          title: item.title,
          authors: item.author_name,
          searchInfo: item.searchInfo,
          isbn: item.isbn && item.isbn[1],
          coverUrl: `https://covers.openlibrary.org/b/isbn/${item.isbn && item.isbn[0]  }-M.jpg`,
        })));
      } catch (error) {
        console.error(error);
      }
    };
    fetchBooks();
  }, [search]);

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
  
  

  return (
    <div className="bookRow">
      <div>
        <Search placeholder="Введите название книги" onSearch={newValue} enterButton />
        <Search placeholder="Введите Автора" onSearch={onSearch} enterButton />
        <div>
          <p>Выберите год публикации</p>
          <Slider 
          range defaultValue={[20, 50]}  
          />
        </div>
        <Menu mode="inline">{getMenuItems(items)}</Menu>
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