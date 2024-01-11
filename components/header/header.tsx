"use client";

import Link from "next/link";
import React from "react";
import { Icon } from "@iconify/react";

export const Header = () => {
  return (
    <header>
      <nav>
        <div className="navbar justify-between bg-base-300">
          <Link href="/" className="btn btn-ghost text-lg">
            Next Amazona V2
          </Link>

          <ul className="flex">
            <li>
              <Link
                href="/cart"
                className="flex items-center btn btn-ghost rounded-btn"
              >
                <Icon icon="f7:cart" fontSize={18} />
                <span className="block">Cart</span>
              </Link>
            </li>
            <li>
              <Link
                href="/cart"
                className="flex items-center btn btn-ghost rounded-btn"
              >
                <Icon icon="codicon:sign-in" fontSize={18} />
                <span className="block">Sign In</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};
