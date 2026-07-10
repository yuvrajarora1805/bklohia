"use client";

import { motion } from "framer-motion";
import { CheckCircle, Award, Users, TrendingUp } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="py-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            About B.K. Lohia & Associates
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="w-24 h-1 bg-blue-600 mx-auto rounded-full"
          ></motion.div>
        </div>

        {/* Story Section */}
        <div className="flex flex-col md:flex-row items-center gap-16 mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:w-1/2"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Corporate Meeting" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-blue-900/10"></div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:w-1/2"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">A Legacy of Excellence in Kotkapura</h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Practicing under the esteemed leadership of B.K. Lohia, our firm is built on a foundation of integrity, professionalism, and unparalleled expertise in taxation and corporate compliance.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              We provide tailored solutions for individuals, small businesses, and large corporations. Whether you need strategic tax planning, statutory auditing, or complete GST management, our team is equipped to handle your most complex financial challenges.
            </p>
            
            <ul className="space-y-4">
              {["Client-Centric Approach", "Decades of Industry Experience", "Ethical & Transparent Practices"].map((item, idx) => (
                <li key={idx} className="flex items-center text-gray-700 font-medium text-lg">
                  <CheckCircle className="text-blue-600 mr-4 w-6 h-6 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-8 mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-10 rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100"
          >
            <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mb-6">
              <Award className="w-8 h-8 text-amber-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
            <p className="text-gray-600 leading-relaxed">
              To be the most trusted and respected professional firm recognized by our clients for delivering excellence. We aim to be the standard of quality in the financial consulting industry, fostering long-term relationships built on integrity and precision.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-10 rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100"
          >
            <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mb-6">
              <TrendingUp className="w-8 h-8 text-amber-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              To provide businesses, entrepreneurs, and individuals with the highest quality accounting, auditing, tax planning, and business advisory services delivered in a timely, efficient, and innovative manner by a professional team that clearly enjoys working together.
            </p>
          </motion.div>
        </div>

        {/* Why Choose Us */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">The B.K. Lohia Advantage</h2>
            <div className="w-16 h-1 bg-amber-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "5.0-Star Rated Firm",
                desc: "We are highly rated across Kotkapura for our relentless dedication to client satisfaction and accuracy.",
                icon: <Award className="w-6 h-6 text-white" />
              },
              {
                title: "Expertise You Can Trust",
                desc: "Decades of combined experience navigating complex tax structures, GST laws, and corporate regulations.",
                icon: <Users className="w-6 h-6 text-white" />
              },
              {
                title: "Tailored Financial Solutions",
                desc: "We don't believe in one-size-fits-all. Every client receives a custom strategy tailored to their specific goals.",
                icon: <CheckCircle className="w-6 h-6 text-white" />
              }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-blue-900 text-white p-8 rounded-2xl text-center group hover:bg-blue-800 transition-colors border-t-4 border-amber-500"
              >
                <div className="w-16 h-16 bg-blue-800 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-blue-950/50">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-blue-100 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
