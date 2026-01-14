'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { fetchNoteById } from '@/lib/api';
import NotePreview from '@/components/NotePreview/NotePreview';
import Modal from '@/components/Modal/Modal';

type Props = {
  noteId: string;
};

export default function NotePreviewClient({ noteId }: Props) {
  const router = useRouter();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
    refetchOnMount: false,
  });

  const handleClose = () => {
    router.back();
  };

  return (
    <Modal onClose={handleClose}>
      {isLoading && <p>Loading...</p>}
      {error || (!note && !isLoading) ? (
        <p>Failed to load note</p>
      ) : (
        note && <NotePreview note={note} />
      )}
    </Modal>
  );
}
