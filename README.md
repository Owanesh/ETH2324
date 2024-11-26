# vCorp CTF Environment 🎯

Welcome to the repository for the **vCorp CTF Environment**, part of the master's course in **Cybersecurity**. This project sets up a vulnerable virtual machine (VM) for hands-on training in penetration testing. The environment is designed to challenge participants with realistic vulnerabilities, helping them sharpen their ethical hacking skills.

- [vCorp CTF Environment 🎯](#vcorp-ctf-environment-)
  - [📚 Course Overview](#-course-overview)
    - [Phase 1: Build and Send a Vulnerable VM](#phase-1-build-and-send-a-vulnerable-vm)
    - [Phase 2: Receive and Test a VM](#phase-2-receive-and-test-a-vm)
  - [🔧 Environment Setup](#-environment-setup)
    - [Prerequisites](#prerequisites)
    - [Setting Up the vCorp VM](#setting-up-the-vcorp-vm)
  - [🎮 How to Play](#-how-to-play)
  - [⚠️ Important Notes](#️-important-notes)
  - [📝 Additional Resources](#-additional-resources)
  - [🛠 Troubleshooting](#-troubleshooting)

---

## 📚 Course Overview

This project is part of a two-phase practical assignment in the course:

### Phase 1: Build and Send a Vulnerable VM
We have design and set up a VM with exploitable vulnerabilities. The goal is to challenge another team by requiring them to identify and exploit the vulnerabilities. 

In this phase:
- A **vulnerable VM** is prepared using Ansible.
- The VM contains a public vegan blog managed by vCorp, hiding its true identity as a meat-products marketplace.
- Students must ensure the vulnerabilities are realistic and document their setup.

### Phase 2: Receive and Test a VM
Each team receives a VM from another group and conducts a full **penetration test**. The deliverable is a detailed report outlining the vulnerabilities discovered, the exploitation techniques used, and recommendations for remediation.

For the **vCorp VM**, you can find the **writeup and setup documentation** in:
- `docs/REPORT.md`  

For penetration test report for **Phase 2**, see:
- `phase_2/REPORT.md`  

---

## 🔧 Environment Setup

### Prerequisites
Before proceeding, ensure the following are available:
1. **VirtualBox**: The VM must be installed and accessible.
2. A root user with sudo privileges (see `ansible/inventory.yaml` for the user and password).
3. **Host Machine Requirements**:
   - **Ansible** (to automate the setup process)
   - **Python 3.x** and `pip`

### Setting Up the vCorp VM
1. Clone this repository:

2. Edit the `ansible/inventory.yaml` file with the VM’s details

3. Run the Ansible playbook to configure the VM:
   ```bash
   ansible-playbook -i inventory.ini build_machine.yml
   ```

4. Once the playbook completes, the sites will be accessible on the VM:
   - **Vegan Blog**: [http://localhost](http://localhost)
   - **Hidden Marketplace**: Accessible only after exploiting the vulnerabilities.

---

## 🎮 How to Play

1. **Explore** the public vegan blog for clues and vulnerabilities.
2. **Exploit** identified weaknesses to gain access to hidden content and escalate privileges.
3. **Discover** the hidden meat-products marketplace and its secrets.

The challenge is to leverage ethical hacking techniques to reveal the true nature of **vCorp**.

---

## ⚠️ Important Notes

- This environment is **for educational purposes only**. Do not use these techniques in unauthorized environments.
- Ensure any vulnerabilities created are realistic and safe to exploit without causing unintended harm.

---

## 📝 Additional Resources

- The **setup and vulnerability documentation** for this VM is available in:  
  `docs/REPORT.md`

- A sample **penetration test report** for Phase 2 is provided in:  
  `phase_2/REPORT.md`

---

## 🛠 Troubleshooting

- **SSH Connection Issues**: Double-check the IP address and credentials in `ansible/inventory.yaml`.
- **Ports Unavailable**: Verify that port 80 and 21 is accessible on the VM.

---


Happy hacking and good luck! 🚀