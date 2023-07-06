"use client";

import Link from "next/link";
import store from "./../store/UserStore";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "./Modal";
import { observer } from "mobx-react-lite";
function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState(store.isUser);
  const [taskCreated, setTaskCreated] = useState(false);

  //user logout
  const handleLogout = () => {
    store.removeUser();
    router.push("/login");
  };

  return (
    <div className="navbar bg-base-100 max-w-7xl mx-auto sm:px-6 lg:px-8">
      <Modal taskCreated={taskCreated} setTaskCreated={setTaskCreated} />
      <div className="flex-1">
        <Link
          href="/"
          className="btn btn-ghost normal-case text-xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-pink-600"
        >
          taskManagement
        </Link>
      </div>
      {store.isUser ? (
        <div className="flex-none gap-2">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a
                onClick={() => {
                  window.my_modal_2.showModal();
                  setTaskCreated(false);
                }}
              >
                Add New Task
              </a>
            </li>

            <li>
              <details>
                <summary>Tasks</summary>
                <ul className="p-2 bg-base-100">
                  <li>
                    <a>Overview</a>
                  </li>
                  <li>
                    <a>View All Tasks</a>
                  </li>
                </ul>
              </details>
            </li>
          </ul>

          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={store.userImage} />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/login">Login</Link>
          </li>
        </ul>
      )}
    </div>
  );
}

export default observer(Navbar);
