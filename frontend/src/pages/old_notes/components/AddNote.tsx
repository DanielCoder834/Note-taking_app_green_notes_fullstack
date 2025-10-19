import { useState } from "react";
import "../notes.css";

// Represents component and logic for adding notes
export const AddNote = ({ handleAddNote }: any) => {
  const [noteText, setNoteText] = useState("");
  const characterLimit = 200;

  const handleChange = (event: any) => {
    if (characterLimit - event.target.value.length >= 0) {
      setNoteText(event.target.value);
    }
  };

  const handleSaveClick = () => {
    if (noteText.trim().length > 0) {
      handleAddNote(noteText);
      setNoteText("");
    }
  };
  return (
    <div className="notes new">
      <textarea
        placeholder="Type to add a note"
        cols={10}
        rows={8}
        onChange={handleChange}
        value={noteText}
      ></textarea>
      <div className="note-footer">
        <small>{characterLimit - noteText.length} remaining</small>
        <button className="save" onClick={handleSaveClick}>
          Save
        </button>
      </div>
    </div>
  );
};
