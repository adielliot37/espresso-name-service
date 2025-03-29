import { useState } from 'react';
import RegisterForm from './RegisterForm';
import PayForm from './PayForm';
import ViewNames from './ViewNames';

export default function ToggleTabs() {
  const [tab, setTab] = useState('register');

  return (
    <div className="mt-6 w-full max-w-md">
      <div className="flex space-x-2 mb-4 justify-center">
        {['register', 'pay', 'view'].map(t => (
          <button key={t}
            className={`px-4 py-2 rounded-xl ${tab === t ? 'bg-white text-black' : 'bg-gray-700'}`}
            onClick={() => setTab(t)}>
            {t === 'register' ? 'Register .esp' : t === 'pay' ? 'Pay' : 'Your .esp'}
          </button>
        ))}
      </div>
      {tab === 'register' && <RegisterForm />}
      {tab === 'pay' && <PayForm />}
      {tab === 'view' && <ViewNames />}
    </div>
  );
}
