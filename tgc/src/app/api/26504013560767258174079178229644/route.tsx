import { NextApiRequest, NextApiResponse } from 'next';
import { execSync, spawn } from 'child_process';
import puppeteer from 'puppeteer';
import { headers } from 'next/headers'
export async function POST(req: Request) {
    try {

        const body = await req.json();
        const host = headers().get('host')
        const browser = await puppeteer.launch();
        const page = await browser.newPage();



        //add a timeout to the request

        try {
            const currentUrl = host;
            const path = "/YWRtaW4K/32721884973979946471658112221257"; // Replace this with your path
            await page.goto(`http://${currentUrl}${path}`, { waitUntil: 'networkidle0' });
            await page.setCookie({
                name: 'userData',
                value: 'fc7fcd0dfff43f12ea176c886e9a6e98d2dc4645bc09f009bfcc78390947eb6c641dace3d9a2c6d9539b75ff2a9cb809f8a493e88a9a45b62ac52179a6b323c789c8fde69a7bea3c4ede6aeb71fa183f3ff0e5ef78d45f68c2b1dfcd2d0e7602f23c7990c61a5d1e6ac7da58383a1292d025411d159f89e28e64845f1c4bc64d5d9a0ee6dc44e267d0ae1e87d751506e8489c8ae420563bcf451fb52ebc99805',
                domain: 'localhost',
                path: '/',
                expires: Math.floor(Date.now() / 1000) + 3600,
                httpOnly: false,
                secure: false
            });
            await page.waitForSelector('button[type="submit"]'); 
            await page.type('#ftitle', body.title); 
            await page.type('#fcontent', body.content); 
            await page.type('#ftags', body.tags); 
            await Promise.all([
                page.click('button[type="submit"]') 
            ]);
            await page.waitForNavigation({ waitUntil: 'networkidle0' });
            await browser.close();
        } catch (error) {
            console.error('Errore durante l\'esecuzione del codice:', error);
        }


        return Response.json({ title: body.title, content: body.content, tags: body.tags }, { status: 200 });
    } catch (error: any) {
        console.error('An error occurred:', error.message);
        return Response.json({ error: error.message }, { status: 400 });
    }
}
