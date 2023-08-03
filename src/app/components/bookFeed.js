'use client'
import "./css/bookFeed.css";
import React, { useState, useEffect } from 'react';
import { Button, Card, Skeleton } from 'antd';
import Bg  from "./searchPanel";
import BookInfoDialog from "./bookInfoDialog";

const { Meta } = Card;

export default function bookFeed() {

  const [books, setBooks] = useState([]);
  let [fullResponse, setfullResponse] = useState('');
  const [schoolBooks, setSchoolBooks] = useState([]);
  const [schoolBooksIsbn, setSchoolBooksIsbn] = useState([]);
  const [showBookDialog, setShowBookDialog] = useState(false)

  const onFini = (respon) =>{
    setfullResponse(respon)
    console.log('Это запрос из фида'+fullResponse)
  }
  /* Функция которая получает данные из поисковой панели */
  const bookAdd = (Identifiers) => {
    console.log('Добавлена книга:', Identifiers);
    setSchoolBooksIsbn(prevId => [...prevId, Identifiers]);
  };
  const bookDialog = () => {
    return (
      showBookDialog && <BookInfoDialog data={bookData}/>
    );
  };
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(fullResponse);
        console.log(response)
        const data = await response.json();
        const items = data.docs || [];
        setBooks(items.map(item => ({
          id: item.key,
          title: item.title,
          authors: item.author_name,
          ratingsAverage: item.ratings_average,
          isbn: item.isbn && item.isbn[1],
          publishYear: item.publish_year,
          pages: item.number_of_pages_median,
          coverUrl: `https://covers.openlibrary.org/b/isbn/${item.isbn && item.isbn[0]}-M.jpg`,
        })));
      } catch (error) {
        console.error(error);
      }
    };
    fetchBooks();
  }, [fullResponse]);
  /* Поиск по данным о книге */
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
  /* Поиск по isbn */
  return (
    <div className="bookRow">
      <div>
        <Bg onFinish={onFini}></Bg>
      </div>
      <div className="bookColumn">
        {books.length > 0 ? (
          books.map(book => (
            <Card 
              key={book.isbn} 
              onClick={() => {
                setShowBookDialog(true);
                
              }} 
              style={{ cursor: 'pointer' }} 
              className="bookContainer"
            >
              {showBookDialog && <BookInfoDialog data={book} />}
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
                <Button type="primary" onClick={() => bookAdd(book.isbn)}>Удалить из списка книг</Button>
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