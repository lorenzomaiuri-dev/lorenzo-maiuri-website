// Contact API removed — contact is now handled via mailto/Cal.com in the ContactModal.
// This route is kept as a stub to avoid 404s if referenced.
import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({ message: "Use the contact modal on the site." }, { status: 410 });
}
