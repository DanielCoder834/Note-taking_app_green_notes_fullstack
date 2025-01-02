import { useEffect, useState } from "react";
import {
  getAmountDonatedByIdInDB,
  getAmountOfNotesByIdInDB,
  getTreesPlantedByIdInDB,
} from "../../../general/api/getCookie";

export const Stats = () => {
  const [amount, setAmount] = useState(0);
  useEffect(() => {
    async function setAmountFromApi() {
      setAmount(await getAmountDonatedByIdInDB());
    }
    setAmountFromApi();
  }, [setAmount]);

  const [treesPlanted, setTreesPlanted] = useState(0);
  useEffect(() => {
    async function setTreesPlantedFromApi() {
      setTreesPlanted(await getTreesPlantedByIdInDB());
    }
    setTreesPlantedFromApi();
  }, [setTreesPlanted]);

  const [amountOfNotes, setAmountOfNotes] = useState(0);
  useEffect(() => {
    async function setAmountOfNotesFromApi() {
      setAmountOfNotes(await getAmountOfNotesByIdInDB());
    }
    setAmountOfNotesFromApi();
  }, [setAmountOfNotes]);
  return (
    <div className="max-w-full mx-4 py-6 sm:mx-auto sm:px-6 lg:px-8 h-full">
      <div className="sm:flex sm:space-x-4 h-full">
        <div
          className="inline-block align-bottom bg-white rounded-lg text-center overflow-hidden shadow transform transition-all mb-4 w-full sm:w-1/3 sm:my-8
            flex justify-center items-center"
        >
          <div className="bg-white p-5">
            <div className="sm:flex sm:items-start">
              <div className="text-center sm:mt-0 sm:ml-2 sm:text-left">
                <h3 className="text-3xl pb-6 leading-6 font-medium text-gray-400">
                  Total Amount Notes
                </h3>
                <p className="text-6xl font-bold text-black">{amountOfNotes}</p>
              </div>
            </div>
          </div>
        </div>
        <div
          className="inline-block align-bottom bg-white rounded-lg text-center overflow-hidden shadow transform transition-all mb-4 w-full sm:w-1/3 sm:my-8
            flex justify-center items-center"
        >
          <div className="bg-white p-5">
            <div className="sm:flex sm:items-start">
              <div className="text-center sm:mt-0 sm:ml-2 sm:text-left">
                <h3 className="text-3xl pb-6 leading-6 font-medium text-gray-400">
                  Total Amount Donated
                </h3>
                <p className="text-6xl font-bold text-black">{amount}</p>
              </div>
            </div>
          </div>
        </div>
        <div
          className="inline-block align-bottom bg-white rounded-lg text-center overflow-hidden shadow transform transition-all mb-4 w-full sm:w-1/3 sm:my-8
            flex justify-center items-center"
        >
          <div className="bg-white p-5">
            <div className="sm:flex sm:items-start">
              <div className="text-center sm:mt-0 sm:ml-2 sm:text-left">
                <h3 className="text-3xl pb-6 leading-6 font-medium text-gray-400">
                  Total Amount of Trees Planted
                </h3>
                <p className="text-6xl font-bold text-black">{treesPlanted}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
