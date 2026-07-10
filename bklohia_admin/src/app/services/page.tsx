"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, X, Users } from "lucide-react";

type Service = {
  id: number;
  title: string;
  description: string;
  price: string;
  active_count: number;
};

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newService, setNewService] = useState({ title: "", description: "", price: "" });

  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [bulkData, setBulkData] = useState({ service_id: 0, service_title: "", period: "", group_id: "" });
  const [groups, setGroups] = useState<{id: number, name: string}[]>([]);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/services");
      const data = await res.json();
      if (Array.isArray(data)) {
        setServices(data);
      }
    } catch (error) {
      console.error("Failed to fetch services", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const res = await fetch("/api/groups");
      const data = await res.json();
      if (Array.isArray(data)) setGroups(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddService = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newService),
      });
      if (res.ok) {
        setIsModalOpen(false);
        setNewService({ title: "", description: "", price: "" });
        fetchServices();
      } else {
        const errorData = await res.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Failed to add service", error);
    }
  };

  const openBulkModal = (service: Service) => {
    setBulkData({ service_id: service.id, service_title: service.title, period: "", group_id: "" });
    setIsBulkModalOpen(true);
  };

  const handleBulkAssign = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/client-services/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          service_id: bulkData.service_id, 
          period: bulkData.period, 
          group_id: bulkData.group_id 
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setIsBulkModalOpen(false);
        fetchServices();
        const groupName = groups.find(g => g.id.toString() === bulkData.group_id)?.name || 'All Active Clients';
        alert(`Successfully assigned to ${data.assigned_count} clients in group "${groupName}"!`);
      } else {
        const errorData = await res.json();
        alert(`Error: ${errorData.message || errorData.error}`);
      }
    } catch (error) {
      console.error("Failed to bulk assign", error);
      alert("Failed to bulk assign");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Services</h1>
          <p className="text-slate-500 mt-1">Manage the CA services offered to your clients.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors shadow-sm"
        >
          <Plus size={18} />
          <span>New Service</span>
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-500">Loading services...</div>
      ) : services.length === 0 ? (
        <div className="text-center py-12 text-slate-500 bg-white rounded-xl border border-slate-200">
          No services found. Click "New Service" to create one.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow relative group">
              <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
                  <Edit2 size={16} />
                </button>
                <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
              
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                <span className="font-bold text-xl">{service.title.charAt(0)}</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-1">{service.title}</h3>
              <p className="text-slate-500 text-sm mb-4 line-clamp-2">
                {service.description || "Comprehensive assistance for compliance and filings handled by expert professionals."}
              </p>
              
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="text-sm">
                  <span className="text-slate-500">Starting at </span>
                  <span className="font-semibold text-slate-900">₹{service.price}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => openBulkModal(service)}
                    className="flex items-center space-x-1 text-xs font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-2 py-1.5 rounded-lg transition-colors border border-indigo-200"
                    title="Bulk Assign"
                  >
                    <Users size={14} /> <span>Bulk Assign</span>
                  </button>
                  <div className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1.5 rounded-full border border-blue-100">
                    {service.active_count} Active
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Service Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-900">Add New Service</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddService} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Service Title</label>
                <input 
                  type="text" 
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newService.title}
                  onChange={(e) => setNewService({...newService, title: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Price (₹)</label>
                <input 
                  type="number" 
                  step="0.01"
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newService.price}
                  onChange={(e) => setNewService({...newService, price: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                <textarea 
                  rows={3}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newService.description}
                  onChange={(e) => setNewService({...newService, description: e.target.value})}
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
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bulk Assign Modal */}
      {isBulkModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-900">Bulk Assign Service</h2>
              <button onClick={() => setIsBulkModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleBulkAssign} className="p-6 space-y-4">
              <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r-lg mb-4 text-sm text-indigo-800">
                You are about to bulk assign <strong>{bulkData.service_title}</strong> to multiple clients.
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Target Client Group</label>
                <select 
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  value={bulkData.group_id}
                  onChange={(e) => setBulkData({...bulkData, group_id: e.target.value})}
                >
                  <option value="">-- All Active Clients --</option>
                  {groups.map(g => (
                    <option key={g.id} value={g.id}>{g.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Filing Period / Interval</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Q2 or August 2024"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={bulkData.period}
                  onChange={(e) => setBulkData({...bulkData, period: e.target.value})}
                />
              </div>
              
              <div className="pt-4 flex justify-end space-x-3">
                <button 
                  type="button" 
                  onClick={() => setIsBulkModalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors flex items-center shadow-sm"
                >
                  <Users size={16} className="mr-2" />
                  Assign to Clients
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
