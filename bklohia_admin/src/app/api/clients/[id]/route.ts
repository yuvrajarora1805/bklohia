import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const clientId = resolvedParams.id;

    const [userRows] = await pool.query(
      'SELECT id, name, email, status, created_at FROM Users WHERE id = ?',
      [clientId]
    );

    const users = userRows as any[];
    if (users.length === 0) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 });
    }

    const [servicesRows] = await pool.query(`
      SELECT cs.id, cs.status, cs.period, cs.admin_comments, cs.created_at, s.title, s.description, s.id as service_id
      FROM ClientServices cs
      JOIN Services s ON cs.service_id = s.id
      WHERE cs.user_id = ?
      ORDER BY cs.created_at DESC
    `, [clientId]);

    const [docsRows] = await pool.query(`
      SELECT id, title, status, created_at
      FROM DocumentSessions
      WHERE user_id = ?
      ORDER BY created_at DESC
    `, [clientId]);

    return NextResponse.json({
      client: users[0],
      services: servicesRows,
      documents: docsRows
    });

  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: 'Failed to fetch client details' }, { status: 500 });
  }
}
