import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import fs from 'fs';
import path from 'path';
import { notFound } from "next/navigation";

// Read the extracted services data
const getServiceData = () => {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'services.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    return {};
  }
};

export async function generateStaticParams() {
  const services = getServiceData();
  return Object.keys(services).map((id) => ({
    id: id,
  }));
}

export default async function ServicePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  const services = getServiceData();
  
  const content = services[id];

  if (!content) {
    // If the slug doesn't exist in our JSON, try to format it as a fallback
    // Or we could return notFound() here.
    return (
      <div className="py-20 min-h-screen bg-white text-center">
        <h1 className="text-3xl font-bold mt-20">Service Not Found</h1>
        <Link href="/services" className="text-blue-600 mt-4 inline-block">Return to Services</Link>
      </div>
    );
  }

  return (
    <div className="py-20 min-h-screen bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        
        <Link href="/services" className="inline-flex items-center text-blue-600 font-bold hover:text-blue-800 transition mb-12">
          <ArrowLeft className="w-5 h-5 mr-2" /> Back to all services
        </Link>
        
        <div className="bg-gray-50 p-10 md:p-16 rounded-3xl border border-gray-100 shadow-2xl shadow-gray-200/50">
          <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-800 rounded-full text-sm font-bold mb-6 tracking-wide uppercase">
            {content.category}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">{content.title}</h1>
          <div className="w-24 h-1.5 bg-blue-600 rounded-full mb-10"></div>
          
          <p className="text-xl text-gray-700 leading-relaxed mb-12 font-medium">
            {content.desc}
          </p>

          <div className="bg-white p-10 rounded-2xl border border-gray-100 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Need help with {content.title}?</h3>
            <p className="text-gray-600 mb-8 text-lg">
              Our professional Chartered Accountants in Kotkapura are ready to assist you. Get in touch for a free, no-obligation consultation.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="inline-block px-8 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-600/30">
                Contact Us Today
              </Link>
              <a href="tel:+919815127006" className="inline-block px-8 py-4 bg-gray-100 text-gray-800 rounded-xl font-bold hover:bg-gray-200 transition">
                Call +91 98151 27006
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
