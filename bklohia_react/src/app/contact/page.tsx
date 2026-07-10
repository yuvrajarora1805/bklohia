"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 to-indigo-900 text-white overflow-hidden py-24">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(30deg,#ffffff_12%,transparent_12.5%,transparent_87%,#ffffff_87.5%,#ffffff),linear-gradient(150deg,#ffffff_12%,transparent_12.5%,transparent_87%,#ffffff_87.5%,#ffffff),linear-gradient(30deg,#ffffff_12%,transparent_12.5%,transparent_87%,#ffffff_87.5%,#ffffff),linear-gradient(150deg,#ffffff_12%,transparent_12.5%,transparent_87%,#ffffff_87.5%,#ffffff),linear-gradient(60deg,#ffffff77_25%,transparent_25.5%,transparent_75%,#ffffff77_75%,#ffffff77),linear-gradient(60deg,#ffffff77_25%,transparent_25.5%,transparent_75%,#ffffff77_75%,#ffffff77)] bg-[length:40px_70px] bg-[0_0,0_0,20px_35px,20px_35px,0_0,20px_35px]"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Get In Touch
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto"
          >
            Schedule a consultation or inquire about our services. Our team is ready to assist you with expert financial advice.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <div className="flex-grow py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12 -mt-32 relative z-20">
            
            {/* Contact Info */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:w-1/3 space-y-8"
            >
              <div className="bg-white p-8 rounded-3xl shadow-2xl shadow-blue-900/10 border border-gray-100 h-full border-t-4 border-t-amber-500">
                <h3 className="text-2xl font-bold text-gray-900 mb-8 pb-4 border-b border-gray-100">Contact Details</h3>
                
                <ul className="space-y-8">
                  <li className="flex items-start group">
                    <div className="w-14 h-14 bg-amber-50 group-hover:bg-amber-100 rounded-2xl flex items-center justify-center mr-5 flex-shrink-0 text-amber-500 transition-colors duration-300 shadow-sm">
                      <MapPin size={26} />
                    </div>
                    <div className="mt-1">
                      <h4 className="font-bold text-gray-900 text-lg">Our Office</h4>
                      <p className="text-gray-600 mt-1 leading-relaxed">Krishna Street No. 1, Mall Godown Road, Kotkapura, Punjab.</p>
                    </div>
                  </li>
                  
                  <li className="flex items-start group">
                    <div className="w-14 h-14 bg-amber-50 group-hover:bg-amber-100 rounded-2xl flex items-center justify-center mr-5 flex-shrink-0 text-amber-500 transition-colors duration-300 shadow-sm">
                      <Phone size={26} />
                    </div>
                    <div className="mt-1">
                      <h4 className="font-bold text-gray-900 text-lg">Call Us</h4>
                      <p className="text-gray-600 mt-1"><a href="tel:+919815127006" className="hover:text-amber-600 transition font-medium">+91 98151 27006</a></p>
                    </div>
                  </li>
                  
                  <li className="flex items-start group">
                    <div className="w-14 h-14 bg-amber-50 group-hover:bg-amber-100 rounded-2xl flex items-center justify-center mr-5 flex-shrink-0 text-amber-500 transition-colors duration-300 shadow-sm">
                      <Mail size={26} />
                    </div>
                    <div className="mt-1">
                      <h4 className="font-bold text-gray-900 text-lg">Email Us</h4>
                      <p className="text-gray-600 mt-1"><a href="mailto:Bklohiaca@gmail.com" className="hover:text-amber-600 transition font-medium">Bklohiaca@gmail.com</a></p>
                      <p className="text-gray-600"><a href="mailto:Bklohiaca@yahoo.com" className="hover:text-amber-600 transition font-medium">Bklohiaca@yahoo.com</a></p>
                    </div>
                  </li>
                  
                  <li className="flex items-start group">
                    <div className="w-14 h-14 bg-amber-50 group-hover:bg-amber-100 rounded-2xl flex items-center justify-center mr-5 flex-shrink-0 text-amber-500 transition-colors duration-300 shadow-sm">
                      <Clock size={26} />
                    </div>
                    <div className="mt-1">
                      <h4 className="font-bold text-gray-900 text-lg">Business Hours</h4>
                      <p className="text-gray-600 mt-1 font-medium">Mon - Sat: 10:00 AM - 6:00 PM</p>
                      <p className="text-gray-500 text-sm">Sunday: Closed</p>
                    </div>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:w-2/3"
            >
              <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl shadow-blue-900/10 border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-50 rounded-full blur-3xl -z-10 opacity-60 translate-x-1/2 -translate-y-1/2"></div>
                <h3 className="text-3xl font-bold text-gray-900 mb-8 pb-4 border-b border-gray-100">Send Us a Message</h3>
                
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                      <input type="text" className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-amber-500/20 focus:border-amber-500 transition outline-none text-gray-800 placeholder-gray-400 font-medium" placeholder="John Doe" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                      <input type="email" className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-amber-500/20 focus:border-amber-500 transition outline-none text-gray-800 placeholder-gray-400 font-medium" placeholder="john@example.com" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                    <input type="text" className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-amber-500/20 focus:border-amber-500 transition outline-none text-gray-800 placeholder-gray-400 font-medium" placeholder="How can we help you?" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                    <textarea rows={6} className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-amber-500/20 focus:border-amber-500 transition outline-none resize-none text-gray-800 placeholder-gray-400 font-medium" placeholder="Your message here..."></textarea>
                  </div>
                  
                  <button type="button" className="px-10 py-5 bg-amber-500 text-gray-900 rounded-xl font-bold hover:bg-amber-600 transition w-full md:w-auto shadow-xl shadow-amber-500/30 flex items-center justify-center text-lg">
                    Send Message <Send className="ml-2 w-5 h-5" />
                  </button>
                </form>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
}
