import { useState, useEffect } from 'react';
import { useAccount, useWalletClient } from 'wagmi';
import { getContract } from '../utils/contract';
import { isValidESPName } from '../utils/validateName';
import axios from 'axios';
import { ethers } from 'ethers';

export default function RegisterForm() {
  const [name, setName] = useState('');
  const [isAvailable, setIsAvailable] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [hasRegistered, setHasRegistered] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  const { address, isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();

  
  useEffect(() => {
    setHydrated(true);
  }, []);

  // Live name check
  useEffect(() => {
    if (!name || !isValidESPName(name)) {
      setIsAvailable(null);
      return;
    }

    const delay = setTimeout(async () => {
      try {
        const res = await axios.post('/api/check-name', { name });
        setIsAvailable(!res.data.exists);

        if (res.data.exists) {
          const alt = await axios.post('/api/suggest-names', { base: name });
          setSuggestions(alt.data.suggestions || []);
        }
      } catch (err) {
        console.error('Name check failed:', err);
      }
    }, 500);

    return () => clearTimeout(delay);
  }, [name]);

 
  useEffect(() => {
    if (!address) return;
    axios
      .get(`/api/check-address?address=${address}`)
      .then((res) => setHasRegistered(res.data.registered))
      .catch((err) => console.error('Address check failed:', err));
  }, [address]);

  useEffect(() => {
    console.log("Wallet Debug ->", {
      isConnected,
      address,
      walletClient,
    });
  }, [isConnected, address, walletClient]);

  async function handleRegister() {
    if (!hydrated || !isConnected || !walletClient) {
      return alert('Please connect your wallet first');
    }

    
    const recheck = await axios.get(`/api/check-address?address=${address}`);
    if (recheck.data.registered) return alert('❌ You’ve already registered a .esp name.');

    if (!isValidESPName(name)) return alert('Only letters and numbers allowed');

    const check = await axios.post('/api/check-name', { name });
    if (check.data.exists) return alert('Name is taken');

    const provider = new ethers.BrowserProvider(walletClient);
    const signer = await provider.getSigner();
    const contract = getContract(signer);

    const tx = await contract.registerName(name);
    await tx.wait();

    await axios.post('/api/register', { name, address });
    alert('✅ Name registered!');
  }

  return (
    <div className="w-full max-w-md space-y-3">
      <input
        className="w-full p-2 rounded bg-gray-900 text-white"
        placeholder="choose your .esp name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {isAvailable === true && (
        <p className="text-green-500 text-sm">✅ {name}.esp is available!</p>
      )}
      {isAvailable === false && (
        <>
          <p className="text-red-500 text-sm">❌ {name}.esp is taken</p>
          {suggestions.length > 0 && (
            <div className="bg-gray-800 text-sm rounded p-2 mt-1">
              <p className="text-white mb-1">Suggestions:</p>
              {suggestions.map((s, i) => (
                <div
                  key={i}
                  className="text-blue-400 cursor-pointer hover:underline"
                  onClick={() => setName(s)}
                >
                  {s}.esp
                </div>
              ))}
            </div>
          )}
        </>
      )}

      <button
        className={`w-full p-2 rounded-xl transition-colors ${
          hasRegistered || !name
            ? 'bg-gray-700 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
        onClick={handleRegister}
        disabled={hasRegistered || !name}
      >
        Register `{name || 'name'}.esp`
      </button>
    </div>
  );
}
