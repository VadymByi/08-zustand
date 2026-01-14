'use client';

import Link from 'next/link';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '@/lib/api';
import toast from 'react-hot-toast';
import css from './NoteList.module.css';
import { Note } from '@/types/note';

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      toast.success('Note deleted');

      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
    onError: () => {
      toast.error('Failed to delete note');
    },
  });

  if (notes.length === 0) {
    return <p className={css.empty}>No notes available.</p>;
  }

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this note?')) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <ul className={css.list}>
      {notes.map(note => (
        <li key={note.id} className={css.listItem}>
          <Link href={`/notes/${note.id}`} className={css.link}>
            <div>
              <h3 className={css.title}>{note.title}</h3>
              <p className={css.content}>
                {note.content.length > 80 ? `${note.content.slice(0, 80)}...` : note.content}
              </p>
            </div>

            <div className={css.footer}>
              <div className={css.info}>
                <span className={css.tag}>#{note.tag}</span>
                {/* <span className={css.date}>{note.createdAt}</span> */}
              </div>

              <button
                type="button"
                className={css.button}
                onClick={e => handleDelete(e, note.id)}
                disabled={deleteMutation.isPending}
                aria-label="Delete note"
              >
                {deleteMutation.isPending ? '...' : 'Delete'}
              </button>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

