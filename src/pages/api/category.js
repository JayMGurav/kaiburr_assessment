import { promises as fs } from 'fs';

export default async function handler(req, res) {
    try {
        const file = await fs.readFile(process.cwd() + '/data.json', 'utf8');
        const data = JSON.parse(file);
        const categories = data?.reduce((acc, {Category}) => {
            if(!acc?.[Category]) acc[Category] = 0
            acc[Category]+=1
            return acc;
        }, {})
        res.status(200).json({categories:Object.keys(categories)});
        return;
    } catch (error) {
        res.status(500).json({message: error.message + "Error getting data"});
    }
}
