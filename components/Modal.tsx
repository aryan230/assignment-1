import { db } from "@/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import store from "./../store/UserStore";

function Modal({
  taskCreated,
  setTaskCreated,
}: {
  taskCreated: any;
  setTaskCreated: any;
}) {
  const [title, setTitle] = useState("");
  const [des, setDes] = useState("");
  const [status, setStatus] = useState("Pending");

  //add task
  const addBtnClick = async (e: any) => {
    e.preventDefault();
    const collRef = doc(db, "assignment", store.userId);
    const docSnap = await getDoc(collRef);
    if (docSnap.exists()) {
      let data = docSnap.data().data;
      data.push({
        title,
        des,
        status,
        date: Date.now(),
      });

      const docRef = await setDoc(collRef, {
        data,
      }).then(() => {
        setTaskCreated(true);
      });
    } else {
      const docRef = await setDoc(collRef, {
        data: [
          {
            title,
            des,
            status,
            date: Date.now(),
          },
        ],
      }).then(() => {
        console.log("Updated");
      });
    }
  };
  return (
    <dialog id="my_modal_2" className="modal">
      {taskCreated ? (
        <form onSubmit={addBtnClick} className="modal-box">
          <div className="pt-2">
            <img src="https://i.gifer.com/7efs.gif" alt="" />
          </div>
        </form>
      ) : (
        <form onSubmit={addBtnClick} className="modal-box">
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
                placeholder="Study"
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
                defaultValue={""}
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
          <button className="btn btn-primary mt-10">Submit</button>
        </form>
      )}

      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}

export default Modal;
