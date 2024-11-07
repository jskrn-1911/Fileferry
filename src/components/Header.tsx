import { useAppContext } from "@/contexts/AppContext"
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

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
        <header className="bg-transparent py-4 px-8 flex justify-between items-center">
            <div className="text-white text-2xl font-semibold">
                <span style={{ textShadow: "0px 0px 10px rgba(0,0,0,0.8)" }}>FileFerry</span>
            </div>
            <div className="flex items-center space-x-4">
                {isAuthenticated ? (
                    <>
                        <span className="text-white">Welcome, {user?.name}</span>
                        <img src={user?.image} alt="Profile" className="w-8 h-8 rounded-full" />
                        <button
                            type="button"
                            onClick={() => signOut()}
                            className="text-white bg-red-500 px-4 py-2 rounded-md hover:bg-red-700 transition"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <button
                        type="button"
                        onClick={() => signIn("google")}
                        className="text-white bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-700 transition"
                    >
                        Login
                    </button>
                )}
            </div>
        </header>
    );
}

export default Header;