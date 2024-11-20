import { useAppContext } from "@/contexts/AppContext";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { GiCargoShip } from "react-icons/gi";
import { IoCloseOutline, IoMenuOutline } from "react-icons/io5";

const Header: React.FC = () => {
    const { data: session } = useSession();
    const { user, setUser, isAuthenticated, setIsAuthenticated } = useAppContext();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (session?.user) {
            setUser({
                name: session.user.name || "",
                email: session.user.email || "",
                image: session.user.image || ""
            });
            setIsAuthenticated(true);
            localStorage.setItem("user", JSON.stringify(session.user));
        } else {
            setUser(null);
            setIsAuthenticated(false);
            localStorage.removeItem("user");
        }
    }, [session, setUser, setIsAuthenticated]);

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    // Close dropdown if clicking outside of it
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <>
            <header className="bg-transparent py-2 px-4 flex justify-between items-center relative">
                <div className="left-part md:hidden ">
                    <div className="hamburger_icon flex w-[28px]" onClick={toggleMenu}>
                        {isMenuOpen ? <IoCloseOutline className="w-full h-full" /> : <IoMenuOutline className="w-full h-full" />}

                    </div>
                    <div className={` ${isMenuOpen ? "flex" : "hidden"} absolute left-0 flex top-full mt-[10px]  p-0 w-full`}>
                        <ul className="flex items-center flex-col w-full justify-center gap-x-3 text-sm bg-white rounded-md mx-4 p-[10px]">
                            <li className="p-[10px] w-full  border-b-[1px] text-slate-950 border-b-[#f1f1f1]">About</li>
                            <li className="p-[10px] w-full  border-b-[1px] text-slate-950 border-b-[#f1f1f1]">Service</li>
                            <li className="p-[10px] w-full text-slate-950">Contact</li>
                        </ul>
                    </div>
                </div>
                <div className="flex items-center" style={{ textShadow: "0px 0px 10px rgba(0,0,0,0.8)" }}>
                    <Link href="/">
                        <span className="p-1 text-white text-2xl font-semibold cursor-pointer">FileFerry</span>
                    </Link>
                    <Link href="/">
                    <GiCargoShip color="white" size={24} className="shadow-md md:text-white text-black cursor-pointer" />
                    </Link>
                </div>
                <div className="flex ">
                    <div className="hidden md:flex bg-white rounded-md me-4 px-4">
                        <ul className="flex items-center justify-center gap-x-3 text-sm ">
                            <li className="text-slate-950 ">About</li>
                            <li className="text-slate-950 ">Service</li>
                            <li className="text-slate-950 ">Contact</li>
                            {/* {isAuthenticated && <li className="text-slate-950 ">Upgrade</li>} */}
                        </ul>
                    </div>
                    <div className="flex md:bg-white px-1 py-1 rounded-md items-center md:shadow-md relative">
                        {isAuthenticated ? (
                            <div className="relative flex items-center cursor-pointer ps-4 pe-1" onClick={toggleDropdown}>
                                <span className="text-slate-950 ps-0 text-sm hidden md:inline truncate">Hey, {user?.name}</span>
                                <Image
                                    src={user?.image || '/default-profile.jpg'}
                                    alt="Profile"
                                    width={32}
                                    height={32}
                                    loading="lazy"
                                    className="md:ms-2 rounded-md border-[0.5px] border-solid border-white"
                                />
                                {/* <BsThreeDotsVertical size={20} className="text-slate-950 ps-1 m-0" /> */}
                            </div>
                        ) : (
                            <div className="flex flex-row py-1">
                                <div className="sign-in">
                                    <button
                                        type="button"
                                        onClick={() => signIn("google")}
                                        className="text-slate-950 bg-transparent px-2 text-sm py-1 rounded-md md:inline-block hidden"
                                    >
                                        Sign Up
                                    </button>
                                </div>
                                <div className="log-in">
                                    <button
                                        type="button"
                                        onClick={() => signIn("google")}
                                        className="text-black bg-white hover:bg-black hover:text-white md:text-white md:bg-slate-950 px-3 py-1 rounded-md text-sm md:hover:bg-slate-700 transition"
                                    >
                                        Log In
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* Dropdown positioned below the header */}
            {isDropdownOpen && (
                <div ref={dropdownRef} className="absolute right-4 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                    <div className="p-4 text-slate-950">
                        <p className="text-sm font-semibold">{user?.name}</p>
                        <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                    </div>
                    <hr />
                    <button
                        type="button"
                        onClick={() => signOut()}
                        className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-100 transition"
                    >
                        Sign Out
                    </button>
                </div>
            )}
        </>
    );
};

export default Header;
