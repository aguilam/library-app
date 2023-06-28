"use client"
import React, { useState } from 'react';
import { Menu } from 'antd';
const items = [
  {
    label: 'Navigation One',
    key: 'mail',
  },
  {
    label: 'Navigation Two',
    key: 'app',
  },
  {
    label: (
      <a href="#" target="_blank" rel="noopener noreferrer">
        Navigation Three
      </a>
    ),
    key: 'alipay',
  },
];
const Header = () => {
  const [current, setCurrent] = useState('mail');

  return <Menu mode="horizontal" items={items} />;
};

export default Header;


