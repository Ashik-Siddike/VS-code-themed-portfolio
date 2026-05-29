import React from 'react';

// === Activity Bar Icons ===

export const ExplorerIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="22"
    height="22"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
  >
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
  </svg>
);

export const SearchIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="22"
    height="22"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

export const SourceControlIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="22"
    height="22"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
  >
    <circle cx="6" cy="6" r="3" />
    <circle cx="6" cy="18" r="3" />
    <circle cx="18" cy="12" r="3" />
    <path d="M6 9v6M9 12h6" />
  </svg>
);

export const ResumeIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="12" y1="11" x2="12" y2="17" />
    <polyline points="9 14 12 17 15 14" />
  </svg>
);

export const CopilotIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5L12 2z" />
  </svg>
);

export const SettingsIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="22"
    height="22"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);


// === File Explorer File Icons ===

export const HomeIcon = () => (
  <svg viewBox="0 0 24 24" width="17" height="17">
    <circle cx="12" cy="12" r="2.05" fill="#61dafb" />
    <g fill="none" stroke="#61dafb" strokeWidth="1.1">
      <ellipse rx="10.5" ry="3.8" cx="12" cy="12" />
      <ellipse rx="10.5" ry="3.8" cx="12" cy="12" transform="rotate(60 12 12)" />
      <ellipse rx="10.5" ry="3.8" cx="12" cy="12" transform="rotate(120 12 12)" />
    </g>
  </svg>
);

export const HtmlIcon = () => (
  <svg viewBox="0 0 24 24" width="17" height="17">
    <rect width="24" height="24" rx="3" fill="#e34c26" opacity="0.18" />
    <path d="M3 2l1.72 19.29L12 23l7.27-1.71L21 2H3zm13.12 14.04-4.1 1.13-4.12-1.13-.27-3.06h2.07l.14 1.6 2.18.6 2.17-.6 .23-2.56H8.08l-.19-2.16h7.04l.18-2.01H6.96L6.77 5.9h10.46l-1.11 10.14z" fill="#e34c26" />
  </svg>
);

export const JsIcon = () => (
  <svg viewBox="0 0 24 24" width="17" height="17">
    <rect width="24" height="24" rx="3" fill="#f7df1e" />
    <path d="M7.5 17.8c.4.65 1.15 1.2 2.15 1.2 1.1 0 1.85-.6 1.85-1.7V12h-1.6v5.25c0 .55-.25.8-.65.8-.4 0-.7-.25-.9-.6l-.85.35zM13.5 17.6c.5.8 1.35 1.4 2.65 1.4 1.35 0 2.35-.7 2.35-1.95 0-1.1-.65-1.6-1.85-2.1l-.4-.15c-.6-.25-.85-.4-.85-.8 0-.35.25-.6.65-.6.4 0 .65.2.9.6l1.25-.8c-.55-.9-1.3-1.2-2.15-1.2-1.25 0-2.1.8-2.1 1.95 0 1.1.65 1.6 1.65 2.05l.4.15c.7.3 1.05.5 1.05.95 0 .4-.35.7-.9.7-.65 0-1.05-.35-1.35-.85l-1.3.65z" fill="black" />
  </svg>
);

export const JsonIcon = () => (
  <svg viewBox="0 0 24 24" width="17" height="17">
    <rect width="24" height="24" rx="3" fill="#cbcb41" opacity="0.18" />
    <path
      d="M10 6c-.8 0-1.5.7-1.5 1.5v3.25c0 .4-.35.75-.75.75h-.5a.5.5 0 0 0 0 1h.5c.4 0 .75.35.75.75v3.25c0 .8.7 1.5 1.5 1.5M14 6c.8 0 1.5.7 1.5 1.5v3.25c0 .4.35.75.75.75h.5a.5.5 0 0 1 0 1h-.5c-.4 0-.75.35-.75.75v3.25c0 .8-.7 1.5-1.5 1.5"
      fill="none"
      stroke="#cbcb41"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const TsIcon = () => (
  <svg viewBox="0 0 24 24" width="17" height="17">
    <rect width="24" height="24" rx="3" fill="#3178c6" />
    <path d="M14.39 18.18V20c.36.18.8.32 1.3.42.5.1 1.03.15 1.58.15.54 0 1.05-.06 1.53-.17.48-.12.9-.3 1.26-.56.36-.25.64-.58.85-.97.21-.4.31-.87.31-1.43 0-.41-.06-.77-.18-1.08-.12-.31-.3-.59-.53-.83-.23-.24-.51-.46-.84-.65-.33-.2-.7-.38-1.11-.56-.3-.12-.56-.24-.79-.36-.23-.11-.42-.23-.58-.35-.16-.12-.28-.25-.36-.39a.92.92 0 0 1-.12-.47c0-.16.04-.31.11-.44.07-.13.17-.24.31-.33.13-.09.29-.16.48-.21.18-.05.39-.07.62-.07.17 0 .34.01.53.04.18.03.37.07.55.14.18.06.36.14.53.24.17.1.32.21.45.35v-1.7a5.4 5.4 0 0 0-1.09-.31 7.3 7.3 0 0 0-1.24-.1c-.52 0-1.01.06-1.48.18-.46.12-.87.31-1.22.56-.35.25-.62.57-.83.96-.2.39-.31.85-.31 1.39 0 .69.2 1.27.59 1.74.4.47.97.86 1.74 1.18.31.12.6.25.86.37.26.12.49.24.68.38.19.13.34.28.45.44.11.16.16.34.16.55 0 .15-.03.3-.1.43-.07.13-.17.25-.31.35-.13.1-.3.18-.5.24-.2.06-.43.09-.69.09-.44 0-.88-.08-1.31-.25a4.5 4.5 0 0 1-1.17-.76zM8.75 10.1H11.5V8.5H4.5v1.6H7.25V20h1.5V10.1z" fill="white" />
  </svg>
);

export const CssIcon = () => (
  <svg viewBox="0 0 24 24" width="17" height="17">
    <rect width="24" height="24" rx="3" fill="#264de4" opacity="0.18" />
    <path d="M3 2l1.72 19.29L12 23l7.27-1.71L21 2H3zm14.1 5.73-.26 2.8-4.84 1.37 4.84.04-.33 3.88-4.51 1.31-4.52-1.26-.3-3.38h2.8l.15 1.77 1.87.5 1.88-.5.2-2.32-6.08-.04.19-2.09 5.7.02.2-1.84H7.82l-.2-2.26h10.74l-.26.0z" fill="#264de4" />
  </svg>
);

export const MarkdownIcon = () => (
  <svg viewBox="0 0 24 24" width="17" height="17">
    <rect width="24" height="24" rx="3" fill="#519aba" opacity="0.18" />
    <rect x="2" y="5.5" width="20" height="13" rx="1.5" fill="none" stroke="#519aba" strokeWidth="1.2" />
    <path d="M5.5 10v4M5.5 10l2 2 2-2v4M13 14v-4l2 2 2-2" fill="none" stroke="#519aba" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const PdfIcon = () => (
  <svg viewBox="0 0 24 24" width="17" height="17">
    <rect width="24" height="24" rx="3" fill="#f44336" opacity="0.15" />
    <path d="M6 2h9l5 5v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" fill="none" stroke="#f44336" strokeWidth="1.3" />
    <path d="M14 2v5h5" fill="none" stroke="#f44336" strokeWidth="1.3" />
    <text x="5" y="17" fontFamily="monospace" fontSize="5.5" fontWeight="bold" fill="#f44336">PDF</text>
  </svg>
);
