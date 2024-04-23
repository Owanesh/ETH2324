

import { NextApiRequest, NextApiResponse } from 'next';
import { execSync, spawn } from 'child_process';
import puppeteer from 'puppeteer';
export async function POST(req: Request) {
    try {

        const body = await req.json();


        const browser = await puppeteer.launch();
        const page = await browser.newPage();



        //add a timeout to the request

        try {
            await page.goto("http://localhost:3000/YWRtaW4K/32721884973979946471658112221257", { waitUntil: 'networkidle0' });
            await page.setCookie({
                name: 'admin',
                value: 'you-are-my-',
                domain: 'localhost',
                path: '/',
                expires: Math.floor(Date.now() / 1000) + 3600,
                httpOnly: false,
                secure: false
            });
            await page.waitForSelector('button[type="submit"]'); // Attendi il caricamento del form
            await page.type('#ftitle', body.title); // Compila il campo del titolo
            await page.type('#fcontent', body.content); // Compila il campo del contenuto
            await page.type('#ftags', body.tags); // Compila il campo dei tag
            await Promise.all([
                page.click('button[type="submit"]') // Fai clic sul pulsante di invio del form
            ]);
            await page.waitForNavigation({ waitUntil: 'networkidle0' });
            await browser.close();
        } catch (error) {
            console.error('Errore durante l\'esecuzione del codice:', error);
        }


        return Response.json({ title: body.title, content: body.content, tags: body.tags }, { status: 200 });
    } catch (error) {
        console.error('An error occurred:', error.message);
        return Response.json({ error: error.message }, { status: 400 });
    }
}
