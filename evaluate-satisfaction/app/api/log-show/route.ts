import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import sql from 'mssql';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('API log-show received body:', body);
    const { QuestionId, UserAccId } = body;

    if (!QuestionId || !UserAccId) {
      console.error('Missing fields:', { QuestionId, UserAccId });
      return NextResponse.json(
        { error: 'QuestionId and UserAccId are required' },
        { status: 400 }
      );
    }

    const pool = await getDb();
    console.log('Database pool acquired');
    
    const result = await pool.request()
      .input('QuestionId', sql.Int, QuestionId)
      .input('UserAccId', sql.Int, UserAccId)
      .query(`
        INSERT INTO [dbo].[TB_LOG_SHOW] ([QuestionId], [UserAccId], [EventAt])
        VALUES (@QuestionId, @UserAccId, GETDATE())
      `);

    console.log('Insert successful:', result.rowsAffected);
    return NextResponse.json({ success: true, message: 'Log inserted successfully' });
  } catch (error: any) {
    console.error('API Log-Show Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
  }
}
