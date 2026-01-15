import { Metadata } from 'next';
import NoteForm from '@/components/NoteForm/NoteForm';
import css from './CreateNote.module.css';

export const metadata: Metadata = {
  title: 'Create New Note | NoteHub',
  description: 'Create a new note to keep your thoughts organized.',
  //   url: '/notes/action/create',
  openGraph: {
    title: 'Create New Note | NoteHub',
    description: 'Create a new note to keep your thoughts organized.',
    url: 'https://08-zustand-qlb4javdi-vadymbyis-projects.vercel.app/notes/action/create',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub Create Note',
      },
    ],
  },
};

export default function CreateNotePage() {
  return (
    <main className={css.app}>
      {' '}
      <div className={css.container}>
        <h1 className={css.title} style={{ marginBottom: '20px' }}>
          Create note
        </h1>
        <NoteForm />
      </div>
    </main>
  );
}
