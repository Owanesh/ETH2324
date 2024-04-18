- [vC0rp CTF Challenge](#vc0rp-ctf-challenge)
  - [Challenge Overview](#challenge-overview)
  - [Services](#services)
    - [The Green Crusaders](#the-green-crusaders)
    - [SecretButchler](#secretbutchler)
  - [Repository Purpose](#repository-purpose)
  - [Technology Stack](#technology-stack)
  - [Challenge Requirements](#challenge-requirements)
  - [Disclaimer](#disclaimer)

## vC0rp CTF Challenge

vC0rp (an idea of `0xE` group) sets the stage for this challenge. The goal is to gain shell access by following three paths, each varying in difficulty from easy to medium and hard. Afterwards, you'll need to perform privilege escalation by following three additional paths.

### Challenge Overview

The challenge is structured into multiple stages, each presenting its own set of obstacles and puzzles to solve. Below is an overview of the challenge content:

| Stage               | Description                                                                                                    |
|---------------------|----------------------------------------------------------------------------------------------------------------|
| Initial Access      | Gain shell access through one of the three paths: easy, medium, or hard.                                       |
| Privilege Escalation| Perform privilege escalation to gain elevated permissions through one of the three paths.                       |
| Web Exploitation   | Utilize web exploitation techniques to overcome obstacles and vulnerabilities in the web application.           |
| Binary Exploitation| Apply binary exploitation techniques to exploit vulnerabilities in executable files and gain further access.   |
| OSINT               | Utilize OSINT (Open Source Intelligence) techniques to gather information and uncover hidden clues.             |

### Services

The challenge involves two main services, one exposed to the public and one hidden.

#### The Green Crusaders

The Green Crusaders, exposed to the public, represents a blog aimed at converting people to veganism. It serves as a platform to promote vegan lifestyle choices and raise awareness about animal rights issues.

#### SecretButchler

SecretButchler, on the other hand, represents a hidden service within the server where meat and other animal-derived products are sold. This service is not publicly accessible and operates discreetly within the server environment.

### Repository Purpose

This repository serves as a support for the project presented during the examination and will not be maintained thereafter. It provides the necessary codebase and resources for participants to engage with the challenge.

### Technology Stack

The code has been fully custom developed using Next.js 14 for the web part. This modern framework provides a robust foundation for building dynamic and interactive web applications.

### Challenge Requirements

To successfully solve the challenge, participants are expected to possess a basic understanding of OSINT, Binary Exploitation, and Web Exploitation techniques. Each stage of the challenge presents unique challenges that require a combination of technical skills and problem-solving abilities.

### Disclaimer

Intentional vulnerabilities have been included in the codebase for the purpose of the challenge. Participants are encouraged to explore and identify these vulnerabilities as part of the learning experience.