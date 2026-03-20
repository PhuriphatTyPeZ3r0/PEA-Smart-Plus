import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import sql from 'mssql';

export async function GET() {
  try {
    const pool = await getDb();
    
    // Fetch a random active question where current date is within StartAt and EndAt
    const result = await pool.request()
      .query(`
        SELECT TOP 1 
          [QuestionId], 
          [QuestionTH], 
          [QuestionEN]
        FROM [dbo].[TB_QUESTION]
        WHERE [Status] = 1 
          AND [StartAt] <= GETDATE() 
          AND ([EndAt] >= GETDATE() OR [EndAt] IS NULL)
        ORDER BY NEWID()
      `);

    if (result.recordset.length === 0) {
      return NextResponse.json({ error: 'No active questions found' }, { status: 404 });
    }

    return NextResponse.json(result.recordset[0]);
  } catch (error: any) {
    console.error('API Question Random Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
  }
}
