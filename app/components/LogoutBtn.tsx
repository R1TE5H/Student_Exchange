"use client";

import React from "react";
import { logOut } from "../logout/actions";

const LogoutBtn = () => {
  const handleClick = () => {
    logOut();
  };

  return (
    <button
      className="text-xl p-5 font-bold bg-indigo-600 tracking-wide text-white uppercase rounded-lg hover:text-purple-400"
      onClick={handleClick}
    >
      Log out
    </button>
  );
};

export default LogoutBtn;
