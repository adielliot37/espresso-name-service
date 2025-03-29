import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { name, address } = req.body;
  if (!name || !address) return res.status(400).json({ error: 'Name and address required' });

  try {
    const client = await clientPromise;
    const db = client.db('ens-dapp');
    const collection = db.collection('registrations');

    const exists = await collection.findOne({ address: address.toLowerCase() });
    if (exists) return res.status(409).json({ error: 'Address already registered' });

    await collection.insertOne({
      name: name.toLowerCase(),
      address: address.toLowerCase(),
      timestamp: new Date(),
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('MongoDB register error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
