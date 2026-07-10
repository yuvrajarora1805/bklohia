import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const [rows] = await pool.query(
      'SELECT id, name, email, password_hash, role FROM Users WHERE email = ?',
      [email]
    );

    const users = rows as any[];
    if (users.length === 0) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // In a real app, you'd set an HTTP-only cookie with a JWT here.
    // For now, we'll return the user info to store in state/localStorage for demo purposes.
    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
