import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { notFound } from 'next/navigation';
import { getQueryClient } from '@/lib/getQueryClient';
import { fetchNoteById } from '@/lib/api';
import NotePreviewClient from './NotePreview.client';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function NotePreviewModal({ params }: Props) {
  const { id } = await params;

  if (!id) {
    notFound();
  }

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreviewClient noteId={id} />
    </HydrationBoundary>
  );
}
