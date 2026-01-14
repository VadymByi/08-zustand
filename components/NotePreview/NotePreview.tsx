import css from './NotePreview.module.css';
import { Note } from '@/types/note';

type Props = {
  note: Note;
};

export default function NotePreview({ note }: Props) {
  const formattedDate = new Date(note.createdAt).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div className={css.container}>
      <h2 className={css.title}>{note.title}</h2>

      <p className={css.date}>{formattedDate}</p>

      <p className={css.content}>{note.content}</p>

      {note.tag && <span className={css.tag}>{note.tag}</span>}
    </div>
  );
}

