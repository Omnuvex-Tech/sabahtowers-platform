import { NextRequest, NextResponse } from "next/server";

const BITRIX_WEBHOOK_URL = process.env.BITRIX_WEBHOOK_URL;
const BITRIX_SOURCE_ID = process.env.BITRIX_SOURCE_ID;
const BITRIX_ASSIGNED_BY_ID = process.env.BITRIX_ASSIGNED_BY_ID;

export async function POST(req: NextRequest) {
  if (!BITRIX_WEBHOOK_URL) {
    return NextResponse.json(
      { success: false, message: "Server misconfigured" },
      { status: 500 }
    );
  }

  try {
    const body = await req.json();
    const { name, surname, phone, message } = body as {
      name?: string;
      surname?: string;
      phone?: string;
      message?: string;
    };

    if (!name || !phone) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const fullName = surname ? `${name} ${surname}` : name;

    const fields: Record<string, unknown> = {
      TITLE: `Sabah Towers Website - ${fullName}`,
      NAME: name,
      LAST_NAME: surname || "",
      SOURCE_ID: BITRIX_SOURCE_ID,
      ASSIGNED_BY_ID: BITRIX_ASSIGNED_BY_ID,
      PHONE: [{ VALUE: phone, VALUE_TYPE: "WORK" }],
      COMMENTS: message || "",
    };

    const bitrixRes = await fetch(`${BITRIX_WEBHOOK_URL}crm.lead.add.json`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fields,
        params: { REGISTER_SONET_EVENT: "Y" },
      }),
    });

    const data = await bitrixRes.json();

    if (!bitrixRes.ok || data.error) {
      return NextResponse.json(
        { success: false, message: data.error_description || "Bitrix error" },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true, leadId: data.result });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Unexpected error" },
      { status: 500 }
    );
  }
}