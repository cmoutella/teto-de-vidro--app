"use client";
import SessionButton from "../sessionButton";

const PublicNavbar = () => {
  return (
    <div className="w-full py-2 sm:py-3 md:py-4 sm:px-4 md:px-10 lg:px-14 flex justify-center items-center bg-brand-primary-400">
      <div className="container flex flex-row gap-6 justify-between items-center">
        <div>Logo</div>
        <SessionButton />
      </div>
    </div>
  );
};

export default PublicNavbar;
