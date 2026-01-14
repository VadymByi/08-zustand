'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Toaster, toast } from 'react-hot-toast';
import { useDebounce } from 'use-debounce';
import Link from 'next/link';

import css from './NotesPage.module.css';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import MonkeyLoader from '@/components/MonkeyLoader/MonkeyLoader';

import { fetchNotes } from '@/lib/api';
import { NoteTag } from '@/types/note';

const PER_PAGE = 10;
const MONKEY_DURATION = 3000;

type NotesClientProps = {
  tag?: NoteTag;
};

export default function NotesClient({ tag }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [showMonkey, setShowMonkey] = useState(false);

  const [searchInput, setSearchInput] = useState(() => {
    if (typeof window === 'undefined') return '';
    return localStorage.getItem('notes-search') ?? '';
  });

  const [debouncedSearch] = useDebounce(searchInput, 500);

  const { data, isFetching } = useQuery({
    queryKey: ['notes', page, debouncedSearch, tag],
    queryFn: () =>
      fetchNotes({
        page,
        perPage: PER_PAGE,
        search: debouncedSearch || undefined,
        tag,
      }),
    placeholderData: prev => prev,
  });

  useEffect(() => {
    setShowMonkey(isFetching);
  }, [isFetching]);

  useEffect(() => {
    if (debouncedSearch && data && data.notes.length === 0) {
      toast('No notes found', { icon: '🔍' });
    }
  }, [data, debouncedSearch]);

  useEffect(() => {
    if (page !== 1) {
      setPage(1);
    }
  }, [tag]);

  return (
    <div className={css.app}>
      <Toaster position="top-right" />

      <header className={css.toolbar}>
        <SearchBox
          value={searchInput}
          onChange={val => {
            setSearchInput(val);
            setPage(1);
            localStorage.setItem('notes-search', val);
          }}
        />

        {data && data.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            currentPage={page}
            onPageChange={p => setPage(p)}
          />
        )}

        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </header>

      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}

      <MonkeyLoader show={showMonkey} duration={MONKEY_DURATION} />
    </div>
  );
}
