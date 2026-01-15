import { Metadata } from 'next';
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

const getTagFromSlug = (slug?: string[]): NoteTag | undefined => {
  const rawTag = slug?.[0];
  if (!rawTag || rawTag === 'all') return undefined;
  return TAGS.includes(rawTag as NoteTag) ? (rawTag as NoteTag) : undefined;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tag = getTagFromSlug(slug);

  const categoryName = tag ? tag : 'All';
  const title = `Notes: filter by category - ${categoryName} | NoteHub`;
  const description = `Browse our collection of notes in the "${categoryName}" category. Stay organized and productive with NoteHub.`;

  const currentPath = `/notes/filter/${tag || 'all'}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://08-zustand-qlb4javdi-vadymbyis-projects.vercel.app/${currentPath}`,
      type: 'website',
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: `Notes filter: ${categoryName}`,
        },
      ],
    },
  };
}

export default async function FilteredNotesPage({ params }: PageProps) {
  const { slug } = await params;
  const tag = getTagFromSlug(slug);
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
