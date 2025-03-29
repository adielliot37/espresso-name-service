import { useState } from 'react';
import { useWalletClient } from 'wagmi';
import { getContract } from '../utils/contract';
import { ethers } from 'ethers';

export default function PayForm() {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const { data: walletClient } = useWalletClient();

  const isValidESP = name.trim().toLowerCase().endsWith('.esp');

  async function handlePay() {
    if (!walletClient) return alert("❗ Please connect your wallet first");
    if (!isValidESP) return alert("Name must end with `.esp`");

    const formattedName = name.trim().toLowerCase();

    try {
      const provider = new ethers.BrowserProvider(walletClient);
      const signer = await provider.getSigner();
      const contract = getContract(signer);

      console.log('[🧠 Resolving] nameToAddress ->', formattedName);

      const resolvedAddress = await contract.nameToAddress(formattedName);

      console.log('[✅ Result] Resolved Address:', resolvedAddress);

      if (resolvedAddress === '0x0000000000000000000000000000000000000000') {
        return alert(`❌ ${formattedName} is not registered.`);
      }

      const tx = await contract.payToName(formattedName, {
        value: ethers.parseEther(amount),
      });

      await tx.wait();
      alert(`✅ Sent ${amount} ETH to ${formattedName}`);
    } catch (err) {
      console.error('❌ TX Failed:', err);
      const revertMessage = err?.data?.message || err?.message || 'Unknown error';
      alert(`❌ Transaction failed: ${revertMessage}`);
    }
  }

  return (
    <div className="w-full max-w-md space-y-3">
      <input
        className="w-full p-2 rounded-xl bg-gray-900 text-white border"
        placeholder="Enter name (e.g. elliot.esp)"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          if (!e.target.value.endsWith('.esp')) {
            setError("Name must end with `.esp`");
          } else {
            setError('');
          }
        }}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <input
        className="w-full p-2 rounded-xl bg-gray-900 text-white border"
        placeholder="Amount in ETH"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button
        className={`w-full py-2 rounded-xl text-white ${isValidESP ? 'bg-green-600' : 'bg-gray-600 cursor-not-allowed'}`}
        onClick={handlePay}
        disabled={!isValidESP}
      >
        Send
      </button>
    </div>
  );
}
