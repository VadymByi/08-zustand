'use client';

type Props = {
  error: Error;
};

export default function NotesError({ error }: Props) {
  console.error('Error caught by error boundary:', error);
  return <p>Could not fetch the list of notes. {error.message}</p>;
}
