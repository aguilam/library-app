'use client'
import "./css/bookFeed.css";
import React, { useState, useEffect } from 'react';

export default function BookFeed() {
  let search = 'Собачье сердце'
  const [books, setBooks] = useState([]);
  const [schoolBooks, setSchoolBooks] = useState([]);
  const [schoolBooksIsbn, setSchoolBooksIsbn] = useState([]);

  const bookAdd = (Identifiers) => {
    const isbn13 = isbnGet(Identifiers);
    console.log('Добавлена книга:', isbn13);
    setSchoolBooksIsbn(prevIsbns => [...prevIsbns, isbn13]);
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
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${search}&maxResults=11`);
        const data = await response.json();
        setBooks(data.items);
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
          const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${schoolBooksIsbn}&maxResults=10`);
          const data = await response.json();
          const items = data.items || [];
          setSchoolBooks(items);
          console.log('Текущие книгиIsbn:', schoolBooksIsbn);
          console.log('Текущие книги:', items); // Исправлено: выводится обновленное значение
        } catch (error) {
          console.error(error);
        }
      };
      fetchSchoolBooks();
    }
  }, [schoolBooksIsbn]);
  
  
  return (
    <div className="bookRow">
      <div className="bookColumn">
        {books.map(book => (
          <div key={book.id} className="bookContainer">
            {book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail && (
              <img src={book.volumeInfo.imageLinks.thumbnail} alt="Обложка книги" />
            )}
            <h2>{book.volumeInfo.title}</h2> 
            {book.searchInfo && book.searchInfo.textSnippet && (
              <p>{book.searchInfo.textSnippet}</p>
            )}
            <p>{book.volumeInfo.authors?.join(', ')}</p>
            <div className="buttonContainer">
              <button onClick={() => bookAdd(book.volumeInfo.industryIdentifiers)}>Добавить в список книг</button>
            </div>
          </div>
        ))}
      </div>
      <div className="bookColumn">
        {Array.isArray(schoolBooks) && schoolBooks.map(book => (
          <div key={book.id} className="bookContainer">
            {book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail && (
              <img src={book.volumeInfo.imageLinks.thumbnail} alt="Обложка книги" />
            )}
            <h2>{book.volumeInfo.title}</h2> 
            {book.searchInfo && book.searchInfo.textSnippet && (
              <p>{book.searchInfo.textSnippet}</p>
            )}
            <p>{book.volumeInfo.authors?.join(', ')}</p>
            <div className="buttonContainer">
              <button onClick={() => bookAdd(book.volumeInfo.industryIdentifiers)}>Добавить в список книг</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}