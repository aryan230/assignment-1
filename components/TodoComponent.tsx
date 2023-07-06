import React, { useState } from "react";
import EditModal from "./EditModal";
import { updateDoc } from "firebase/firestore";
import { doc } from "firebase/firestore";
import { db } from "@/firebase";
import store from "./../store/UserStore";

function TodoComponent({ docu, data }) {
  const [showModal, setshowModal] = useState(false);
  const [docData, setDocData] = useState();

  //delete task
  const handleDelete = async (document) => {
    const washingtonRef = doc(db, "assignment", store.userId);

    const findIndex = data.findIndex((a) => a.title === document.title);
    findIndex !== -1 && data.splice(findIndex, 1);

    await updateDoc(washingtonRef, {
      data,
    }).then(() => {
      setshowModal(false);
    });
  };
  
  return (
    <div className="card w-96 bg-base-100 shadow-xl m-2">
      {showModal && (
        <EditModal data={data} docu={docData} setModal={setshowModal} />
      )}
      <div className="card-body">
        <h2 className="card-title">{docu.title}</h2>
        <p>{docu.des}</p>
        <div>
          <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
            {docu.status}
          </span>
        </div>

        <div className="card-actions justify-end pt-10">
          <button
            onClick={() => {
              handleDelete(docu);
            }}
            type="button"
            className="text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Delete
            <svg
              className="w-3.5 h-3.5 ml-2"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 7H20"
                stroke="#FFFFFF"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 10L7.70141 19.3578C7.87432 20.3088 8.70258 21 9.66915 21H14.3308C15.2974 21 16.1257 20.3087 16.2986 19.3578L18 10"
                stroke="#FFFFFF"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                stroke="#FFFFFF"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            onClick={() => {
              setDocData(docu);
              setshowModal(true);
            }}
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Edit Task
            <svg
              className="w-3.5 h-3.5 ml-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default TodoComponent;
