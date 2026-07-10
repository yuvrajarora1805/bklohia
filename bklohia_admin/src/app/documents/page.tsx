"use client";

import { useState, useEffect } from "react";
import { FileUp, Eye, CheckCircle, XCircle, X } from "lucide-react";

type Session = {
  id: number;
  title: string;
  client: string;
  status: string;
  date: string;
};

export default function DocumentsPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [selectedDocId, setSelectedDocId] = useState<number | null>(null);
  const [rejectRemarks, setRejectRemarks] = useState("");
  
  // For the dropdown in the modal
  const [clients, setClients] = useState<{id: number, name: string}[]>([]);
  const [newSession, setNewSession] = useState({ title: "", description: "", user_id: "" });

  const fetchSessions = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/documents");
      const data = await res.json();
      if (Array.isArray(data)) {
        setSessions(data);
      }
    } catch (error) {
      console.error("Failed to fetch sessions", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchClients = async () => {
    try {
      const res = await fetch("/api/clients");
      const data = await res.json();
      if (Array.isArray(data)) {
        setClients(data);
      }
    } catch (error) {
      console.error("Failed to fetch clients", error);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const openModal = () => {
    fetchClients();
    setIsModalOpen(true);
  };

  const handleAddSession = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/documents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSession),
      });
      if (res.ok) {
        setIsModalOpen(false);
        setNewSession({ title: "", description: "", user_id: "" });
        fetchSessions();
      } else {
        const errorData = await res.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Failed to create session", error);
    }
  };

  const updateStatus = async (id: number, status: string, remarks?: string) => {
    try {
      const res = await fetch("/api/documents", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status, remarks }),
      });
      if (res.ok) {
        if (status === 'REJECTED') {
          setRejectModalOpen(false);
          setRejectRemarks("");
        }
        fetchSessions();
      } else {
        const errorData = await res.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  const openRejectModal = (id: number) => {
    setSelectedDocId(id);
    setRejectModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Document Sessions</h1>
          <p className="text-slate-500 mt-1">Request documents from clients and review uploads.</p>
        </div>
        <button 
          onClick={openModal}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors shadow-sm"
        >
          <FileUp size={18} />
          <span>Request Documents</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
            <tr>
              <th className="px-6 py-4">Session Title</th>
              <th className="px-6 py-4">Client</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Requested On</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {loading ? (
              <tr><td colSpan={5} className="px-6 py-8 text-center text-slate-400">Loading document sessions...</td></tr>
            ) : sessions.length === 0 ? (
              <tr><td colSpan={5} className="px-6 py-8 text-center text-slate-400">No document sessions found. Click "Request Documents" to create one.</td></tr>
            ) : (
              sessions.map((session) => (
                <tr key={session.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">{session.title}</td>
                  <td className="px-6 py-4">{session.client}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      session.status === 'UPLOADED' ? 'bg-blue-100 text-blue-800' : 
                      session.status === 'APPROVED' ? 'bg-green-100 text-green-800' : 
                      session.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                      'bg-slate-100 text-slate-800'
                    }`}>
                      {session.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-400">{new Date(session.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="p-1.5 text-slate-400 hover:text-blue-600 transition-colors" title="Review">
                        <Eye size={18} />
                      </button>
                      {(session.status === 'UPLOADED' || session.status === 'PENDING') && (
                        <>
                          <button onClick={() => updateStatus(session.id, 'APPROVED')} className="p-1.5 text-slate-400 hover:text-green-600 transition-colors" title="Approve">
                            <CheckCircle size={18} />
                          </button>
                          <button onClick={() => openRejectModal(session.id)} className="p-1.5 text-slate-400 hover:text-red-600 transition-colors" title="Reject">
                            <XCircle size={18} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add Session Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-900">Request Documents</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddSession} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Select Client</label>
                <select 
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  value={newSession.user_id}
                  onChange={(e) => setNewSession({...newSession, user_id: e.target.value})}
                >
                  <option value="" disabled>-- Select a Client --</option>
                  {clients.map(client => (
                    <option key={client.id} value={client.id}>{client.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Request Title</label>
                <input 
                  type="text" 
                  placeholder="e.g. FY23-24 Bank Statements"
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newSession.title}
                  onChange={(e) => setNewSession({...newSession, title: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Detailed Description (Optional)</label>
                <textarea 
                  rows={3}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newSession.description}
                  onChange={(e) => setNewSession({...newSession, description: e.target.value})}
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
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Send Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {rejectModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h2 className="text-xl font-bold text-red-600">Reject Document</h2>
              <button onClick={() => setRejectModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Reason for Rejection</label>
                <textarea 
                  rows={3}
                  placeholder="e.g. You submitted the wrong assessment year."
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={rejectRemarks}
                  onChange={(e) => setRejectRemarks(e.target.value)}
                ></textarea>
              </div>
              <div className="pt-4 flex justify-end space-x-3">
                <button 
                  type="button" 
                  onClick={() => setRejectModalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => selectedDocId && updateStatus(selectedDocId, 'REJECTED', rejectRemarks)}
                  disabled={!rejectRemarks.trim()}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white rounded-lg transition-colors"
                >
                  Confirm Rejection
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
