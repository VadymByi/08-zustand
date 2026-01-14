import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { NoteTag } from '@/types/note';

interface Draft {
  title: string;
  content: string;
  tag: NoteTag;
}

interface NoteState {
  draft: Draft;
  setDraft: (note: Partial<Draft>) => void;
  clearDraft: () => void;
}

const initialDraft: Draft = {
  title: '',
  content: '',
  tag: 'Todo',
};

export const useDraftStore = create<NoteState>()(
  persist(
    set => ({
      draft: initialDraft,
      setDraft: note =>
        set(state => ({
          draft: { ...state.draft, ...note },
        })),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: 'note-draft-storage',
    }
  )
);
