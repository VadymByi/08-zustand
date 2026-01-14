'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import NotePreview from './NotePreview';

type Props = {
  noteId: string;
};

export default function NotePreviewClient({ noteId }: Props) {
  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error || !note) return <p>Failed to load note</p>;

  return <NotePreview note={note} />;
}
