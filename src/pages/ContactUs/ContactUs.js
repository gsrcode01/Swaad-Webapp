import React from "react";

const ContactUs = () => {
  return (
    <div className="p-6 max-w-xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Name"
          className="border border-gray-300 p-2 rounded-lg"
        />
        <textarea
          placeholder="Message"
          rows="4"
          className="border border-gray-300 p-2 rounded-lg"
        ></textarea>
        <button
          type="button"
          className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 cursor-pointer"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactUs;
