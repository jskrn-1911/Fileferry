import { useAppContext } from "@/contexts/AppContext"

const Header: React.FC = () => {
    const { user, setUser, isAuthenticated, setIsAuthenticated } = useAppContext();

    const handleLogin = () => {
        setUser('JohnDoe');
        setIsAuthenticated(true);
        localStorage.setItem('user', 'JohnDoe');
    };

    const handleLogout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('user');
    };

    return (
        <header className="bg-transparent py-4 px-8 flex justify-between items-center">
            <div className="text-white text-2xl font-semibold">
                <span style={{textShadow: "0px 0px 10px rgba(0,0,0,0.8)"}}>FileFerry</span>
            </div>
            <div className="flex items-center space-x-4">
                {isAuthenticated ? (
                    <>
                        <span className="text-white">Welcome, {user}</span>
                        <button
                            onClick={handleLogout}
                            className="text-white bg-red-500 px-4 py-2 rounded-md hover:bg-red-700 transition"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <button 
                        onClick={handleLogin}
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