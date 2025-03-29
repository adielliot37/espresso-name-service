import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import axios from 'axios';

export default function ViewNames() {
  const { address } = useAccount();
  const [names, setNames] = useState([]);

  useEffect(() => {
    if (!address) return;
    axios.get(`/api/user-names?address=${address}`).then(res => setNames(res.data));
  }, [address]);

  return (
    <div className="space-y-2">
      {names.map((n, i) => (
        <div key={i} className="bg-gray-700 p-2 rounded-xl">{n.name}.esp</div>
      ))}
    </div>
  );
}
