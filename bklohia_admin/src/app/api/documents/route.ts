import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const [rows] = await pool.query(`
      SELECT ds.id, ds.title, ds.status, ds.created_at as date,
             u.name as client
      FROM DocumentSessions ds
      JOIN Users u ON ds.user_id = u.id
      ORDER BY ds.created_at DESC
    `);
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: 'Failed to fetch document sessions' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { title, description, user_id } = await request.json();
    
    const [result] = await pool.query(
      'INSERT INTO DocumentSessions (title, description, user_id, status) VALUES (?, ?, ?, ?)',
      [title, description, user_id, 'PENDING']
    );
    
    return NextResponse.json({ success: true, id: (result as any).insertId });
  } catch (error: any) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: 'Failed to create document session' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, status, remarks } = await request.json();
    
    if (!id || !status) {
      return NextResponse.json({ error: 'ID and status are required' }, { status: 400 });
    }
    
    await pool.query(
      'UPDATE DocumentSessions SET status = ?, remarks = ? WHERE id = ?',
      [status, remarks || null, id]
    );
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: 'Failed to update document session' }, { status: 500 });
  }
}
