import React from 'react';
import { PAGES } from '../constants';

const TabBar = ({ activePage, setActivePage, openTabs, closeTab }) => (
  <div className="tab-bar">
    {openTabs.map(pageId => {
      const page = PAGES.find(p => p.id === pageId);
      if (!page) return null;
      const isActive = activePage === page.id;
      return (
        <div
          key={page.id}
          className={`tab${isActive ? ' active' : ''}`}
          onClick={() => setActivePage(page.id)}
          title={`${page.label} (Ctrl+${PAGES.findIndex(p => p.id === page.id) + 1})`}
        >
          <span style={{ display: 'inline-flex', alignItems: 'center', flexShrink: 0 }}>{page.icon}</span>
          <span style={{ fontSize: '12px' }}>{page.label}</span>
          <span
            className="tab__close"
            title="Close"
            onClick={(e) => closeTab ? closeTab(page.id, e) : null}
            style={{ fontSize: '12px', lineHeight: 1 }}
          >
            ✕
          </span>
        </div>
      );
    })}
  </div>
);

export default TabBar;
