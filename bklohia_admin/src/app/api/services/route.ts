import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const [rows] = await pool.query(`
      SELECT s.id, s.title, s.description, s.price,
             COUNT(cs.id) as active_count
      FROM Services s
      LEFT JOIN ClientServices cs ON s.id = cs.service_id AND cs.status != 'COMPLETED'
      GROUP BY s.id
      ORDER BY s.created_at DESC
    `);
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { title, description, price } = await request.json();
    
    const [result] = await pool.query(
      'INSERT INTO Services (title, description, price) VALUES (?, ?, ?)',
      [title, description, price]
    );
    
    return NextResponse.json({ success: true, id: (result as any).insertId });
  } catch (error: any) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500 });
  }
}
