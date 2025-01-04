import { signIn, useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { HiOutlineViewGrid } from 'react-icons/hi';
import { IoCloseOutline } from 'react-icons/io5';

const BottomToggle = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleLogin = () => {
    signIn('google');
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white p-2 m-1 rounded-full shadow-xl">
      <div className="flex justify-evenly items-center">
        {isOpen && (!session &&
          <div className={`transition-all duration-900 ease-in-out transform ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <p className="text-slate-950 mx-2 me-1"><span onClick={handleLogin} className="text-blue-700 underline cursor-pointer">Log In</span>{" "}to access Actions.</p>
          </div>
        )}
        {isOpen && session && (
          <div className="fixed bottom-16 right-4 text-slate-950 bg-white p-4 rounded-lg shadow-2xl w-80">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Actions</h2>
              <IoCloseOutline onClick={() => setIsOpen(false)} size={24} className="cursor-pointer" />
            </div>
            <div className="mt-4">
              <p>Actions will be created soon.</p>
            </div>
          </div>
        )}
        {isOpen ? (<IoCloseOutline onClick={() => setIsOpen(false)} size={24} className="text-slate-950 cursor-pointer" />) : (<HiOutlineViewGrid onClick={() => setIsOpen(true)} size={24} color="black" className="cursor-pointer" />)}
      </div>
    </div>
  );
};

export default BottomToggle;
