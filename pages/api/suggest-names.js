export default function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  
    const { base } = req.body;
  
    if (!base || typeof base !== 'string') {
      return res.status(400).json({ error: 'Invalid base name' });
    }
  
    const clean = base.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
  
    // Simple deterministic suggestions
    const suggestions = [
      `${clean}123`,
      `real${clean}`,
      `its${clean}`,
      `${clean}dot`,
      `${clean}onchain`,
      `official${clean}`,
    ];
  
    return res.status(200).json({ suggestions });
  }
  