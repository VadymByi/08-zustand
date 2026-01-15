import { Metadata } from 'next';
import css from './Home.module.css';
export const metadata: Metadata = {
  title: 'Site not found | NoteHub',
  description: 'Unfortunately, such pages are not available in NoteHub.',
  // url: '#/404',
  openGraph: {
    title: 'Site not found | NoteHub',
    description: 'Unfortunately, such pages are not available in NoteHub.',
    url: `https://08-zustand-qlb4javdi-vadymbyis-projects.vercel.app/404`,

    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub',
      },
    ],
  },
};
export default function NotFound() {
  return (
    <>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>Sorry, the page you are looking for does not exist.</p>
    </>
  );
}
