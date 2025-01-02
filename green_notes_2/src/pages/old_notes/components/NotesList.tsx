import { AddNote } from "./AddNote";
import { Note } from "./Note";
import "../notes.css";

// Represents the list of notes and new note component being displayed
export const NotesList = ({ notes, handleAddNote, handleDeleteNote }: any) => {
  return (
    <div className="notes-list">
      {notes.map((note: any) => (
        <Note
          id={note.id}
          text={note.text}
          date={note.date}
          handleDeleteNote={handleDeleteNote}
        />
      ))}
      <AddNote handleAddNote={handleAddNote} />
    </div>
  );
};
