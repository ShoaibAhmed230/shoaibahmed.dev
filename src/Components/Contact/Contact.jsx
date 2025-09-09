import React from 'react'
import { useState } from "react";
import emailjs from "emailjs-com";

export const Contact = () => {


    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    })

    const [status, setStatus] = useState("")

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        console.log('text');

    }

    const handleSubmit = (e) => {
        e.preventDefault();


        emailjs
            .send(
                "service_3hitowk", //EmailJS service ID
                "template_fzdw8iw",  //EmailJS template ID
                form,
                "nwPeWG5M9-CwV10ox"   //EmailJS public key
            )
            .then(
                () => {
                    setStatus("✅ Message sent successfully!");
                    setForm({ name: "", email: "", phone: "", message: "" })
                },
            (error) => {
                    setStatus("❌ Failed to send message. Try again.");
                    console.error(error)
                }
            )
        

    }



    return (
        <div>

            <section className=" text-white  mb-10" id='contact'>
                <div className="max-w-3xl mx-auto px-6 text-center">
                    {/* Heading */}
                    <h2 className="inline text-white text-3xl  font-bold text-center  text-[#f1660abf] cursor-pointer link link--dia" id="contact">Contact me</h2>
                    <p className="text-center text-gray-400 mt-7 mb-8">
                        Cultivating Connections: Reach Out And Connect With Me
                    </p>

                    {/* Form */}
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
                        {/* Name */}
                        <input
                            type="text"
                            name='name'
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Name"
                            className="w-full p-3 rounded bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />

                        {/* Email */}
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Email"
                            className="w-full p-3 rounded bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />

                        {/* Phone */}
                        <input
                            type="text"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="Phone Number"
                            className="w-full p-3 rounded bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 md:col-span-2"
                        />

                        {/* Message */}
                        <textarea
                            rows="4"
                            name='message'
                            value={form.message}
                            onChange={handleChange}
                            placeholder="Message..."
                            className="w-full p-3 rounded bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 md:col-span-2"
                        ></textarea>

                        {/* Button */}
                        <div className="md:col-span-2 flex justify-end">
                            <button
                                type="submit"
                                className="px-6 py-2 bg-orange-600 hover:bg-orange-700 rounded text-white font-semibold transition"
                            >
                                Send
                            </button>
                        </div>
                    </form>
                    {status && <p className='text-center mt-4'>{status}</p>}
                </div>
            </section></div>
    )
}
