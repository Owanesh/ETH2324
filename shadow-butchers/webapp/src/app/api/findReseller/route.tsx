import { execSync } from 'child_process';
import { NextApiRequest, NextApiResponse } from 'next';
import { join } from 'path';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    let filter = searchParams.get('filter')
    try {
        if (!filter) {
            filter=" "
        }
        if (filter) {
             filter = decodeURIComponent(filter);
        }

        const filePath = join(process.cwd(), 'src', 'app', 'api', 'findReseller', 'resellers.json');
        const command = `cat ${filePath} | grep -i "${filter}"`;
        console.log('Executing command:', command);
        const stdout = execSync(command, { encoding: 'utf-8' });
        const lines = stdout.trim().split('\n');
        let filteredResellers = [];
        if (lines.length === 1) {
            console.log('Only one reseller found:', lines[0].trim());
            try {
                filteredResellers = [JSON.parse(lines[0].trim())];
            } catch (parseError) {
                console.error('Error parsing JSON:', parseError);
                return Response.json({filteredResellers:lines},{status:400});
            }
        } else {
            console.log('Multiple resellers found:', lines.length);
            filteredResellers = lines.map(line => {
                if (line.trim() === ',' || line.trim() === '[' || line.trim() === ']'){
                    return null;
                }
                try {
                    return JSON.parse(line.trim());
                } catch (parseError) {
                    console.error('Error parsing JSON:', parseError);
                    console.error('Problematic line:', line);  
                 }
            }).filter(reseller => reseller !== null); 
        }
        return Response.json({ filteredResellers:filteredResellers });
    } catch (error) {
        console.error('Error executing grep command:', error);
        return Response.json({ error: 'Internal server error' });
    }
}
