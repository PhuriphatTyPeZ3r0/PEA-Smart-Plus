import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Proxy to PEA Dev API
    const res = await fetch("https://smartplus3-api-dev.pea.co.th/API/EvaluateSatisfaction/GetQuestionByUserCA", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    console.log("PEA API Response (Proxy):", data);
    
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('PEA Proxy Error:', error);
    return NextResponse.json({ result: 0, error: error.message }, { status: 500 });
  }
}
