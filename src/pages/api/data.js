import { promises as fs } from 'fs';

export default async function handler(req, res) {
  const {
    query: { page=1, pageSize=10 },
  } = req;
  const numberPage = Number(page);
  const numberPageSize = Number(pageSize);

  const startIndex = (numberPage - 1) * numberPageSize;
  const endIndex = startIndex + numberPageSize;

  const file = await fs.readFile(process.cwd() + '/data.json', 'utf8');
  const data = JSON.parse(file);
  const paginatedData = data.slice(startIndex, endIndex);

  res.status(200).json({total: data?.length, result:paginatedData});
}
