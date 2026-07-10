import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { service_id, period, group_id } = await request.json();

    if (!service_id || !period) {
      return NextResponse.json({ error: 'Service and Period are required' }, { status: 400 });
    }

    let usersQuery = 'SELECT id FROM Users WHERE role = "CLIENT" AND status = "ACTIVE"';
    const queryParams: any[] = [];

    if (group_id) {
      usersQuery += ' AND group_id = ?';
      queryParams.push(group_id);
    }

    const [userRows] = await pool.query(usersQuery, queryParams);
    const users = userRows as any[];

    if (users.length === 0) {
      return NextResponse.json({ message: 'No active clients found for this segment.' }, { status: 404 });
    }

    let successCount = 0;
    
    for (const u of users) {
      // Check if already assigned for this period
      const [existing] = await pool.query(
        'SELECT id FROM ClientServices WHERE user_id = ? AND service_id = ? AND period <=> ?',
        [u.id, service_id, period]
      );

      if ((existing as any[]).length === 0) {
        await pool.query(
          'INSERT INTO ClientServices (user_id, service_id, status, period) VALUES (?, ?, ?, ?)',
          [u.id, service_id, 'PENDING', period]
        );
        successCount++;
      }
    }

    return NextResponse.json({ 
      success: true, 
      assigned_count: successCount, 
      total_in_segment: users.length 
    });

  } catch (error: any) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: 'Failed to assign services in bulk' }, { status: 500 });
  }
}
