"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Calculator, Building, FileText, Landmark } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const services = [
    { title: "Income Tax Returns", icon: <Calculator className="w-6 h-6 text-blue-600" />, active: false },
    { title: "GST Registration & Returns", icon: <FileText className="w-6 h-6 text-white" />, active: true },
    { title: "Statutory Auditing", icon: <CheckCircle className="w-6 h-6 text-blue-600" />, active: false },
    { title: "Corporate Financial Services", icon: <Building className="w-6 h-6 text-blue-600" />, active: false },
    { title: "Company Registration", icon: <Landmark className="w-6 h-6 text-blue-600" />, active: false },
    { title: "NGO & Trust Registration", icon: <Landmark className="w-6 h-6 text-blue-600" />, active: false },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative text-white overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
            alt="Accounting background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-blue-950/85"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial="initial" animate="animate" variants={fadeIn}>
              <span className="inline-block py-1 px-3 rounded-full bg-blue-800/80 border border-blue-500/30 text-blue-100 text-sm font-semibold mb-6">
                Premium Chartered Accountancy in Kotkapura
              </span>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
                Navigating Your <span className="text-amber-400">Financial Future</span> with Precision.
              </h1>
              <p className="text-xl text-gray-200 mb-10 leading-relaxed">
                B.K. Lohia & Associates offers specialized services in Income Tax, GST, Statutory Auditing, and comprehensive Corporate Financial Solutions.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/contact" className="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-gray-900 rounded-full font-bold flex items-center transition shadow-lg shadow-amber-500/30">
                  Get Free Consultation <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link href="/services" className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full font-bold transition backdrop-blur-sm">
                  Explore Services
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Expertise</h2>
            <div className="w-20 h-1 bg-amber-500 mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We provide tailored financial and tax consultancy services designed to help your business grow while remaining fully compliant.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-all duration-300 border border-gray-100 flex flex-col justify-between h-48 cursor-pointer group"
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${service.active ? 'bg-amber-500 shadow-md shadow-amber-500/20' : 'bg-blue-50 group-hover:bg-blue-100'}`}>
                  <div className={service.active ? 'text-gray-900' : 'text-blue-700'}>
                    {service.icon}
                  </div>
                </div>
                <h3 className={`text-lg font-bold ${service.active ? 'text-amber-600' : 'text-gray-900 group-hover:text-blue-700 transition-colors'}`}>
                  {service.title}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative rounded-2xl overflow-hidden shadow-2xl"
            >
              <div className="absolute inset-0 bg-blue-900/20 mix-blend-multiply border-4 border-amber-500 rounded-2xl z-10 pointer-events-none"></div>
              <img 
                src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Accounting Professional" 
                className="w-full h-auto object-cover"
              />
            </motion.div>
          </div>
          
          <div className="md:w-1/2">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Partner With Us?</h2>
            <p className="text-lg text-gray-600 mb-8">
              Practicing under B.K. Lohia, our firm brings decades of specialized experience to the Kotkapura region and beyond. We prioritize integrity, precision, and client-centric solutions.
            </p>
            
            <ul className="space-y-4">
              {[
                "Highly Rated 5.0-Star Professional Service",
                "Deep Expertise in Taxation and Statutory Auditing",
                "Personalized Solutions for Individuals and Corporations",
                "Local to Kotkapura with Nationwide Compliance Capabilities"
              ].map((item, idx) => (
                <li key={idx} className="flex items-center text-gray-700 font-medium">
                  <CheckCircle className="text-amber-500 mr-3 w-6 h-6 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            
            <div className="mt-10">
              <Link href="/about" className="text-blue-700 font-bold hover:text-amber-600 flex items-center transition-colors">
                Learn more about our legacy <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 py-20 text-white text-center border-t-4 border-amber-500">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-6">Ready to streamline your finances?</h2>
          <p className="text-xl mb-10 text-blue-100 max-w-2xl mx-auto">
            Contact us today for specialized accounting, tax, and auditing services tailored to your needs.
          </p>
          <a href="tel:+919815127006" className="inline-block px-10 py-4 bg-amber-500 text-gray-900 font-bold rounded-full hover:bg-amber-400 transition shadow-xl shadow-amber-500/20">
            Call +91 98151 27006
          </a>
        </div>
      </section>
    </div>
  );
}
