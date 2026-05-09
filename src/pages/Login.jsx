import { useState } from 'react';
import { Link } from 'react-router-dom';
import { loginUser } from '../services/api';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const token = (await loginUser({ email, password })).trim();

      if (!token) {
        throw new Error('No token returned');
      }

      onLogin(token);
    } catch {
      setError('Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-2xl border border-white/10 bg-white shadow-2xl shadow-cyan-950/30 lg:grid-cols-[1.05fr_0.95fr]">
          <section className="hidden bg-slate-900 px-10 py-12 lg:flex lg:flex-col lg:justify-between">
            <div>
              <div className="mb-10 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400 text-lg font-bold text-slate-950">
                SM
              </div>
              <h1 className="max-w-md text-4xl font-bold leading-tight text-white">
                Smart task management for focused teams.
              </h1>
              <p className="mt-5 max-w-md text-base leading-7 text-slate-300">
                Sign in to manage work, update task progress, and track your daily summary in one clean workspace.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 text-sm text-slate-300">
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <span className="block text-2xl font-semibold text-white">24/7</span>
                Access
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <span className="block text-2xl font-semibold text-white">JWT</span>
                Secured
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <span className="block text-2xl font-semibold text-white">Live</span>
                Updates
              </div>
            </div>
          </section>

          <section className="bg-slate-50 px-6 py-10 text-slate-950 sm:px-10 lg:px-12 lg:py-16">
            <div className="mx-auto w-full max-w-md">
              <div className="mb-9">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">
                  Welcome back
                </p>
                <h2 className="mt-3 text-3xl font-bold text-slate-950">
                  Login to your account
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Enter your credentials to continue to the dashboard.
                </p>
              </div>

              {error && (
                <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                  {error}
                </div>
              )}

              <form className="space-y-5" onSubmit={handleLogin}>
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-800">
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                    onChange={(event) => setEmail(event.target.value)}
                    className="block w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="mb-2 block text-sm font-semibold text-slate-800">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
                    onChange={(event) => setPassword(event.target.value)}
                    className="block w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex w-full items-center justify-center rounded-xl bg-cyan-500 px-4 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-400 focus:outline-none focus:ring-4 focus:ring-cyan-200 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 disabled:shadow-none"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-500 border-t-transparent" />
                      Signing in...
                    </span>
                  ) : (
                    'Login'
                  )}
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-slate-600">
                New here?{' '}
                <Link className="font-semibold text-cyan-700 transition hover:text-cyan-600" to="/register">
                  Create an account
                </Link>
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default Login;
