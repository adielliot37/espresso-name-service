import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error('Missing MONGODB_URI in .env.local');

const options = {};
let client = new MongoClient(uri, options);
let clientPromise = client.connect();

export default clientPromise;
