import React from 'react'
import { IoGridOutline } from "react-icons/io5";

const BottomMenu = () => {
  return (
   <>
   <label className="popup inline-block fixed bottom-5 right-5 z-50">
        <input type="checkbox" className='hidden' />
        <div className="burger bg-white p-[10px] rounded-full   cursor-pointer">
          {/* <span />
          <span />
          <span /> */}
          <IoGridOutline/>
        </div>
        <div className="popup-window transform scale-[0.8] bottom-[126%] right-[2%] invisible opacity-0 absolute bg-white rounded-[10px] shadow shadow-[#ccc] transition duration-[.1s] ease-in-out py-[10px] px-[15px]">
            <ul className='flex flex-col gap-2 text-end'>
                <li>
                <a href="#">Home</a>
                </li>
                <li>
                <a href="#">About</a>
                </li>
                <li>
                <a href="#">Services</a>
                </li>
                <li>
                <a href="#">Contact</a>
                </li>
            </ul>
        </div>
      </label>
   </>
  )
}

export default BottomMenu