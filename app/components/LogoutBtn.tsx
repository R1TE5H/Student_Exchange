"use client";

import React from "react";
import { logOut } from "../logout/actions";

const LogoutBtn = () => {
  const handleClick = () => {
    logOut();
  };

  return (
    <button
      className="text-xl font-bold tracking-wide uppercase hover:text-purple-400"
      onClick={handleClick}
    >
      Log out
    </button>
  );
};

export default LogoutBtn;
