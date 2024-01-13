"use client";
import useCartService from "@/lib/hooks/useCartStore";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Menu = () => {
  const { items } = useCartService();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <div>
        <ul className="flex items-stretch">
          <li>
            <Link
              href="/cart"
              className="flex items-center btn btn-ghost rounded-btn"
            >
              <Icon icon="f7:cart" fontSize={18} />
              <span className="block">Cart</span>
              {mounted && items.length != 0 && (
                <div className="badge badge-secondary">
                  {items.reduce((a, c) => a + c.qty, 0)}{" "}
                </div>
              )}
            </Link>
          </li>
          <li>
            <button className="btn btn-ghost rounded-btn" type="button">
              Sign in
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Menu;
