"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [stats, setStats] = useState({
    totalClients: 0,
    activeServices: 0,
    pendingDocuments: 0,
    recentRemarks: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/dashboard");
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="text-slate-500 text-sm font-medium">Total Clients</h3>
          <p className="text-3xl font-bold mt-2 text-slate-900">
            {loading ? "..." : stats.totalClients}
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="text-slate-500 text-sm font-medium">Available Services</h3>
          <p className="text-3xl font-bold mt-2 text-slate-900">
            {loading ? "..." : stats.activeServices}
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="text-slate-500 text-sm font-medium">Pending Documents</h3>
          <p className="text-3xl font-bold mt-2 text-slate-900">
            {loading ? "..." : stats.pendingDocuments}
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="text-slate-500 text-sm font-medium">Recent Remarks</h3>
          <p className="text-3xl font-bold mt-2 text-slate-900">
            {loading ? "..." : stats.recentRemarks}
          </p>
        </div>
      </div>
    </div>
  );
}
