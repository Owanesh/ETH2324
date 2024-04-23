import { cookies } from 'next/headers';
import { decryptData } from '@/app/crypto';
import { redirect } from 'next/navigation'
import ManifestationForm from '@/components/admin/manifestation/manifestationForm';

const Dashboard = () => {
    let guard = undefined;
    try {
      guard = decryptData(cookies().get("userData")?.value || "");
      if (guard.role !== "admin") {
        redirect('/YWRtaW4K/profile')
      }
    } catch(e) {
      redirect('/login')
    }

  return (
    <ManifestationForm />
  );
}

export default Dashboard;
