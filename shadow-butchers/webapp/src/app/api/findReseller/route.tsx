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
            // If the filter contains a "#" symbol, it should be properly encoded in the URL as "%23"
            // So, you can decode it to retrieve the original value
            filter = decodeURIComponent(filter);
        }

        const filePath = join(process.cwd(), 'src', 'app', 'api', 'findReseller', 'resellers.json');
        const command = `grep -i "${filter}" | cat ${filePath} `;
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
                return Response.json({res:lines},{status:400});
            }
        } else {
            console.log('Multiple resellers found:', lines.length);
            filteredResellers = lines.map(line => {
                try {
                    return JSON.parse(line.trim());
                } catch (parseError) {
                    console.error('Error parsing JSON:', parseError);
                    console.error('Problematic line:', line); // Log the problematic line
                    return Response.json({res:lines},{status:400});
                }
            }).filter(reseller => reseller !== null); // Filtering out null values
        }
        return Response.json({ filteredResellers });
    } catch (error) {
        console.error('Error executing grep command:', error);
        return Response.json({ error: 'Internal server error' });
    }
}
