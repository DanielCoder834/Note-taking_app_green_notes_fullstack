import "./notes.css";
import { nanoid } from "nanoid";
import { NotesList } from "./components/NotesList";
import { useEffect, useState } from "react";
import { Search } from "./components/search";
import { Header } from "./components/Header";
// TODO: Remake notes app to coordinate better with the application at scale.
// Eg. move some logic to the server
export const NoteApp = ({ setDarkMode }: any) => {
  // The note objects currently being displayed
  const [notes, setNotes] = useState([
    // The default note object
    {
      id: nanoid(),
      text: "This is my first note!",
      date: "example date",
    },
  ]);

  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    // Storage for notes
    const localStorageItem = localStorage.getItem("react-notes-app-data");
    if (localStorageItem) {
      const savedNotes = JSON.parse(localStorageItem);
      setNotes(savedNotes);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("react-notes-app-data", JSON.stringify(notes));
  }, [notes]);

  // How to notes are being added
  const addNote = (text: string) => {
    const date = new Date().toLocaleDateString();
    const newNote = {
      id: nanoid(),
      text,
      date,
    };
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
  };

  // Logic for deleting notes
  const deleteNote = (id: string) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };
  // The page for the notes
  return (
    <div>
      <div className="container">
        <Header handleToggleDarkMode={setDarkMode} />
        <Search handleSearchNote={setSearchText} />
        <NotesList
          notes={notes.filter((note) =>
            note.text.toLowerCase().includes(searchText)
          )}
          handleAddNote={addNote}
          handleDeleteNote={deleteNote}
        />
      </div>
    </div>
  );
};
