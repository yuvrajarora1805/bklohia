"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FileUp, CheckCircle, Clock, AlertTriangle } from "lucide-react";

export default function ClientDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [data, setData] = useState({ services: [], documents: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      router.push("/login");
      return;
    }
    
    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);

    const fetchData = async () => {
      try {
        const res = await fetch("/api/client-data", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: parsedUser.id })
        });
        if (res.ok) {
          const d = await res.json();
          setData(d);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  if (!user || loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading dashboard...</div>;
  }

  const rejectedDocs = data.documents.filter((doc: any) => doc.status === 'REJECTED');

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <header className="bg-white border-b px-8 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-slate-900">B.K. Lohia & Co.</h1>
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-slate-600">Welcome, {user.name}</span>
          <button 
            onClick={() => { localStorage.removeItem("user"); router.push("/login"); }}
            className="text-sm text-red-600 hover:text-red-700"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-8 space-y-8">
        {/* Alerts Section */}
        {rejectedDocs.length > 0 && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg shadow-sm">
            <div className="flex items-start">
              <AlertTriangle className="text-red-500 mr-3 mt-0.5" size={20} />
              <div>
                <h3 className="text-red-800 font-bold text-sm uppercase tracking-wide mb-1">Attention Required</h3>
                <div className="space-y-3">
                  {rejectedDocs.map((doc: any, idx: number) => (
                    <div key={idx} className="text-sm text-red-700">
                      <strong>{doc.title}</strong> was rejected.
                      <p className="mt-1 ml-2 border-l-2 border-red-300 pl-2 italic">"{doc.remarks || 'No specific reason provided. Please upload the correct document.'}"</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Your Active Services</h2>
          {data.services.length === 0 ? (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 text-slate-500 text-center">
              You do not have any active services. Please contact the administrator.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
                {data.services.map((svc: any) => (
                  <div key={svc.id} className="p-6 border border-slate-200 rounded-xl hover:shadow-md transition-shadow bg-white flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div className="mb-4 md:mb-0">
                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-bold text-slate-800">{svc.title}</h3>
                        {svc.period && (
                          <span className="text-xs font-medium text-blue-800 bg-blue-100 px-2 py-0.5 rounded">
                            {svc.period}
                          </span>
                        )}
                      </div>
                      <p className="text-slate-500 text-sm mt-1">{svc.description}</p>
                      {svc.admin_comments && (
                        <div className="mt-3 bg-slate-50 border-l-2 border-slate-300 pl-3 py-2 text-sm text-slate-600 italic">
                          <strong>CA Remark:</strong> {svc.admin_comments}
                        </div>
                      )}
                    </div>
                    <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                      svc.status === 'COMPLETED' ? 'bg-green-100 text-green-700' :
                      svc.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>
                      {svc.status.replace('_', ' ')}
                    </span>
                  </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Document Requests</h2>
          {data.documents.length === 0 ? (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 text-slate-500 text-center">
              No pending document requests.
            </div>
          ) : (
            <div className="space-y-4">
              {data.documents.map((doc: any, idx: number) => (
                <div key={idx} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-slate-900">{doc.title}</h3>
                    <p className="text-sm text-slate-500">{doc.description}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`flex items-center text-sm font-medium ${
                      doc.status === 'UPLOADED' || doc.status === 'APPROVED' ? 'text-green-600' : 
                      doc.status === 'REJECTED' ? 'text-red-600' : 'text-amber-600'
                    }`}>
                      {doc.status === 'UPLOADED' || doc.status === 'APPROVED' ? (
                        <><CheckCircle size={16} className="mr-1" /> {doc.status}</>
                      ) : doc.status === 'REJECTED' ? (
                        <><AlertTriangle size={16} className="mr-1" /> REJECTED</>
                      ) : (
                        <><Clock size={16} className="mr-1" /> Pending</>
                      )}
                    </span>
                    {(doc.status === 'PENDING' || doc.status === 'REJECTED') && (
                      <button className={`px-4 py-2 rounded-lg text-sm transition-colors flex items-center text-white ${
                        doc.status === 'REJECTED' ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'
                      }`}>
                        <FileUp size={16} className="mr-2" /> {doc.status === 'REJECTED' ? 'Upload Again' : 'Upload'}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
