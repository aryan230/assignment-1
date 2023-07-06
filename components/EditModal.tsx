import { db } from "@/firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import React, { useState } from "react";
import store from "./../store/UserStore";

function EditModal({
  data,
  docu,
  setModal,
  handleDelete,
}: {
  data: any;
  docu: any;
  setModal: any;
  handleDelete: any;
}) {
  const [title, setTitle] = useState(docu.title);
  const [des, setDes] = useState(docu.des);
  const [status, setStatus] = useState(docu.status);

  //update task

  const updateArray = async (document: any) => {
    const washingtonRef = doc(db, "assignment", store.userId);

    const findIndex = data.findIndex((a: any) => a.title === document.title);
    data[findIndex].title = title;
    data[findIndex].des = des;
    data[findIndex].status = status;

    await updateDoc(washingtonRef, {
      data,
    }).then(() => {
      setModal(false);
    });
  };

  return (
    <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 py-10 z-50">
      <div className="relative max-h-full w-full max-w-xl overflow-y-auto sm:rounded-2xl bg-white">
        <div className="w-full">
          <div className="m-8 my-20 max-w-[400px] mx-auto">
            <div className="mb-8">
              <h1 className="mb-4 text-3xl font-extrabold">Edit Task</h1>

              <div className="pt-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="email"
                    required
                    id="email"
                    onChange={(e) => setTitle(e.target.value)}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    defaultValue={title}
                  />
                </div>
              </div>
              <div className="py-8">
                <label
                  htmlFor="comment"
                  className="block text-sm font-medium text-gray-700"
                >
                  Add your comment
                </label>
                <div className="mt-1">
                  <textarea
                    rows={4}
                    name="comment"
                    id="comment"
                    required
                    onChange={(e) => setDes(e.target.value)}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    defaultValue={des}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700"
                >
                  Status
                </label>
                <select
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
            <div className="space-y-4">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  updateArray(docu);
                }}
                className="p-3 bg-indigo-600 rounded-full text-white w-full font-semibold"
              >
                Update
              </button>

              <button
                className="p-3 bg-white border rounded-full w-full font-semibold"
                onClick={() => {
                  console.log("Clicked");
                  setModal(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditModal;
