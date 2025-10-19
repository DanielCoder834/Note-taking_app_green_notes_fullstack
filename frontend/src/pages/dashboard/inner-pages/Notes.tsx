import { DashboardNavbar } from "../components/DashboardNavbar";
import "../../old_notes/notes.css";
import { BsPlusSquare } from "react-icons/bs";
import { useEffect, useState } from "react";
// import { nanoid } from "nanoid";
import { v4 as uuidv4 } from "uuid";
import { MdDeleteForever } from "react-icons/md";
import { HiPencil } from "react-icons/hi2";
import { useNavigate, useParams } from "react-router-dom";
import {
  addNewNoteToDB,
  deleteNotesFromDB,
  editNotesFromDB,
  getAllNotesFromDB,
} from "../../../general/api/getCookie";

interface NoteElement {
  Title: string;
  NoteKey: string;
}

export const User_Notes = () => {
  const [notesList, setNotesList] = useState<NoteElement[]>([]);
  const [currentNoteTitle, setNoteTitle] = useState("");
  const [editNoteTitle, setEditNoteTitle] = useState("");
  const [editNoteKey, setEditNoteKey] = useState("");
  // One time use case holding my api together so the server doesn't get flooded with calls
  // PEAK production code lol
  const [apiCalled, setApiCalled] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    async function help() {
      if (!apiCalled) {
        getAllNotesFromDB().then((resp) => {
          console.log(resp.data);
          setNotesList([...resp.data]);
        });
        setApiCalled(true);
      }
    }
    help();
  }, [setNotesList, notesList]);

  const existsInNoteList = (title: string) =>
    notesList.some((noteElem) => noteElem.Title === title);

  const newNoteAdded = async (event: any) => {
    if (event.key === "Enter") {
      // Called twice
      const noteExistsInTheList = existsInNoteList(currentNoteTitle);
      if (!noteExistsInTheList && currentNoteTitle !== "") {
        const newUUId = uuidv4();
        const newNoteElem: NoteElement = {
          Title: currentNoteTitle,
          NoteKey: newUUId,
        };
        await addNewNoteToDB(currentNoteTitle, newUUId);
        setNotesList([...notesList, newNoteElem]);
        setNoteTitle("");
      } else {
        if (noteExistsInTheList) {
          alert("Note Title already Exists");
        } else if (currentNoteTitle === "") {
          alert("Can not have empty note title");
        }
      }
    }
  };

  // const;

  const handleEdit = async (event: any) => {
    if (event.key === "Enter") {
      const noteExistsInTheList = existsInNoteList(editNoteTitle);
      console.log(editNoteTitle);
      let noteElemIndex;
      const selectNoteElem =
        notesList.filter((noteElem, index) => {
          if (noteElem.NoteKey === editNoteKey) {
            noteElemIndex = index;
            return true;
          }
          return false;
        })[0] || null;
      // Also Peak production code lol.
      console.log(selectNoteElem);
      if (
        selectNoteElem === null ||
        noteElemIndex === undefined ||
        noteElemIndex === null
      ) {
        alert("Value does not exist");
      } else if (noteExistsInTheList) {
        alert("Title Already Exists. Please be original");
      } else if (editNoteTitle === "") {
        alert("Title can not be nothing");
      } else {
        // const newNoteList = [...notesList];
        // newNoteList[noteElemIndex] = {
        //   ...selectNoteElem,
        //   Title: editNoteTitle,
        // } as NoteElement;
        await editNotesFromDB(editNoteKey, editNoteTitle);
        getAllNotesFromDB().then((resp) => {
          console.log(resp.data);
          setNotesList([...resp.data]);
        });
      }
    }
  };
  const handleDelete = async (selectedNoteKey: string) => {
    let noteElemIndex;
    const selectNoteElem =
      notesList.filter((noteElem, index) => {
        if (noteElem.NoteKey === selectedNoteKey) {
          noteElemIndex = index;
          return true;
        }
        return false;
      })[0] || null;
    if (
      selectNoteElem === null ||
      noteElemIndex === undefined ||
      noteElemIndex === null
    ) {
      console.log(`select: ${selectNoteElem}`);
      console.log(`index: ${noteElemIndex}`);
      alert("Value does not exist");
    } else {
      await deleteNotesFromDB(selectedNoteKey);
      getAllNotesFromDB().then((resp) => {
        console.log(resp.data);
        setNotesList([...resp.data]);
      });
    }
  };
  return (
    <div className="bg-slate-900 h-screen flex w-screen max-w-full">
      <DashboardNavbar />
      <div className="w-full px-4 min-h-screen mx-auto min-w-0 max-w-full min-h-full">
        <div className="notes-list gap-0 min-w-[100px] grid-cols-note-grid grid-rows-note-grid max-w-[100%] overflow-y-auto h-full">
          <div className="notes bg-gray-700 my-3 mx-1 w-56 h-44">
            <div className="flex flex-column items-center justify-center h-screen inline-block">
              <label
                htmlFor="my_modal_7"
                className="btn text-center bg-gray-700 border-0 p-0 overflow-auto inline-block h-[7em]"
              >
                <BsPlusSquare className="h-full w-full" />
              </label>
            </div>
          </div>
          {/* <div className="notes bg-gray-700 my-3 mx-1 w-56 h-44">THe</div> */}
          {notesList.map((noteElem, index) => (
            <div
              className="notes bg-gray-700 my-3 mx-1 w-56 h-44 whitespace-normal"
              key={index}
            >
              <p
                className="break-words overflow-y-auto h-full"
                // onClick={() => navigate("/")}
                onClick={() => navigate(`/${id}/notes/${noteElem.NoteKey}`)}
              >
                {noteElem.Title}
              </p>
              <div className="w-full mt-3 flex justify-between">
                <label htmlFor="my_modal_for_editing">
                  <HiPencil
                    className="cursor-pointer"
                    size="1.3em"
                    onClick={() => {
                      setEditNoteKey(noteElem.NoteKey);
                      setEditNoteTitle(noteElem.Title);
                    }}
                  />
                </label>
                <MdDeleteForever
                  className="cursor-pointer"
                  size="1.3em"
                  onClick={() => handleDelete(noteElem.NoteKey)}
                />
              </div>
            </div>
          ))}
          <input type="checkbox" id="my_modal_7" className="modal-toggle" />
          <div className="modal" role="dialog">
            <div className="modal-box">
              <h3 className="text-lg font-bold">Type The Name For Your Note</h3>
              <p className="py-4">Press Enter To Apply Changes</p>
              {/* <p className="py-4">This modal works with a hidden checkbox!</p> */}
              <div className="h-3"></div>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                onKeyDown={newNoteAdded}
                value={currentNoteTitle}
                onInput={(e) =>
                  setNoteTitle((e.target as HTMLInputElement).value)
                }
              />
            </div>
            <label className="modal-backdrop" htmlFor="my_modal_7">
              Close
            </label>
          </div>

          <input
            type="checkbox"
            id="my_modal_for_editing"
            className="modal-toggle"
          />
          <div className="modal" role="dialog">
            <div className="modal-box">
              <h3 className="text-lg font-bold">Type Here Your Changes</h3>
              {/* <p className="py-4">This modal works with a hidden checkbox!</p> */}
              <div className="h-3"></div>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                onKeyDown={handleEdit}
                value={editNoteTitle}
                onInput={(e) =>
                  setEditNoteTitle((e.target as HTMLInputElement).value)
                }
              />
            </div>
            <label className="modal-backdrop" htmlFor="my_modal_for_editing">
              Close
            </label>
          </div>
          {/* rounded-[5%] bg-black mx-5 my-3 h-60 w-60 */}
          {/* <div className="notes bg-black my-3 mx-1">568×320</div>
          <div className="notes bg-black my-3 mx-1">568×320</div>
          <div className="notes bg-black my-3 mx-1">568×320</div>
          <div className="notes bg-black my-3 mx-1">568×320</div>
          <div className="notes bg-black my-3 mx-1">568×320</div> */}
        </div>
      </div>

      {/* <h1>Hello There</h1> */}
    </div>
  );
};
