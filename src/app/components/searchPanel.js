import React from 'react';
import { Checkbox, Input, Menu, Radio } from 'antd';

const { SubMenu } = Menu;
const RadioGroup = Radio.Group;

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

export default function SearchPanel() {
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

  return (
    <div>
      <Input placeholder="Введите название книги" />
      <Input placeholder="Введите Автора" />
      <Input placeholder="Введите Год издания" />
      <Menu mode="inline">{getMenuItems(items)}</Menu>
    </div>
  );
}
