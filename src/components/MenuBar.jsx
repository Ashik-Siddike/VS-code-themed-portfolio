import React from 'react';

const MENUS = ['File', 'Edit', 'Selection', 'View', 'Go', 'Run', 'Terminal', 'Help'];

const MenuBar = () => (
  <div className="menu-bar">
    {MENUS.map(m => (
      <div key={m} className="menu-bar__item">{m}</div>
    ))}
  </div>
);

export default MenuBar;
