'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import css from './NoteDetails.module.css';

interface Props {
  noteId: string;
}

export default function NoteDetailsClient({ noteId }: Props) {
  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading note...</p>;
  if (error || !note) return <p>Failed to load note.</p>;

  return (
    <div className={css.container}>
      <Breadcrumbs title={note.title} />
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>{note.createdAt}</p>
      </div>
    </div>
  );
}

