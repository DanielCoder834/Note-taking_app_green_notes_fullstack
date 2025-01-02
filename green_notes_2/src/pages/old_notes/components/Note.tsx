import { MdDeleteForever } from "react-icons/md";
import "../notes.css";

// Represents a single note object
export const Note = ({
  id,
  text,
  date,
  handleDeleteNote,
}: {
  id?: string;
  text?: string;
  date?: string;
  handleDeleteNote?: any;
}) => {
  return (
    <div className="notes">
      <span>{text}</span>
      <div className="note-footer">
        <small>{date}</small>
        <MdDeleteForever
          onClick={() => handleDeleteNote(id)}
          className="delete-icon"
          size="1.3em"
        />
      </div>
    </div>
  );
};
