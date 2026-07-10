import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand & About */}
          <div>
            <Link href="/" className="inline-block">
              <img src="/logo.png" alt="B.K. Lohia & Associates" className="h-16 md:h-20 w-auto object-contain bg-white/10 p-2 rounded-xl mb-6" />
            </Link>
            <p className="text-gray-400 mb-6">
              B.K. Lohia & Associates is a premier Chartered Accountancy firm based in Kotkapura, delivering expert taxation, auditing, and corporate compliance services.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition text-white font-bold text-sm">
                FB
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition text-white font-bold text-sm">
                IN
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition text-white font-bold text-sm">
                IG
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link href="/" className="hover:text-blue-400 transition">Home</Link></li>
              <li><Link href="/about" className="hover:text-blue-400 transition">About Us</Link></li>
              <li><Link href="/services" className="hover:text-blue-400 transition">Our Services</Link></li>
              <li><Link href="/contact" className="hover:text-blue-400 transition">Contact Us</Link></li>
            </ul>
          </div>

          {/* Key Services */}
          <div>
            <h4 className="text-white text-lg font-bold mb-6">Key Services</h4>
            <ul className="space-y-3">
              <li><Link href="/services/itr" className="hover:text-blue-400 transition">Income Tax Returns</Link></li>
              <li><Link href="/services/gst" className="hover:text-blue-400 transition">GST Registration</Link></li>
              <li><Link href="/services/audit" className="hover:text-blue-400 transition">Statutory Auditing</Link></li>
              <li><Link href="/services/corporate" className="hover:text-blue-400 transition">Corporate Compliance</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white text-lg font-bold mb-6">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                <span>Krishna Street No. 1, Mall Godown Road, Kotkapura, Punjab.</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" />
                <a href="tel:+919815127006" className="hover:text-blue-400 transition">+91 98151 27006</a>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" />
                <a href="mailto:Bklohiaca@gmail.com" className="hover:text-blue-400 transition">Bklohiaca@gmail.com</a>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} B.K. Lohia & Associates. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
