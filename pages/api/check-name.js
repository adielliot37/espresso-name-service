import { connectToDatabase } from '../../utils/mongodb';
import ESPName from '../../models/ESPname';

export default async function handler(req, res) {
  await connectToDatabase();
  const { name } = req.body;
  const exists = await ESPName.findOne({ name: name.toLowerCase() });
  res.json({ exists: !!exists });
}
