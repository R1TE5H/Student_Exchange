import Link from "next/link";
import React from "react";

interface Props {
  href: string;
  label: string;
}

const NavLink = ({ href, label }: Props) => {
  return (
    <Link
      className="text-xl font-bold tracking-wide uppercase hover:text-purple-400"
      href={href}
    >
      {label}
    </Link>
  );
};

export default NavLink;
