const Upgrade: React.FC = () => {
    return (
            <section className="py-16 bg-transparent min-h-screen flex items-center justify-center">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-3xl font-bold text-slate-950">Upgrade to Premium</h1>
                    <p className="mt-4 text-lg text-slate-600">
                        Upgrade to our Premium plan to enjoy unlimited file transfer, higher storage limits, and more.
                    </p>
                    <div className="mt-8 space-x-4">
                        <button className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600">Upgrade Now</button>
                        <button className="bg-gray-500 text-white px-6 py-3 rounded-md hover:bg-gray-600">Learn More</button>
                    </div>
                </div>
            </section>
    );
};

export default Upgrade;
