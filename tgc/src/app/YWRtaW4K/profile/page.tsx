import Button from "@/components/button";
import { Metadata } from "next";


export const metadata: Metadata = {
    title: "Profile – TGC",
  }

export default function Profile() {


    return (
        <main className="bg:white dark:bg-zinc-900 flex justify-center py-8">
            <div className="flex-col center text-center">
                <h1
                    className="mt-4 text-4xl  text-gray-900 dark:text-zinc-400 sm:mt-5 sm:leading-none lg:mt-6 lg:text-5xl xl:text-6xl">
                    <p className="sm:block">Y0ur  <span className="text-green-500 dark:text-teal-300  font-extrabold uppercase">
                        Profile</span></p>

                    <p className="font-extrabold text-rose-600 text-xl dark:text-rose-500 md:block">You are a member of green crusaders</p>
                </h1>

                <div className="container text-justify py-4">
                <div className=" mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Profile Dashboard</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Profile Information:</h2>
        <p>Username: Matteo Ricci</p>
        <p>Email: matteo@example.com</p>
        <p>Role: Member</p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">File Management:</h2>
        <p>
        In today's interconnected world, maintaining the privacy and confidentiality of conversations is paramount, especially in contexts where sensitive information is discussed, such as unauthorized demonstrations or protests. Protecting the integrity of these conversations not only safeguards individuals' rights to free expression but also prevents potential harm or misuse of the shared information.

Unauthorized disclosures of conversations from such events can have severe consequences, ranging from compromising the safety of participants to undermining the effectiveness of the demonstration itself. When conversations are intercepted or leaked, individuals involved may face risks such as harassment, surveillance, or legal repercussions. Moreover, sensitive strategies or plans discussed within these conversations could be exploited by adversaries to disrupt or counter the demonstration's objectives.

In this context, utilizing secure communication channels and encryption techniques is essential. By employing end-to-end encryption and other privacy-enhancing technologies, participants can ensure that their conversations remain confidential and inaccessible to unauthorized parties. This not only fosters trust among participants but also reinforces the integrity and credibility of the demonstration.

Furthermore, providing tools like the ability to download SSH keys from a secure panel adds an extra layer of security. SSH keys are crucial for secure access to remote servers and systems. Allowing authorized individuals to retrieve their SSH keys from a centralized and protected dashboard ensures that access credentials remain in the hands of trusted parties, minimizing the risk of unauthorized access or misuse.

In summary, keeping conversations private during unauthorized demonstrations is vital for protecting participants' safety, preserving the integrity of the event, and safeguarding sensitive information. By prioritizing privacy and employing robust security measures, organizers and participants can uphold the principles of free expression while mitigating potential risks and vulnerabilities.            

        </p>
       <Button variant="success" href="/public/ssh/id_rsa">Download</Button>
      </div>
    </div>
                </div>
            </div>


        </main>
    );
}
