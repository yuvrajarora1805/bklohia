"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Briefcase, FileText, CheckCircle, Clock, X, Trash2 } from "lucide-react";

export default function ClientDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRequest, setNewRequest] = useState({ title: "", description: "" });
  
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [updateStatus, setUpdateStatus] = useState("PENDING");
  const [adminComments, setAdminComments] = useState("");

  const [isNextPeriodModalOpen, setIsNextPeriodModalOpen] = useState(false);
  const [nextPeriodValue, setNextPeriodValue] = useState("");

  useEffect(() => {
    if (params.id) {
      fetchDetails();
    }
  }, [params.id]);

  const fetchDetails = async () => {
    try {
      const res = await fetch(`/api/clients/${params.id}`);
      if (res.ok) {
        const json = await res.json();
        setData(json);
      } else {
        console.error("Failed to load client details");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/documents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newRequest, user_id: params.id }),
      });
      if (res.ok) {
        setIsModalOpen(false);
        setNewRequest({ title: "", description: "" });
        fetchDetails(); // Refresh list
        alert("Document requested successfully!");
      } else {
        const errorData = await res.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Failed to create request", error);
    }
  };

  const handleRemoveService = async (clientServiceId: number) => {
    if (!confirm("Are you sure you want to stop and remove this service for the client?")) return;
    
    try {
      const res = await fetch(`/api/client-services?id=${clientServiceId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchDetails(); // Refresh the list
      } else {
        const errorData = await res.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Failed to remove service", error);
    }
  };

  const handleUpdateService = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/client-services", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: selectedService.id, status: updateStatus, admin_comments: adminComments }),
      });
      if (res.ok) {
        setIsUpdateModalOpen(false);
        fetchDetails();
      } else {
        const errorData = await res.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Failed to update service", error);
    }
  };

  const openUpdateModal = (svc: any) => {
    setSelectedService(svc);
    setUpdateStatus(svc.status);
    setAdminComments(svc.admin_comments || "");
    setIsUpdateModalOpen(true);
  };

  const handleNextPeriod = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService || !nextPeriodValue) return;

    try {
      const res = await fetch("/api/client-services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          user_id: params.id, 
          service_id: selectedService.service_id, // we need service_id from join. Wait, we need to ensure service_id is fetched.
          period: nextPeriodValue 
        })
      });
      if (res.ok) {
        setIsNextPeriodModalOpen(false);
        setNextPeriodValue("");
        fetchDetails();
        alert("Next period generated successfully!");
      } else {
        const errorData = await res.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Failed to assign next period", error);
    }
  };

  const openNextPeriodModal = (svc: any) => {
    setSelectedService(svc);
    setIsNextPeriodModalOpen(true);
  };

  if (loading) {
    return <div className="p-8 text-slate-500">Loading client details...</div>;
  }

  if (!data || !data.client) {
    return (
      <div className="p-8">
        <button onClick={() => router.back()} className="flex items-center text-blue-600 hover:underline mb-6">
          <ArrowLeft size={16} className="mr-2" /> Back to Clients
        </button>
        <div className="bg-white p-8 rounded-xl shadow-sm border text-center text-slate-500">
          Client not found.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link href="/clients" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors">
        <ArrowLeft size={16} className="mr-1" /> Back to Clients
      </Link>

      {/* Header Info */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{data.client.name}</h1>
            <p className="text-slate-500 mt-1">{data.client.email} &bull; Registered on {new Date(data.client.created_at).toLocaleDateString()}</p>
          </div>
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
            {data.client.status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Opted Services */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <h2 className="text-lg font-bold text-slate-900 flex items-center">
              <Briefcase size={18} className="mr-2 text-blue-600" /> Opted Services
            </h2>
            <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-0.5 rounded-full">{data.services.length}</span>
          </div>
          <div className="p-6 flex-1">
            {data.services.length === 0 ? (
              <p className="text-slate-500 text-sm italic">No services assigned yet.</p>
            ) : (
              <ul className="space-y-4">
                {data.services.map((svc: any) => (
                  <li key={svc.id} className="pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-slate-800">{svc.title}</h3>
                          {svc.period && (
                            <span className="text-xs font-medium text-blue-800 bg-blue-100 px-2 py-0.5 rounded">
                              {svc.period}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-400 mt-1">Assigned: {new Date(svc.created_at).toLocaleDateString()}</p>
                        {svc.admin_comments && (
                          <p className="text-sm text-slate-600 mt-2 bg-slate-50 p-2 rounded border border-slate-100 italic">
                            💬 {svc.admin_comments}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`text-xs font-medium px-2 py-1 rounded-md ${
                          svc.status === 'COMPLETED' ? 'bg-green-100 text-green-700' :
                          svc.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-700' :
                          'bg-amber-100 text-amber-700'
                        }`}>
                          {svc.status.replace('_', ' ')}
                        </span>
                        {svc.status === 'COMPLETED' && (
                          <button 
                            onClick={() => openNextPeriodModal(svc)}
                            className="text-xs bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 text-indigo-700 px-3 py-1.5 rounded-lg transition-colors font-medium ml-2"
                            title="Start next period"
                          >
                            + Next Period
                          </button>
                        )}
                        <button 
                          onClick={() => openUpdateModal(svc)}
                          className="text-xs bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 px-3 py-1.5 rounded-lg transition-colors font-medium ml-2"
                        >
                          Update
                        </button>
                        <button 
                          onClick={() => handleRemoveService(svc.id)}
                          className="text-slate-400 hover:text-red-600 transition-colors ml-2"
                          title="Stop/Remove Service"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Document Requests */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center">
              <FileText size={18} className="mr-2 text-indigo-600" />
              <h2 className="text-lg font-bold text-slate-900">Document Requests</h2>
              <span className="ml-3 bg-indigo-100 text-indigo-800 text-xs font-bold px-2.5 py-0.5 rounded-full">{data.documents.length}</span>
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="text-xs bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-lg transition-colors font-medium"
            >
              Request Doc
            </button>
          </div>
          <div className="p-6 flex-1">
            {data.documents.length === 0 ? (
              <p className="text-slate-500 text-sm italic">No document requests found.</p>
            ) : (
              <ul className="space-y-4">
                {data.documents.map((doc: any) => (
                  <li key={doc.id} className="pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-slate-800">{doc.title}</h3>
                        <p className="text-xs text-slate-400 mt-1">Requested: {new Date(doc.created_at).toLocaleDateString()}</p>
                      </div>
                      <span className={`flex items-center text-xs font-medium ${
                        doc.status === 'UPLOADED' || doc.status === 'APPROVED' ? 'text-green-600' : 'text-amber-600'
                      }`}>
                        {doc.status === 'UPLOADED' || doc.status === 'APPROVED' ? (
                          <><CheckCircle size={14} className="mr-1" /> {doc.status}</>
                        ) : (
                          <><Clock size={14} className="mr-1" /> Pending</>
                        )}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Request Document Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-900">Request Document</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddRequest} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Request Title</label>
                <input 
                  type="text" 
                  placeholder="e.g. FY23-24 Bank Statements"
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={newRequest.title}
                  onChange={(e) => setNewRequest({...newRequest, title: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Detailed Description (Optional)</label>
                <textarea 
                  rows={3}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={newRequest.description}
                  onChange={(e) => setNewRequest({...newRequest, description: e.target.value})}
                ></textarea>
              </div>
              <div className="pt-4 flex justify-end space-x-3">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
                >
                  Send Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Update Service Modal */}
      {isUpdateModalOpen && selectedService && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-900">Update Service</h2>
              <button onClick={() => setIsUpdateModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleUpdateService} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Service Status</label>
                <select 
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  value={updateStatus}
                  onChange={(e) => setUpdateStatus(e.target.value)}
                >
                  <option value="PENDING">Pending</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="COMPLETED">Completed</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">CA Remarks / Comments (Visible to Client)</label>
                <textarea 
                  rows={3}
                  placeholder="e.g. Waiting for Form 16"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={adminComments}
                  onChange={(e) => setAdminComments(e.target.value)}
                ></textarea>
              </div>
              <div className="pt-4 flex justify-end space-x-3">
                <button 
                  type="button" 
                  onClick={() => setIsUpdateModalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Save Updates
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Next Period Modal */}
      {isNextPeriodModalOpen && selectedService && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-900">Generate Next Period</h2>
              <button onClick={() => setIsNextPeriodModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleNextPeriod} className="p-6 space-y-4">
              <p className="text-sm text-slate-600 mb-4">
                Starting the next interval for <strong>{selectedService.title}</strong>.
              </p>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">New Filing Period / Interval</label>
                <input 
                  type="text" 
                  placeholder="e.g. Q2 or September 2024"
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={nextPeriodValue}
                  onChange={(e) => setNextPeriodValue(e.target.value)}
                />
              </div>
              <div className="pt-4 flex justify-end space-x-3">
                <button 
                  type="button" 
                  onClick={() => setIsNextPeriodModalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
                >
                  Create Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
