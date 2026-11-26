import { useEffect } from 'react'

const setAttr = (selector, attr, value) => {
  const el = document.querySelector(selector);
  if (!el || value == null) return null;
  const prev = el.getAttribute(attr);
  el.setAttribute(attr, value);
  return () => el.setAttribute(attr, prev);
};

// Per-route title, description, canonical and social tags; restores the
// previous values on unmount so the homepage keeps its own.
export const usePageMeta = ({ title, description, url }) => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;

    const restores = [
      setAttr('meta[name="description"]', 'content', description),
      setAttr('link[rel="canonical"]', 'href', url),
      setAttr('meta[property="og:url"]', 'content', url),
      setAttr('meta[property="og:title"]', 'content', title),
      setAttr('meta[property="og:description"]', 'content', description),
      setAttr('meta[name="twitter:title"]', 'content', title),
      setAttr('meta[name="twitter:description"]', 'content', description),
    ];

    return () => {
      document.title = prevTitle;
      restores.forEach((restore) => restore?.());
    };
  }, [title, description, url]);
};
