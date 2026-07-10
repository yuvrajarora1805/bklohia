"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import servicesData from "@/data/services.json";

export default function ServicesIndex() {
  // Convert object to array and group by category
  const allServices = Object.values(servicesData);
  
  const categories = ["Start Business", "NGO", "Trademark", "Compliances"];
  
  return (
    <div className="py-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        
        <div className="text-center mb-16 pt-10">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Our Professional Services
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="w-24 h-1 bg-blue-600 mx-auto rounded-full mb-6"
          ></motion.div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive financial, taxation, and corporate compliance services tailored to your needs.
          </p>
        </div>

        {categories.map((category, catIndex) => {
          const categoryServices = allServices.filter((s: any) => s.category === category);
          
          if (categoryServices.length === 0) return null;

          return (
            <div key={category} className="mb-20">
              <div className="flex items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900">{category}</h2>
                <div className="h-px bg-gray-200 flex-grow ml-6"></div>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {categoryServices.map((service: any, idx) => (
                  <Link href={`/services/${service.slug}`} key={service.slug}>
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: (idx % 4) * 0.1 }}
                      className="bg-white p-6 rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-all duration-300 border border-gray-100 flex flex-col h-full group"
                    >
                      <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3 flex-grow">
                        {service.desc}
                      </p>
                      <div className="text-blue-600 font-semibold text-sm flex items-center mt-auto opacity-0 group-hover:opacity-100 transition-opacity">
                        View Details <ArrowRight className="ml-1 w-4 h-4" />
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
}
