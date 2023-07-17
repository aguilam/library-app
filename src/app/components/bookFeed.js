'use client'
import "./css/bookFeed.css";
import React, { useState, useEffect } from 'react';
import { Input,Button, Card, Skeleton } from 'antd';
import SearchPanel from "./searchPanel";
const { Meta } = Card;
export default function BookFeed() {
  let search = 'Гарри Поттер';
  const [books, setBooks] = useState([]);
  const [schoolBooks, setSchoolBooks] = useState([]);
  const [schoolBooksIsbn, setSchoolBooksIsbn] = useState([]);

  const bookAdd = (Identifiers) => {
    console.log('Добавлена книга:', Identifiers);
    setSchoolBooksIsbn(prevId => [...prevId, Identifiers]);
  };

  const isbnGet = (Identifiers) => {
    const isbn13 = Identifiers.find(
      identifier => identifier.type === "ISBN_13"
    )?.identifier;
    return isbn13;
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(`https://openlibrary.org/search.json?q=${search}`);
        const data = await response.json();
        const items = data.docs || [];
        setBooks(items.map(item => ({
          id: item.key,
          volumeInfo: {
            title: item.title,
            authors: item.author_name,
            searchInfo: item.searchInfo,
            isbn: item.isbn && item.isbn[0],
            coverUrl: `https://covers.openlibrary.org/b/isbn/${item.isbn && item.isbn[0]  }-M.jpg`,
          }
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
          const response = await fetch(`https://openlibrary.org/search.json?q=${schoolBooksIsbn}`);
          const data = await response.json();
          const items = data.items || [];
          setSchoolBooks(items.map(item => ({
            id: item.key,
            volumeInfo: {
              title: item.title,
              authors: item.author_name,
              searchInfo: item.searchInfo,
              coverUrl: `https://covers.openlibrary.org/b/isbn/${item.isbn && item.isbn[0]  }-M.jpg`,
            }
          })));
          console.log('Текущие книгиIsbn:', schoolBooksIsbn);
          console.log('Текущие книги:', items);
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
        <SearchPanel></SearchPanel>
      </div>
      <div className="bookColumn">
        {books.length > 0 ? (
          books.map(book => (
            <Card key={book.isbn} className="bookContainer">
              <img src={book.volumeInfo.coverUrl} alt={book.volumeInfo.title} />
              <Meta
                title={book.volumeInfo.title}
                description={book.searchInfo && book.searchInfo.textSnippet && (
                  <p>{book.searchInfo.textSnippet}</p>
                )}
              />
              <p>{book.volumeInfo.authors?.join(', ')}</p>
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
              <img src={book.volumeInfo.coverUrl} alt={book.volumeInfo.title} />
              <Meta
                title={book.volumeInfo.title}
                description={book.searchInfo && book.searchInfo.textSnippet && (
                  <p>{book.searchInfo.textSnippet}</p>
                )}
              />
              <p>{book.volumeInfo.authors?.join(', ')}</p>
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