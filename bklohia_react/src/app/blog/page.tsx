"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, User, ArrowRight } from "lucide-react";

export default function BlogPage() {
  const blogs = [
    {
      title: "GST Reform 2025 Explained: What GST 2.0 Means for Consumers and Businesses?",
      category: "GST, Latest News",
      author: "B.K. Lohia",
      date: "September 15, 2025",
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      excerpt: "Introduction When GST was introduced in 2017, it promised to be a 'one nation, one tax' solution to the citizens..."
    },
    {
      title: "Income Tax Bill 2025: A Fresh Take on India's Tax System",
      category: "Income Tax",
      author: "B.K. Lohia",
      date: "September 5, 2025",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      excerpt: "The Income Tax Bill, 2025 was introduced in the Lok Sabha on February 13, 2025, with the purpose of replacing the old rigid tax structures..."
    },
    {
      title: "Tax Saving Tips for Freelancers in India: A CA's Expert Advice",
      category: "Income Tax",
      author: "B.K. Lohia",
      date: "June 30, 2025",
      image: "https://images.unsplash.com/photo-1586486855514-8c633cc15394?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      excerpt: "Freelancers in India know taxes are not as simple as they sound. Income comes from different sources, payments can be staggered, and tracking expenses is key..."
    }
  ];

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
            Latest News & Insights
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="w-24 h-1 bg-blue-600 mx-auto rounded-full mb-6"
          ></motion.div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest changes in taxation, GST reforms, and corporate financial compliance in India.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 overflow-hidden border border-gray-100 flex flex-col hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="h-56 relative overflow-hidden group">
                <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                  {blog.category}
                </div>
              </div>
              
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-900 mb-4 line-clamp-2 hover:text-blue-600 transition cursor-pointer">
                  {blog.title}
                </h3>
                
                <div className="flex items-center text-sm text-gray-500 mb-6 space-x-4">
                  <span className="flex items-center"><User className="w-4 h-4 mr-1" /> {blog.author}</span>
                  <span className="flex items-center"><Calendar className="w-4 h-4 mr-1" /> {blog.date}</span>
                </div>
                
                <p className="text-gray-600 mb-8 line-clamp-3 flex-grow">
                  {blog.excerpt}
                </p>
                
                <Link href="#" className="inline-flex items-center text-blue-600 font-bold hover:text-blue-800 transition mt-auto group">
                  Read Article <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
