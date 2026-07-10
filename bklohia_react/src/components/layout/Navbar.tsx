"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Menu, X, Phone, Mail, MapPin, ChevronDown } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    
    // Check if user is logged in
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/";
  };

  const menuVariants: Variants = {
    hidden: { opacity: 0, y: 15, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2, ease: "easeOut" } },
    exit: { opacity: 0, y: 10, scale: 0.98, transition: { duration: 0.15, ease: "easeIn" } }
  };

  return (
    <header className="fixed w-full top-0 z-50">
      {/* Top Bar */}
      <div className={`bg-blue-900 text-white text-sm transition-all duration-300 ${isScrolled ? 'h-0 overflow-hidden py-0' : 'py-2'}`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex space-x-6">
            <a href="mailto:Bklohiaca@gmail.com" className="flex items-center space-x-2 hover:text-blue-200 transition">
              <Mail size={16} />
              <span>Bklohiaca@gmail.com</span>
            </a>
            <div className="hidden md:flex items-center space-x-2">
              <MapPin size={16} />
              <span>Krishna Street No. 1, Kotkapura, Punjab</span>
            </div>
          </div>
          <div className="flex space-x-4">
            <a href="https://wa.me/919815127006" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 font-semibold">
              <Phone size={16} />
              <span>+91 98151 27006</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <motion.nav 
        className={`bg-white transition-shadow duration-300 ${isScrolled ? 'shadow-lg py-2 border-b border-gray-100' : 'py-4'}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 flex justify-between items-center relative">
          <Link href="/">
            <img src="/logo.png" alt="B.K. Lohia & Associates" className="h-16 md:h-20 w-auto object-contain" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden xl:flex space-x-8 items-center font-bold text-gray-800 text-[15px]">
            
            {/* Start Business Mega Menu */}
            <div className="relative group cursor-pointer h-full"
                 onMouseEnter={() => setActiveMegaMenu("start-business")}
                 onMouseLeave={() => setActiveMegaMenu(null)}>
              <div className="flex items-center hover:text-blue-600 transition py-6">
                Start Business <ChevronDown size={16} className="ml-1" />
              </div>
              <AnimatePresence>
                {activeMegaMenu === "start-business" && (
                  <motion.div 
                    variants={menuVariants}
                    initial="hidden" animate="visible" exit="exit"
                    className="absolute top-[72px] left-1/2 -translate-x-1/2 w-[700px] bg-white shadow-2xl rounded-2xl border border-gray-100 flex p-8 gap-12 cursor-default"
                  >
                    <div className="flex-1">
                      <h4 className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-6 border-b pb-2">Business Registration</h4>
                      <ul className="space-y-4">
                        <li><Link href="/services/company-registration" className="text-gray-700 hover:text-blue-600 transition font-medium text-sm">Company Registration</Link></li>
                        <li><Link href="/services/private-limited-company-registration" className="text-gray-700 hover:text-blue-600 transition font-medium text-sm">Private Limited Company</Link></li>
                        <li><Link href="/services/public-limited-company-registration" className="text-gray-700 hover:text-blue-600 transition font-medium text-sm">Public Limited Company</Link></li>
                        <li><Link href="/services/limited-liability-partnership-registration" className="text-gray-700 hover:text-blue-600 transition font-medium text-sm">LLP Registration</Link></li>
                        <li><Link href="/services/one-person-company-registration" className="text-gray-700 hover:text-blue-600 transition font-medium text-sm">One Person Company</Link></li>
                        <li><Link href="/services/partnership-registration" className="text-gray-700 hover:text-blue-600 transition font-medium text-sm">Partnership Registration</Link></li>
                        <li><Link href="/services/sole-proprietorship-registration" className="text-gray-700 hover:text-blue-600 transition font-medium text-sm">Sole Proprietorship</Link></li>
                      </ul>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-6 border-b pb-2">Licenses</h4>
                      <ul className="space-y-4">
                        <li><Link href="/services/gst-registration" className="text-gray-700 hover:text-blue-600 transition font-medium text-sm">GST Registration</Link></li>
                        <li><Link href="/services/fssai-registration" className="text-gray-700 hover:text-blue-600 transition font-medium text-sm">FSSAI Registration</Link></li>
                        <li><Link href="/services/import-export-code" className="text-gray-700 hover:text-blue-600 transition font-medium text-sm">Import Export Code</Link></li>
                        <li><Link href="/services/iso-certification" className="text-gray-700 hover:text-blue-600 transition font-medium text-sm">ISO Certification</Link></li>
                        <li><Link href="/services/msme-udyam-registration" className="text-gray-700 hover:text-blue-600 transition font-medium text-sm">MSME Udyam Registration</Link></li>
                        <li><Link href="/services/shop-act-registration" className="text-gray-700 hover:text-blue-600 transition font-medium text-sm">Shop Act Registration</Link></li>
                        <li><Link href="/services/startup-registration" className="text-gray-700 hover:text-blue-600 transition font-medium text-sm">Startup Registration</Link></li>
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* NGO Dropdown */}
            <div className="relative group cursor-pointer h-full"
                 onMouseEnter={() => setActiveMegaMenu("ngo")}
                 onMouseLeave={() => setActiveMegaMenu(null)}>
              <div className="flex items-center hover:text-blue-600 transition py-6">
                NGO <ChevronDown size={16} className="ml-1" />
              </div>
              <AnimatePresence>
                {activeMegaMenu === "ngo" && (
                  <motion.div 
                    variants={menuVariants}
                    initial="hidden" animate="visible" exit="exit"
                    className="absolute top-[72px] left-0 w-[280px] bg-white shadow-2xl rounded-2xl border border-gray-100 flex flex-col p-6 space-y-4 cursor-default"
                  >
                    <Link href="/services/ngo-registration" className="text-gray-700 hover:text-blue-600 transition font-medium text-sm">NGO Registration</Link>
                    <Link href="/services/section-8-npo-registration" className="text-gray-700 hover:text-blue-600 transition font-medium text-sm">Section 8 NPO Registration</Link>
                    <Link href="/services/trust-registration" className="text-gray-700 hover:text-blue-600 transition font-medium text-sm">Trust Registration</Link>
                    <Link href="/services/society-registration" className="text-gray-700 hover:text-blue-600 transition font-medium text-sm">Society Registration</Link>
                    <Link href="/services/ngo-darpan-registration" className="text-gray-700 hover:text-blue-600 transition font-medium text-sm">NGO Darpan Registration</Link>
                    <Link href="/services/fcra-registration" className="text-gray-700 hover:text-blue-600 transition font-medium text-sm">FCRA Registration</Link>
                    <Link href="/services/80g-12a-registration" className="text-gray-700 hover:text-blue-600 transition font-medium text-sm">80G 12A Registration</Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Trademark Dropdown */}
            <div className="relative group cursor-pointer h-full"
                 onMouseEnter={() => setActiveMegaMenu("trademark")}
                 onMouseLeave={() => setActiveMegaMenu(null)}>
              <div className="flex items-center hover:text-blue-600 transition py-6">
                Trademark <ChevronDown size={16} className="ml-1" />
              </div>
              <AnimatePresence>
                {activeMegaMenu === "trademark" && (
                  <motion.div 
                    variants={menuVariants}
                    initial="hidden" animate="visible" exit="exit"
                    className="absolute top-[72px] left-0 w-[280px] bg-white shadow-2xl rounded-2xl border border-gray-100 flex flex-col p-6 space-y-4 cursor-default"
                  >
                    <Link href="/services/trademark-registration" className="text-gray-700 hover:text-blue-600 transition font-medium text-sm">Trademark Registration</Link>
                    <Link href="/services/copyright-registration" className="text-gray-700 hover:text-blue-600 transition font-medium text-sm">Copyright Registration</Link>
                    <Link href="/services/design-registration" className="text-gray-700 hover:text-blue-600 transition font-medium text-sm">Design Registration</Link>
                    <Link href="/services/patent-registration" className="text-gray-700 hover:text-blue-600 transition font-medium text-sm">Patent Registration</Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Compliances Mega Menu */}
            <div className="relative group cursor-pointer h-full"
                 onMouseEnter={() => setActiveMegaMenu("compliances")}
                 onMouseLeave={() => setActiveMegaMenu(null)}>
              <div className="flex items-center hover:text-blue-600 transition py-6">
                Compliances <ChevronDown size={16} className="ml-1" />
              </div>
              <AnimatePresence>
                {activeMegaMenu === "compliances" && (
                  <motion.div 
                    variants={menuVariants}
                    initial="hidden" animate="visible" exit="exit"
                    className="absolute top-[72px] right-0 w-[800px] bg-white shadow-2xl rounded-2xl border border-gray-100 flex p-8 gap-8 cursor-default"
                  >
                    <div className="flex-1">
                      <h4 className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-6 border-b pb-2">Filing & Returns</h4>
                      <ul className="space-y-4">
                        <li><Link href="/services/itr-filing" className="text-gray-700 hover:text-blue-600 transition font-medium text-sm">Personal ITR Filing</Link></li>
                        <li><Link href="/services/itr-filing" className="text-gray-700 hover:text-blue-600 transition font-medium text-sm">Business ITR Filing</Link></li>
                        <li><Link href="/services/gst-return" className="text-gray-700 hover:text-blue-600 transition font-medium text-sm">GST Return</Link></li>
                        <li><Link href="/services/roc-filing" className="text-gray-700 hover:text-blue-600 transition font-medium text-sm">ROC Filing</Link></li>
                        <li><Link href="/services/tds-return" className="text-gray-700 hover:text-blue-600 transition font-medium text-sm">TDS Return</Link></li>
                        <li><Link href="/services/xbrl-filing" className="text-gray-700 hover:text-blue-600 transition font-medium text-sm">XBRL Filing</Link></li>
                      </ul>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-6 border-b pb-2">Audit Assurance</h4>
                      <ul className="space-y-4">
                        <li><Link href="/services/gst-audit" className="text-gray-700 hover:text-blue-600 transition font-medium text-sm">GST Audit</Link></li>
                        <li><Link href="/services/ngo-audit" className="text-gray-700 hover:text-blue-600 transition font-medium text-sm">NGO Audit</Link></li>
                        <li><Link href="/services/tax-audit" className="text-gray-700 hover:text-blue-600 transition font-medium text-sm">Tax Audit</Link></li>
                        <li><Link href="/services/stock-audit" className="text-gray-700 hover:text-blue-600 transition font-medium text-sm">Stock Audit</Link></li>
                        <li><Link href="/services/statutory-audit" className="text-gray-700 hover:text-blue-600 transition font-medium text-sm">Statutory Audit</Link></li>
                        <li><Link href="/services/bank-audit" className="text-gray-700 hover:text-blue-600 transition font-medium text-sm">Bank Audit</Link></li>
                      </ul>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-6 border-b pb-2">Advisory Consultancy</h4>
                      <ul className="space-y-4">
                        <li><Link href="/services/gst-advisory" className="text-gray-700 hover:text-blue-600 transition font-medium text-sm">GST Advisory</Link></li>
                        <li><Link href="/services/tax-planning" className="text-gray-700 hover:text-blue-600 transition font-medium text-sm">Tax Planning</Link></li>
                        <li><Link href="/services/legal-secretarial" className="text-gray-700 hover:text-blue-600 transition font-medium text-sm">Legal Secretarial</Link></li>
                        <li><Link href="/services/nri-taxation" className="text-gray-700 hover:text-blue-600 transition font-medium text-sm">NRI Taxation</Link></li>
                        <li><Link href="/services/project-financing" className="text-gray-700 hover:text-blue-600 transition font-medium text-sm">Project Financing</Link></li>
                        <li><Link href="/services/strike-off-section-8-company" className="text-gray-700 hover:text-blue-600 transition font-medium text-sm">Strike off Section 8</Link></li>
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/blog" className="hover:text-blue-600 transition py-6">Blog</Link>
            <Link href="/about" className="hover:text-blue-600 transition py-6">About Us</Link>
            <Link href="/contact" className="hover:text-blue-600 transition py-6">Contact</Link>
            
            {user ? (
              <div className="flex items-center space-x-3 ml-4">
                <Link href="/dashboard" className="px-5 py-2.5 border-2 border-blue-600 text-blue-600 rounded-full font-bold hover:bg-blue-50 transition">
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="px-4 py-2.5 text-slate-600 hover:text-red-600 font-medium transition">
                  Logout
                </button>
              </div>
            ) : (
              <Link href="/login" className="ml-4 px-5 py-2.5 border-2 border-blue-600 text-blue-600 rounded-full font-bold hover:bg-blue-50 transition">
                Client Login
              </Link>
            )}
            <a href="https://wa.me/919815127006" target="_blank" rel="noopener noreferrer" className="ml-3 px-6 py-3 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition shadow-lg hover:shadow-blue-600/30">
              Free Consultation
            </a>
          </div>

          {/* Mobile Toggle */}
          <button className="xl:hidden text-gray-700 p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden bg-white border-t overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-4 font-bold text-gray-800">
              <Link href="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
              <Link href="/services" onClick={() => setMobileMenuOpen(false)}>All Services</Link>
              <Link href="/blog" onClick={() => setMobileMenuOpen(false)}>Blog</Link>
              <Link href="/about" onClick={() => setMobileMenuOpen(false)}>About Us</Link>
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
