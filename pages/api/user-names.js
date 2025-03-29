import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const { address } = req.query;
  if (!address) return res.status(400).json({ error: 'Address required' });

  try {
    const client = await clientPromise;
    const db = client.db('ens-dapp');
    const collection = db.collection('registrations');

    const user = await collection.findOne({ address: address.toLowerCase() });

    if (!user) return res.status(200).json([]); 

    return res.status(200).json([{ name: user.name }]); 
  } catch (error) {
    console.error('MongoDB error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
