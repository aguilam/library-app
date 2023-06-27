import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link href="/">Главная</Link>
          </li>
          <li>
            <Link href="/about">О нас</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

