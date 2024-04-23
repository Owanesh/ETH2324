import BlogStatsCard from '@/components/admin/blogStatsCard';
import RecentPostsCard from '@/components/admin/recentPostsCard';
import ActiveUsersCard from '@/components/admin/activeUsersCard';
import BlogTrafficGraph from '@/components/admin/blogTrafficGraph';
import { cookies } from 'next/headers';
import { decryptData } from '@/app/crypto';
import { redirect } from 'next/navigation'
const Dashboard = () => {
  let guard = undefined;
  try{
  guard = decryptData(cookies().get("userData")?.value || "");
  if (guard.role !== "author" && guard.role !== "admin") {
    redirect('/YWRtaW4K/profile')
  }else{
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-semibold mb-6">Blog Dashboard</h1>
      <div className="flex  gap-6">
      <div className="w-1/4">
        <div className="w-full ">
          <ActiveUsersCard />
        </div>
        </div>
      <div className="w-3/4">

        <div className="w-full  flex flex-wrap gap-6">
          <div className="w-full">
            <BlogStatsCard />
          </div>
          <div className="w-full">
            <RecentPostsCard />
          </div>
          <div className="w-full">
            <BlogTrafficGraph />
          </div>
        </div>
      </div>
      </div>
    </div>
  )}

  }catch(e){
    redirect('/login')
    }
}

 

export default Dashboard;
