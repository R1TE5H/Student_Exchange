import Link from "next/link";
import React from "react";

interface Props {
  href: string;
  label: string;
}

const NavLink = ({ href, label }: Props) => {
  return (
    <Link
      className="text-xl p-5 font-bold bg-indigo-600 tracking-wide text-white uppercase rounded-lg hover:text-purple-400"
      href={href}
    >
      {label}
    </Link>
  );
};

export default NavLink;
