import React, { useState } from 'react'
import emailjs from "emailjs-com";
import { FaEnvelope, FaWhatsapp } from "react-icons/fa";
import './Contact.css'

export const Contact = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: ""
    })

    const [status, setStatus] = useState("")
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)

        emailjs
            .send(
                "service_3hitowk", 
                "template_fzdw8iw", 
                form,
                "nwPeWG5M9-CwV10ox"
            )
            .then(
                () => {
                    setStatus("✅ Message sent successfully!");
                    setForm({ name: "", email: "", message: "" })
                    setLoading(false);
                    setTimeout(() => setStatus(""), 5000);
                },
                (error) => {
                    setStatus("❌ Failed to send message. Try again.");
                    console.error(error)
                    setLoading(false);
                    setTimeout(() => setStatus(""), 5000);
                }
            )
    }

    return (
        <section id="contact" className="contact-container mt-10">
            <div className="container mx-auto px-4 lg:px-20">
                <div className="flex flex-col lg:flex-row items-stretch justify-between">
                    
                    {/* LEFT SIDE - INFO & SOCIALS */}
                    <div className="lg:w-5/12 flex flex-col justify-center">
                        <h1 className="text-white text-4xl md:text-5xl font-bold mb-6">Let's talk?</h1>
                        <p className="text-gray-400 mb-10 text-sm md:text-base leading-relaxed max-w-sm">
                            If you have any questions, proposals, or just want to have a chat, feel free to get in touch.
                        </p>

                        <div className="space-y-6">
                            <a href="mailto:shoaib10ahmed10@gmail.com" className="contact-card">
                                <div className="p-3 bg-gray-800 rounded-lg">
                                    <FaEnvelope className="text-2xl text-[#f1660a]" />
                                </div>
                                <span className="font-medium text-lg">E-mail</span>
                            </a>

                            <a href="https://wa.me/923148869788" target="_blank" rel="noopener noreferrer" className="contact-card">
                                <div className="p-3 bg-gray-800 rounded-lg">
                                    <FaWhatsapp className="text-2xl text-[#25d366]" />
                                </div>
                                <span className="font-medium text-lg">WhatsApp</span>
                            </a>
                        </div>
                    </div>

                    {/* VERTICAL DIVIDER */}
                    <div className="divider hidden lg:block" />

                    {/* RIGHT SIDE - FORM */}
                    <div className="lg:w-6/12 mt-16 lg:mt-0">
                        <form className="space-y-8" onSubmit={handleSubmit}>
                            <div className="space-y-2 text-left">
                                <label className="text-white font-medium ml-1">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="Insert your name"
                                    className="contact-input"
                                    required
                                />
                            </div>

                            <div className="space-y-2 text-left">
                                <label className="text-white font-medium ml-1">E-mail</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="Insert your e-mail"
                                    className="contact-input"
                                    required
                                />
                            </div>

                            <div className="space-y-2 text-left">
                                <label className="text-white font-medium ml-1">Message</label>
                                <textarea
                                    rows="6"
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    placeholder="Write your message"
                                    className="contact-input resize-none"
                                    required
                                ></textarea>
                            </div>

                            <div className="flex flex-col items-center lg:items-start">
                                <button
                                    className={`btn-send font-semibold transition ${
                                        loading ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                                    type="submit"
                                    disabled={loading}
                                >
                                    {loading ? "Sending..." : "Send message"}
                                </button>
                                {status && <p className="mt-4 font-medium text-center lg:text-left">{status}</p>}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
