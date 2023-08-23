"use client"
import React, { useState } from 'react';
import { Menu } from 'antd';
const items = [
  {
    label: (
      <a href="#" target="_blank" rel="noopener noreferrer">
        Лента
      </a>
    ),
    key: 'feed',
  },
  {
    label: (
      <a href="/librarian" target="_blank" rel="noopener noreferrer">
        Лента книг
      </a>
    ),
    key: 'bookfeed',
  },
  {
    label: (
      <a href="#" target="_blank" rel="noopener noreferrer">
        Школа
      </a>
    ),
    key: 'school',
  },
  {
    label: (
      <a href="#" target="_blank" rel="noopener noreferrer">
        Профиль
      </a>
    ),
    key: 'profile',
  },
];
const Header = () => {
  const [current, setCurrent] = useState('mail');

  return <Menu mode="horizontal" items={items} />;
};

export default Header;


