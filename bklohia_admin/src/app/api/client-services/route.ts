import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { user_id, service_id, period } = await request.json();

    // Check if the service is already assigned to this client for this specific period
    const [existing] = await pool.query(
      'SELECT id FROM ClientServices WHERE user_id = ? AND service_id = ? AND period <=> ?',
      [user_id, service_id, period || null]
    );

    if ((existing as any[]).length > 0) {
      return NextResponse.json({ error: 'This service is already assigned to this client for this period.' }, { status: 400 });
    }

    const [result] = await pool.query(
      'INSERT INTO ClientServices (user_id, service_id, status, period) VALUES (?, ?, ?, ?)',
      [user_id, service_id, 'PENDING', period || null]
    );

    return NextResponse.json({ success: true, id: (result as any).insertId });
  } catch (error: any) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: 'Failed to assign service' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    await pool.query('DELETE FROM ClientServices WHERE id = ?', [id]);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: 'Failed to remove service' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, status, admin_comments } = await request.json();
    
    if (!id || !status) {
      return NextResponse.json({ error: 'ID and status are required' }, { status: 400 });
    }
    
    await pool.query(
      'UPDATE ClientServices SET status = ?, admin_comments = ? WHERE id = ?',
      [status, admin_comments || null, id]
    );
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: 'Failed to update service' }, { status: 500 });
  }
}
