import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    // Fetch services for the user
    const [servicesRows] = await pool.query(`
      SELECT cs.id, cs.status, cs.period, cs.admin_comments, cs.created_at, s.title, s.description
      FROM ClientServices cs
      JOIN Services s ON cs.service_id = s.id
      WHERE cs.user_id = ?
    `, [userId]);

    // Fetch document requests
    const [docsRows] = await pool.query(`
      SELECT id, title, description, status, remarks, created_at
      FROM DocumentSessions
      WHERE user_id = ?
    `, [userId]);

    return NextResponse.json({
      services: servicesRows,
      documents: docsRows
    });

  } catch (error) {
    console.error("Client Data Error:", error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
