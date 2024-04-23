import { Metadata } from "next";
import MemberPage from '@/components/admin/memberProfilePage';


export const metadata: Metadata = {
    title: "Profile – TGC",
}

export default function Profile() {


    return (
<MemberPage></MemberPage>
    );
}
