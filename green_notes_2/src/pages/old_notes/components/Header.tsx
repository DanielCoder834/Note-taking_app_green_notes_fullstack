import "../notes.css";
// Represents the top of the notes section and also handles dark mode
export const Header = ({ handleToggleDarkMode }: any) => {
  return (
    <div className="header">
      <h1>Notes</h1>
      <button
        onClick={() =>
          handleToggleDarkMode((prevDarkMode: boolean) => !prevDarkMode)
        }
        className="save"
      >
        Toggle Mode
      </button>
    </div>
  );
};
