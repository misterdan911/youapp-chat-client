'use client';

// pages/login.tsx
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Alert from '@/components/alert';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    // console.log('Email:', email, 'Password:', password);

    let data = { email: email, password: password }

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };

    let url = process.env.NEXT_PUBLIC_BACKEND_API_URL + '/login';
    let response = await fetch(url, options);

    if (!response.ok) {
      // Extract and parse the response body for HTTP errors
      const errorBody = await response.json();

      // console.log('errorBody.message', errorBody.message);

      if (Array.isArray(errorBody.message)) {
        setErrors(errorBody.message);
      }
      else {
        setErrors([errorBody.message]);
      }

    }
    else {
      let responseDecoded = await response.json();
      let access_token: string = responseDecoded.access_token;
      localStorage.setItem('access_token', access_token);
      router.push('/chat');
    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In to Chat Client</h2>

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
            Login
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
