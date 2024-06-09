'use client';

import Alert from '@/components/alert';
import { useRouter } from 'next/navigation';
// pages/login.tsx
import { useState } from 'react';

interface FormData {
  username: string;
  email: string;
  password: string;
}

const SignUp = () => {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let url = process.env.NEXT_PUBLIC_BACKEND_API_URL + '/register';
    let data = { username: username, email: email, password: password }

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };

    let response = await fetch(url, options);

    if (!response.ok) {
      // Extract and parse the response body for HTTP errors
      const errorBody = await response.json();
      setErrors(errorBody.message);
      // throw new Error(`HTTP error! status: ${response.status}, message: ${errorBody.message}`);
    }
    else {
      // if register success then autologin
      setErrors([]);

      // Add 1s delay to ensure the user is registered in the database
      await new Promise(resolve => setTimeout(resolve, 1000));

      url = process.env.NEXT_PUBLIC_BACKEND_API_URL + '/login';
      response = await fetch(url, options);

      if (!response.ok) {
        // Extract and parse the response body for HTTP errors
        const errorBody = await response.json();
        setErrors(errorBody.message);
      }
      else {
        let responseDecoded = await response.json();
        let access_token: string = responseDecoded.access_token;
        localStorage.setItem('access_token', access_token);

        router.push('/chat');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

        {errors.length > 0 && <Alert messages={errors} />}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
