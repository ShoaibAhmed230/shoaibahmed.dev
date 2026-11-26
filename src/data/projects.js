import projects from './projects.json'

const thumbnails = import.meta.glob('../assets/Images/*.webp', { eager: true, import: 'default' });

export const projectData = projects.map((p) => ({ ...p, img: thumbnails[`../assets/Images/${p.img}.webp`] }));
