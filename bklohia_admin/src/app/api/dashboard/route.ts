import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const [[clientsResult], [servicesResult], [documentsResult]] = await Promise.all([
      pool.query(`SELECT COUNT(*) as count FROM Users WHERE role = 'CUSTOMER'`),
      pool.query(`SELECT COUNT(*) as count FROM Services`),
      pool.query(`SELECT COUNT(*) as count FROM DocumentSessions WHERE status = 'UPLOADED' OR status = 'PENDING'`)
    ]);

    const clients = (clientsResult as any)[0].count;
    const services = (servicesResult as any)[0].count;
    const documents = (documentsResult as any)[0].count;

    return NextResponse.json({
      totalClients: clients,
      activeServices: services,
      pendingDocuments: documents,
      recentRemarks: 0 // Placeholder until remarks system is built
    });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: 'Failed to fetch dashboard stats' }, { status: 500 });
  }
}
