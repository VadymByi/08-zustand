import { ReactNode } from 'react';
import css from '../LayoutNotes.module.css';

type Props = {
  children: ReactNode;
  sidebar: ReactNode;
};

export default function FilterLayout({ children, sidebar }: Props) {
  return (
    <div className={css.container}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <main className={css.notesWrapper}>{children}</main>
    </div>
  );
}
