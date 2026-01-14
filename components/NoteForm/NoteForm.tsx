'use client';

import { useId, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createNote, type CreateNotePayload } from '@/lib/api';
import { TAGS, NoteTag } from '@/types/note';
import { useDraftStore } from '../../lib/store/noteStore';
import css from './NoteForm.module.css';

export default function NoteForm() {
  const fieldId = useId();
  const queryClient = useQueryClient();
  const router = useRouter();

  const { draft, setDraft, clearDraft } = useDraftStore();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      toast.success('Note added successfully');
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      clearDraft();
      router.push('/notes/filter/all');
    },
    onError: () => {
      toast.error('Failed to create note');
    },
  });

  const handleSubmit = (formData: FormData) => {
    const payload: CreateNotePayload = {
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      tag: formData.get('tag') as NoteTag,
    };
    mutation.mutate(payload);
  };

  if (!isLoaded) return null;

  return (
    <form action={handleSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-title`}>Title</label>
        <input
          id={`${fieldId}-title`}
          name="title"
          className={css.input}
          value={draft.title}
          onChange={e => setDraft({ title: e.target.value })}
          required
          minLength={3}
          maxLength={50}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-content`}>Content</label>
        <textarea
          id={`${fieldId}-content`}
          name="content"
          rows={8}
          className={css.textarea}
          value={draft.content}
          onChange={e => setDraft({ content: e.target.value })}
          maxLength={500}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-tag`}>Tag</label>
        <select
          id={`${fieldId}-tag`}
          name="tag"
          className={css.select}
          value={draft.tag}
          onChange={e => setDraft({ tag: e.target.value as NoteTag })}
          required
        >
          {TAGS.map(t => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={() => router.back()}
          disabled={mutation.isPending}
        >
          Cancel
        </button>
        <button type="submit" className={css.submitButton} disabled={mutation.isPending}>
          {mutation.isPending ? 'Creating...' : 'Create note'}
        </button>
      </div>
    </form>
  );
}
