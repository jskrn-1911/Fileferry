import { useAppContext } from "@/contexts/AppContext";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { GiCargoShip } from "react-icons/gi";

const Header: React.FC = () => {
    const { data: session } = useSession();
    const { user, setUser, isAuthenticated, setIsAuthenticated } = useAppContext();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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
            {/* Header */}
            <header className="bg-transparent py-2 px-4 flex justify-between items-center">
                <div className="flex items-center" style={{ textShadow: "0px 0px 10px rgba(0,0,0,0.8)" }}>
                    <span className="p-1 text-white text-2xl font-semibold">FileFerry</span>
                    <GiCargoShip color="white" size={24} className="shadow-md" />
                </div>
                <div className="flex bg-white px-1 py-1 rounded-md items-center shadow-md relative">
                    {isAuthenticated ? (
                        <div className="relative flex items-center cursor-pointer"  onClick={toggleDropdown}>
                            <span className="text-slate-950 ps-4 text-sm">Hey, {user?.name}</span>
                            <Image
                                src={user?.image || '/default-profile.jpg'}
                                alt="Profile"
                                width={32}
                                height={32}
                                loading="lazy"
                                className="ms-1 rounded-md border-[0.5px] border-solid border-slate-950"
                            />
                            <BsThreeDotsVertical size={20} className="text-slate-950 ps-1 m-0" />
                        </div>
                    ) : (
                        <div className="flex flex-row py-1">
                            <div className="sign-in">
                                <button
                                    type="button"
                                    onClick={() => signIn("google")}
                                    className="text-slate-950 bg-transparent px-2 text-sm py-1 rounded-md"
                                >
                                    Sign Up
                                </button>
                            </div>
                            <div className="log-in">
                                <button
                                    type="button"
                                    onClick={() => signIn("google")}
                                    className="text-white bg-slate-950 px-3 py-1 rounded-md text-sm hover:bg-slate-700 transition"
                                >
                                    Log In
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </header>

            {/* Dropdown positioned below the header */}
            {isDropdownOpen && (
                <div ref={dropdownRef} className="absolute right-4 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                    <div className="p-4 text-slate-950">
                        <p className="text-sm font-semibold">{user?.name}</p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
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
