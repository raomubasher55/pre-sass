import React, { useState } from "react";
import { HeroBanner } from "../homepage/HeroBanner";
import Navbar from "../homepage/Navbar";
import { FooterPrime } from "../presentation/FooterPrime";
import { AllAbouJumiaFooter } from "../presentation/AllAbouJumiaFooter";

export default function ContactUs() {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsFormSubmitted(true);
    setTimeout(() => setIsFormSubmitted(false), 5000);
  };

  return (
    <div className="font-sans bg-gray-100 text-gray-800">
      {/* Header */}
      <HeroBanner />
      <Navbar />



      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#4222CF] mb-6">Why Choose Our Platform?</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="p-6 bg-white shadow-lg rounded-lg">
              <h3 className="text-2xl font-semibold mb-4">Create Your Own Store</h3>
              <p>Launch your store quickly, customize it, and start selling products without hassle.</p>
            </div>
            <div className="p-6 bg-white shadow-lg rounded-lg">
              <h3 className="text-2xl font-semibold mb-4">Manage Your Products</h3>
              <p>Keep track of inventory, add new products, and easily modify product details.</p>
            </div>
            <div className="p-6 bg-white shadow-lg rounded-lg">
              <h3 className="text-2xl font-semibold mb-4">Refunding & Returns</h3>
              <p>Handle customer refunds and returns efficiently to keep your customers happy.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Buying and Selling Section */}
      <section id="buy-sell" className="py-20 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#4222CF] mb-6">Buy & Sell with Ease</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="p-6 bg-white shadow-lg rounded-lg">
              <h3 className="text-2xl font-semibold mb-4">Buy Products</h3>
              <p>Explore a wide range of products at competitive prices. Buy safely and securely.</p>
            </div>
            <div className="p-6 bg-white shadow-lg rounded-lg">
              <h3 className="text-2xl font-semibold mb-4">Sell Products</h3>
              <p>Start selling today! Reach a wider audience and grow your business with us.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Support Section */}
      <section id="support" className="py-20 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#4222CF] mb-6">Best Customer Support</h2>
          <p className="mb-6 text-xl">We offer 24/7 customer support to assist you with any queries related to buying, selling, or managing your store.</p>
          <a href="#contact" className="bg-[#4222CF] text-white px-6 py-3 rounded-lg text-lg hover:bg-[#3720A4]">Get Support</a>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#4222CF] mb-6">Contact Us</h2>
          {isFormSubmitted && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
              <p>Thank you for reaching out! We'll get back to you shortly.</p>
            </div>
          )}
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-6 shadow-2xl p-4 border rounded" style={{boxShadow:'1px 1px 20px 1px lightgray'}}>
            <div className="flex justify-between flex-wrap">
              <div className="w-full md:w-[48%]">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4222CF]"
                />
              </div>
              <div className="w-full md:w-[48%]">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4222CF]"
                />
              </div>
            </div>
            <div>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4222CF]"
              />
            </div>
            <div>
              <textarea
                name="message"
                rows="5"
                placeholder="Your Message"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4222CF]"
              ></textarea>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-[#4222CF] text-white px-6 py-3 rounded-lg hover:bg-[#3720A4]"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-[#4222CF] text-white py-10">
        <div className="container mx-auto text-center">
          <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
          <p className="mb-4">Email: <a href="mailto:support@eshop.com" className="underline">support@eshop.com</a></p>
          <p>Phone: +123 456 7890</p>
        </div>
      </footer>

      <FooterPrime />
      <AllAbouJumiaFooter />
    </div>
  );
}
