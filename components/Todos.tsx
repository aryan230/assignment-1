"use client";

import React, { useEffect, useState } from "react";
import TodoComponent from "./TodoComponent";
import store from "./../store/UserStore";
import { observer } from "mobx-react-lite";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";

function Todos() {
  const [data, setData] = useState();
  //Fetch data from Firestore
  useEffect(() => {
    if (store.isUser) {
      const unsub = onSnapshot(doc(db, "assignment", store.userId), (doc) => {
        if (doc.data()) {
          setData(doc.data().data);
        }
      });
    }
  }, []);

  return (
    <div className="overflow-x-auto py-20">
      <div className="flex w-100 h-fit-content flex-wrap">
        {data ? (
          data.map((doc) => (
            <TodoComponent key={doc.title} docu={doc} data={data} />
          ))
        ) : (
          <div className="w-100 flex flex-col items-center justify-center">
            <h1>No Tasks Found</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default observer(Todos);
