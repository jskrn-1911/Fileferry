import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen  text-white">
      <div className="text-center px-6 py-12 sm:px-12">
        <h1 className="text-4xl sm:text-6xl font-extrabold mb-4">404 - Page Not Found</h1>
        <p className="text-lg sm:text-xl mb-8">Sorry, the page you are looking for does not exist.</p>
        <Link href="/" passHref>
          <button type="button" className="bg-slate-950 text-white px-6 py-3 rounded-md text-lg hover:bg-slate-900 transition">
            Go to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
