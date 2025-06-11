'use client';

import { RootState } from "@/redux/store";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useLayoutEffect, useState } from "react";

const Navbar = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [isMounted, setIsMounted] = useState(false);

  useLayoutEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <div className="flex justify-between p-5 sm:px-6 md:px-10 lg:px-14">
        <div>
          <Link href={'/'} className="cursor-pointer">Logo here</Link>
        </div>
        <div>
          <ul className="inline-flex space-x-4">
            <Link href={'/'} className="cursor-pointer">Home</Link>
            <li>
              {
                userInfo ? (
                  <>
                    <Link href={'/profile'} className="cursor-pointer hover:underline">
                      Profile
                    </Link>
                  </>
                ) : (
                  <Link href={'/login'} className="cursor-pointer hover:underline">
                    Login
                  </Link>
                )
              }
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar;
