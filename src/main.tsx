import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Global protection to prevent right-clicking and dragging of images
if (typeof window !== 'undefined') {
  document.addEventListener('contextmenu', (e) => {
    const target = e.target as HTMLElement;
    if (target && (target.tagName === 'IMG' || target.closest('img') || target.tagName === 'video' || target.closest('video'))) {
      e.preventDefault();
    }
  });

  document.addEventListener('dragstart', (e) => {
    const target = e.target as HTMLElement;
    if (target && (target.tagName === 'IMG' || target.closest('img'))) {
      e.preventDefault();
    }
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
