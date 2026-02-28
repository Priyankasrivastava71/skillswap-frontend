import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      setLoading(true);
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.response?.data?.error ||
        'Login failed'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="bg-white dark:bg-slate-900 p-10 w-full max-w-md rounded-2xl border border-purple-500/30 shadow-glow">

        <h2 className="text-3xl font-bold mb-2 text-center text-purple-500">
          Welcome Back
        </h2>

        <p className="text-slate-400 text-center mb-8 text-sm">
          Log in to your dashboard
        </p>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 text-xs p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">

          <div>
            <label className="block text-xs uppercase tracking-widest mb-1 text-purple-400 font-semibold">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              className="w-full bg-slate-100 dark:bg-slate-800 border border-purple-500/20 p-3 rounded-xl focus:outline-none focus:border-purple-500"
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest mb-1 text-purple-400 font-semibold">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              className="w-full bg-slate-100 dark:bg-slate-800 border border-purple-500/20 p-3 rounded-xl focus:outline-none focus:border-purple-500"
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl shadow-glow disabled:opacity-50 transition-all"
          >
            {loading ? 'Logging in...' : 'Sign In'}
          </button>

        </form>

        <p className="text-center mt-6 text-sm text-slate-400">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="text-purple-400 hover:underline"
          >
            Register
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;