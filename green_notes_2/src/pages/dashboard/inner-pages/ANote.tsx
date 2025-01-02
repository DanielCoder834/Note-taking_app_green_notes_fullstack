import { useEffect, useState } from "react";
import {
  retrieveThyNoteFromThysDungeon,
  saveNoteTextToDB,
} from "../../../general/api/getCookie";
import { useNavigate, useParams } from "react-router-dom";

export const ANote = () => {
  const { notes_id } = useParams();
  const navigate = useNavigate();
  const [textAreaText, setTextAreaText] = useState("");
  const [savedText, setSavedText] = useState("");

  // Peak Production code is back
  const [apiCalled, setApiCalled] = useState(false);
  useEffect(() => {
    if (!apiCalled) {
      async function setTextToInTheDB() {
        if (typeof notes_id === "string") {
          await retrieveThyNoteFromThysDungeon(notes_id)
            .then((resp) => {
              setTextAreaText(resp.data);
              setSavedText(resp.data);
            })
            .catch((err) => {
              console.log(err);
            });
          console.log(`Area: ${textAreaText}`);
          console.log(`Saved: ${savedText}`);
        } else {
          alert("Note id is missing");
        }
        setApiCalled(true);
      }
      setTextToInTheDB();
    }
  }, [
    setTextAreaText,
    setSavedText,
    setApiCalled,
    textAreaText,
    savedText,
    apiCalled,
  ]);
  const sendTextToDatabase = async () => {
    if (typeof notes_id === "string") {
      await saveNoteTextToDB(notes_id, textAreaText);
    } else {
      alert("Note id is missing");
    }
  };
  return (
    <div>
      <div>
        <button
          className="btn btn-outline btn-info my-2 float-left ml-6"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
        <button
          className="btn btn-outline btn-accent my-2 float-right mr-6"
          onClick={async () => {
            await setSavedText(textAreaText);
            await sendTextToDatabase();
          }}
        >
          {textAreaText === savedText ? "Saved" : "Click To Save"}
        </button>
      </div>

      <textarea
        className="h-screen w-screen overflow-auto border-none outline-none shadow-none resize-none 
        bg-slate-950 text-[#F5F5DC]"
        name=""
        id=""
        onInput={(e) =>
          setTextAreaText((e.target as HTMLTextAreaElement).value)
        }
        value={textAreaText}
      ></textarea>
    </div>
  );
};
