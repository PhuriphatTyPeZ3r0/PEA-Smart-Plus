import { NextResponse } from 'next/server';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ endpoint: string }> }
) {
  try {
    const resolvedParams = await params;
    const endpoint = resolvedParams.endpoint;
    const body = await request.json();
    
    console.log(`[PROXY] Forwarding to: ${endpoint}`, body);

    const peaUrl = `https://smartplus3-api-dev.pea.co.th/API/EvaluateSatisfaction/${endpoint}`;
    
    const res = await fetch(peaUrl, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const status = res.status;
      const text = await res.text();
      console.error(`[PROXY] PEA Server Error (${endpoint}):`, status, text);
      return NextResponse.json({ result: 0, error: `PEA Server Error: ${status}` }, { status: 500 });
    }

    const data = await res.json();
    console.log(`[PROXY] PEA Server Success (${endpoint}):`, data);
    
    return NextResponse.json(data);
  } catch (error: any) {
    console.error(`[PROXY] Internal Error:`, error.message);
    return NextResponse.json({ result: 0, error: error.message }, { status: 500 });
  }
}
