import ContactForm from "@/components/ContactForm";


const Contact: React.FC = () => {
    return (
            <section className="py-16 bg-transparent min-h-screen flex items-center justify-center">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-3xl font-bold text-slate-950">Contact Us</h1>
                    <p className="mt-4 text-lg text-slate-600">
                        If you have any questions, feel free to reach out. We would love to hear from you.
                    </p>
                    <ContactForm />
                </div>
            </section>
    );
};

export default Contact;
