import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

import NotesClient from './Notes.client';
import { fetchNotes } from '@/lib/api';

import { NoteTag, TAGS } from '@/types/note';
import { getQueryClient } from '@/lib/getQueryClient';

type PageProps = {
  params: Promise<{
    slug?: string[];
  }>;
};

const PER_PAGE = 10;

export default async function FilteredNotesPage({ params }: PageProps) {
  const { slug } = await params;

  const rawTag = slug?.[0];

  const tag: NoteTag | undefined =
    !rawTag || rawTag === 'all'
      ? undefined
      : TAGS.includes(rawTag as NoteTag)
      ? (rawTag as NoteTag)
      : undefined;

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, '', tag],
    queryFn: () =>
      fetchNotes({
        page: 1,
        perPage: PER_PAGE,
        tag,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
