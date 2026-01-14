import css from './Breadcrumbs.module.css';
import Link from 'next/link';

interface BreadcrumbsProps {
  title: string;
}
export default function Breadcrumbs(note: BreadcrumbsProps) {
  return (
    <nav className={css.navContainer}>
      <ul className={css.navList}>
        <li className={css.navItem}>
          <Link href="/notes/filter/all" className={css.navLink}>
            All Notes
          </Link>{' '}
        </li>
        <li className={css.navSeparator}>/</li>
        <li className={css.navItem}>
          <span>{note.title}</span>
        </li>
      </ul>
    </nav>
  );
}
