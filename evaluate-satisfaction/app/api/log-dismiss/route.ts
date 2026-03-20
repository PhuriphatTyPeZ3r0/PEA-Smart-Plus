import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import sql from 'mssql';

export async function POST(request: Request) {
  try {
    const { QuestionId, UserAccId } = await request.json();

    if (!QuestionId || !UserAccId) {
      return NextResponse.json(
        { error: 'QuestionId and UserAccId are required' },
        { status: 400 }
      );
    }

    const pool = await getDb();
    
    // Insert into [TB_LOG_DISMISS]
    // LogId is typically an identity column, and EventAt uses GETDATE()
    await pool.request()
      .input('QuestionId', sql.Int, QuestionId)
      .input('UserAccId', sql.Int, UserAccId)
      .query(`
        INSERT INTO [dbo].[TB_LOG_DISMISS] ([QuestionId], [UserAccId], [EventAt])
        VALUES (@QuestionId, @UserAccId, GETDATE())
      `);

    return NextResponse.json({ success: true, message: 'Dismiss log inserted successfully' });
  } catch (error: any) {
    console.error('API Log-Dismiss Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
  }
}
