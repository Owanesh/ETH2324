
import { Metadata } from "next";
import MemberPage from '@/components/admin/memberProfilePage';
import { cookies } from "next/headers";
import { decryptData } from "@/app/crypto";
import AuthorProfile from "@/components/admin/authorProfilePage";
import { redirect } from 'next/navigation'
import AdminProfilePage from "@/components/admin/adminProfilePage";


export const metadata: Metadata = {
    title: "Profile – TGC",
}


export default function Profile() {

    let datas = undefined;
    try {
        const userDataCookie = cookies().get("userData")?.value || "";
        datas = decryptData(userDataCookie);
    } catch (error) {
        redirect('/login')
    }

    return (
        <main className="bg-stone-100 dark:text-stone-100 dark:bg-stone-900 ">
            {datas?.role === "member" && (
                <MemberPage></MemberPage>
            )}
            {datas?.role === "author" && (
                <AuthorProfile data={datas}></AuthorProfile>
            )}
                 {datas?.role === "admin" && (
                <AdminProfilePage data={datas}></AdminProfilePage>
            )}
        </main>);
}
