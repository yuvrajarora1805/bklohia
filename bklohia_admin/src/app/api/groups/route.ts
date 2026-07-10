import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const [rows] = await pool.query(`
      SELECT cg.id, cg.name, cg.description, cg.created_at, 
             (SELECT COUNT(*) FROM Users WHERE group_id = cg.id) as client_count
      FROM ClientGroups cg
      ORDER BY cg.created_at DESC
    `);
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: 'Failed to fetch groups' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name, description } = await request.json();
    
    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }
    
    const [result] = await pool.query(
      'INSERT INTO ClientGroups (name, description) VALUES (?, ?)',
      [name, description || null]
    );
    
    return NextResponse.json({ 
      success: true, 
      id: (result as any).insertId 
    }, { status: 201 });
  } catch (error: any) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: 'Failed to create group' }, { status: 500 });
  }
}
