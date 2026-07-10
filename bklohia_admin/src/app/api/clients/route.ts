import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import bcrypt from 'bcryptjs';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const [rows] = await pool.query(`
      SELECT u.id, u.name, u.email, u.status, u.group_id, cg.name as group_name, u.created_at as date,
             (SELECT COUNT(*) FROM ClientServices WHERE user_id = u.id) as services_count,
             (SELECT COUNT(*) FROM DocumentSessions WHERE user_id = u.id AND status = 'PENDING') as pending_docs
      FROM Users u
      LEFT JOIN ClientGroups cg ON u.group_id = cg.id
      ORDER BY u.created_at DESC
    `);
    return NextResponse.json(rows);
  } catch (error: any) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: 'Failed to fetch clients', details: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, group_id } = await request.json();
    
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }
    
    await pool.query(
      'UPDATE Users SET group_id = ? WHERE id = ?',
      [group_id || null, id]
    );
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: 'Failed to update client' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name, email, group_id } = await request.json();
    
    // Generate random password
    const tempPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(tempPassword, 10);
    
    const [result] = await pool.query(
      'INSERT INTO Users (name, email, password_hash, role, status, group_id) VALUES (?, ?, ?, ?, ?, ?)',
      [name, email, hashedPassword, 'CUSTOMER', 'ACTIVE', group_id || null]
    );
    
    return NextResponse.json({ 
      success: true, 
      id: (result as any).insertId
    });
  } catch (error: any) {
    console.error("Database Error:", error);
    if (error.code === 'ER_DUP_ENTRY') {
      return NextResponse.json({ error: 'Email already exists' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create client', details: error.message }, { status: 500 });
  }
}
