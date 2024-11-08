import { useAppContext } from "@/contexts/AppContext"
import { signIn, useSession } from "next-auth/react";
// import {  signOut } from "next-auth/react";
import { useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { GiCargoShip } from "react-icons/gi";

const Header: React.FC = () => {
    const { data: session } = useSession();
    const { user, setUser, isAuthenticated, setIsAuthenticated } = useAppContext();

    useEffect(() => {
        if (session?.user) {
            setUser({
                name: session.user.name || "",
                email: session.user.email || "",
                image: session.user.image || ""
            });
            setIsAuthenticated(true);
            localStorage.setItem("user", JSON.stringify(session.user))
        } else {
            setUser(null);
            setIsAuthenticated(false);
            localStorage.removeItem("user");
        }
    }, [session, setUser, setIsAuthenticated])

    return (
        <header className="bg-transparent py-4 px-4 flex justify-between items-center">
            <div className="flex items-center"  style={{ textShadow: "0px 0px 10px rgba(0,0,0,0.8)" }}>
                <span className="p-1 text-white text-2xl font-semibold" >FileFerry</span>
                <GiCargoShip color="white" size={24} className=""/>
            </div>
            <div className="flex bg-white px-1 py-1 rounded-md items-center ">
                {isAuthenticated ? (
                    <>
                        <span className="text-slate-950 ps-4 text-sm">Hey, {user?.name}</span>
                        <img src={user?.image} alt="Profile" className="w-8 h-8 ms-1 rounded-md border-[0.5px] border-solid border-slate-950 " />
                        <div>
                            <BsThreeDotsVertical size={20} className="text-slate-950 ps-1 m-0" />
                        </div>
                        {/* <button
                            type="button"
                            onClick={() => signOut()}
                            className="text-white bg-red-500 px-4 py-2 rounded-md hover:bg-red-700 transition"
                        >
                            Logout
                        </button> */}
                    </>
                ) : (
                    <div className="flex flex-row py-1">
                        <div className="sign-in ">
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
    );
}

export default Header;