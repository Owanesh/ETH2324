

import { Metadata } from "next";
import Link from "next/link";
import { cookies } from 'next/headers'
export const metadata: Metadata = {
  title: "TGC",
}

export default function Home() {
    const cookieStore = cookies()
    const theme = cookieStore.get('theme')
    const adminEncoded = Buffer.from('admin').toString('base64');
const adminHashed = crypto.createHash('sha256').update(adminEncoded).digest('hex');
  return (
    <>


</>
  );
}
