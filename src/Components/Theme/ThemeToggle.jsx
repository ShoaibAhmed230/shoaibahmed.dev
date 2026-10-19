import { useState } from 'react'
import { Sun, Moon } from 'lucide-react'
import './theme-light.css'

const getTheme = () => (document.documentElement.dataset.theme === 'light' ? 'light' : 'dark');

const applyTheme = (theme) => {
  if (theme === 'light') document.documentElement.dataset.theme = 'light';
  else delete document.documentElement.dataset.theme;
  try {
    localStorage.setItem('theme', theme);
  } catch {
    // storage unavailable, theme still applies for this visit
  }
};

export const ThemeToggle = () => {
  const [theme, setTheme] = useState(getTheme);

  const toggle = (e) => {
    const next = theme === 'dark' ? 'light' : 'dark';
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!document.startViewTransition || reduceMotion) {
      applyTheme(next);
      setTheme(next);
      return;
    }

    // Circular reveal expanding from the toggle button.
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

    const transition = document.startViewTransition(() => {
      applyTheme(next);
      setTheme(next);
    });
    transition.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 650, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', pseudoElement: '::view-transition-new(root)' }
      );
    });
  };

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggle}
      className="theme-toggle"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
    >
      <span className={`theme-icon ${isDark ? 'is-active' : ''}`}><Moon size={18} /></span>
      <span className={`theme-icon ${!isDark ? 'is-active' : ''}`}><Sun size={18} /></span>
    </button>
  );
};
