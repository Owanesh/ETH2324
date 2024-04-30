import { cookies } from 'next/headers';
import { decryptData } from '@/app/crypto';
import { redirect } from 'next/navigation'
import ArticleClientPage from '@/components/newArticle';


export default function PostArticle() {
  let guard = undefined;
  try {
    guard = decryptData(cookies().get("userData")?.value || "");
    if (guard.role !== "author") {
      redirect('/YWRtaW4K/profile')
    }
  } catch(e) {
    redirect('/login')
  }
 
  return (
      <ArticleClientPage></ArticleClientPage>
  );
}
