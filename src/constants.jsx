import React from 'react';
import {
  HomeIcon,
  HtmlIcon,
  JsIcon,
  JsonIcon,
  TsIcon,
  CssIcon,
  MarkdownIcon,
  PdfIcon
} from './components/Icons';

// VS Code file icons and colors (legacy unused fallback, kept for stability)
export const FILE_ICONS = {
  js:     { icon: '⬡', color: '#dcdcaa' },
  jsx:    { icon: '⚛', color: '#4fc1ff' },
  ts:     { icon: 'TS', color: '#4fc1ff' },
  tsx:    { icon: '⚛', color: '#4fc1ff' },
  py:     { icon: '🐍', color: '#4ec9b0' },
  json:   { icon: '{}', color: '#ce9178' },
  md:     { icon: '📄', color: '#cccccc' },
  css:    { icon: '#', color: '#4fc1ff' },
  html:   { icon: '<>', color: '#ce9178' },
  folder: { icon: '📁', color: '#c586c0' },
};

export const THEMES = {
  'default':       'Default Dark+',
  'rose-pine':     'Rosé Pine',
  'tokyo-night':   'Tokyo Night',
  'catppuccin':    'Catppuccin Mocha',
  'nord':          'Nord',
  'gruvbox':       'Gruvbox Dark',
};

const BrowserIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <line x1="3" y1="9" x2="21" y2="9" />
    <line x1="9" y1="21" x2="9" y2="9" />
  </svg>
);

export const PAGES = [
  { id: 'home',       label: 'home.tsx',        icon: <HomeIcon />, color: '#4fc1ff' },
  { id: 'about',      label: 'about.html',       icon: <HtmlIcon />, color: '#e34c26' },
  { id: 'projects',   label: 'projects.js',      icon: <JsIcon />, color: '#f7df1e' },
  { id: 'skills',     label: 'skills.json',      icon: <JsonIcon />, color: '#cbcb41' },
  { id: 'experience', label: 'experience.ts',    icon: <TsIcon />, color: '#3178c6' },
  { id: 'contact',    label: 'contact.css',       icon: <CssIcon />, color: '#264de4' },
  { id: 'readme',     label: 'README.md',         icon: <MarkdownIcon />, color: '#519aba' },
  { id: 'resume',     label: 'Ashik_Siddike_Resume.pdf', icon: <PdfIcon />, color: '#f44336', download: true },
  { id: 'browser',    label: 'Simple Browser',   icon: <BrowserIcon />, color: '#34d399', hidden: true },
];
