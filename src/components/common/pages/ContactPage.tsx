import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);

    setFormData({ name: "", email: "", subject: "", message: "" });
    toast.success("Your response has submitted...")
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
        <Toaster  />
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white md:text-4xl sm:tracking-tight ">
            Contact <span className="text-violet-700" > EDUVERSE </span> 
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500 dark:text-gray-300">
            We're here to help you with any questions or concerns about our e-learning platform.
          </p>
        </div>

        <div className="mt-16 bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4">
          <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
            <div className="lg:self-center">
              <h2 className="text-xl font-extrabold text-gray-900 dark:text-white md:text-3xl">
                <span className="block">Get in <span className="text-violet-300" > touch </span> </span>
              </h2>
              <p className="mt-4 text-lg leading-6 text-gray-500 dark:text-gray-300">
                Fill out the form and our team will get back to you within 24 hours.
              </p>
              <div className="mt-8 space-y-6">
                <div className="flex items-center">
                  <FaEnvelope className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                  <span className="ml-3 text-gray-500 dark:text-gray-300">support@eduverse.com</span>
                </div>
                <div className="flex items-center">
                  <FaPhone className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                  <span className="ml-3 text-gray-500 dark:text-gray-300">+91 9946223344</span>
                </div>
                <div className="flex items-center">
                  <FaMapMarkerAlt className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                  <span className="ml-3 text-gray-500 dark:text-gray-300">31-A Learning Street, Education City, 676514</span>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-violet-500 rounded-md shadow-sm py-2 px-3 focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-violet-500 rounded-md shadow-sm py-2 px-3 focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-violet-500 rounded-md shadow-sm py-2 px-3 focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-violet-500 rounded-md shadow-sm py-2 px-3 focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus:ring-indigo-400"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
