// src/components/ContactSection.jsx
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import email from '../assets/icons/email.svg';
import phone from '../assets/icons/phone.svg';
import location from '../assets/icons/address.svg';
import connect from '../assets/icons/connect.svg';
import facebook from '../assets/icons/facebook.svg';
import instagram from '../assets/icons/instagram.svg';
import arrow from '../assets/icons/chevron-right.svg';

const Contact = () => {
  return (
    <div className="min-h-screen bg-zinc-900 text-white p-8 flex flex-col gap-8 items-center justify-center h-900px my-24">
      <Header />
      <div className="grid md:grid-cols-2 gap-8 w-full max-w-6xl h-full">
        {/* Contact Information */}
        <div className="bg-zinc-800 p-8 rounded-lg space-y-6 h-full">
          <h2 className="text-2xl font-bold">Contact Information</h2>
          <div className="grid grid-cols-2 gap-y-6 text-sm justify-start text-left">
            <div>
              <div className="flex items-start gap-2 justify-start">
                <img src={phone} alt="Phone" className="w-5 h-5" /> {/* Phone icon */}
                <span>Phone</span>
              </div>
              <p className="mt-1">+123 456 789 101</p>
              <p>+321 101 987 654</p>
            </div>
            <div >
              <div className="flex items-center gap-2">
                <img src={email} alt="Email" className="w-5 h-5" /> {/* Email icon */}
                <span>E-mail</span>
              </div>
              <a href="mailto:contact@playtrix.com" className="mt-1 underline text-teal-400">
                contact@playtrix.com
              </a>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <img src={location} alt="Location" className="w-5 h-5" /> {/* Address icon */}
                <span>Address</span>
              </div>
              <p className="mt-1">123 Game Street Los Angeles, CA 90001</p>
            </div>
          </div>
          <div>
              <div className="flex items-center gap-2">
                <img src={connect} alt="Connect" className="w-5 h-5" /> {/* Social icon */}
                <span>Connect with Us</span>
              </div>
              <div className="flex gap-4 mt-2">
                <img src={facebook} alt="Facebook" className="w-6 h-6" /> {/* Facebook */}
                <img src={instagram} alt="Instagram" className="w-6 h-6" /> {/* Instagram */}
              </div>
            </div>
        </div>

        {/* Message Form */}
        <div className="bg-zinc-800 p-8 rounded-lg space-y-6">
          <h2 className="text-2xl font-bold">Send Us a Message</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2 justify-start">
                <label className="text-sm font-semibold text-left">First Name</label>
                <input
                  type="text"
                  placeholder="Player"
                  className="w-full bg-transparent border-b border-zinc-600 outline-none py-1"
                />
              </div>
              <div className="flex flex-col gap-2 justify-start">
                <label className="text-sm font-semibold text-left">Last Name</label>
                <input
                  type="text"
                  placeholder="One"
                  className="w-full bg-transparent border-b border-zinc-600 outline-none py-1"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 justify-start">
              <label className="text-sm font-semibold text-left">E-mail</label>
              <input
                type="email"
                placeholder="hello@gamezone.com"
                className="w-full bg-transparent border-b border-zinc-600 outline-none py-1"
              />
            </div>
            <div className="flex flex-col gap-2 justify-start">
              <label className="text-sm font-semibold text-left">Message</label>
              <textarea
                placeholder="Type your message here..."
                className="w-full bg-zinc-900 border border-zinc-600 rounded-md p-3 resize-none min-h-[120px]"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-teal-400 text-black font-semibold py-3 rounded-md flex items-center justify-center gap-2"
            >
              <span>Send</span>
              <img src={arrow} alt="Arrow" className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
