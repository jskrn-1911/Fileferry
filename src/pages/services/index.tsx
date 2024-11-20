const Services: React.FC = () => {
    return (
            <section className="py-16 bg-transparent min-h-screen flex items-center justify-center">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-3xl font-bold text-slate-950">Our Services</h1>
                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-gray-100 p-6 rounded-md shadow-lg">
                            <h2 className="text-xl font-semibold text-slate-950">Fast Transfers</h2>
                            <p className="text-slate-600 mt-2">Send your files up to 1GB with ease and speed.</p>
                        </div>
                        <div className="bg-gray-100 p-6 rounded-md shadow-lg">
                            <h2 className="text-xl font-semibold text-slate-950">Secure Encryption</h2>
                            <p className="text-slate-600 mt-2">We prioritize the security of your data with end-to-end encryption.</p>
                        </div>
                        <div className="bg-gray-100 p-6 rounded-md shadow-lg">
                            <h2 className="text-xl font-semibold text-slate-950">Cloud Storage</h2>
                            <p className="text-slate-600 mt-2">Store your files safely in the cloud for easy access and management.</p>
                        </div>
                    </div>
                </div>
            </section>
    );
};

export default Services;
