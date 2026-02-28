import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    const passLen = formData.password.length;
    if (passLen !== 6 && passLen !== 8) {
      setError('Password must be exactly 6 or 8 characters long.');
      return;
    }

    try {
      setLoading(true);

      await api.post('/auth/register', formData);

      navigate('/login');

    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.response?.data?.error ||
        'Registration failed'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="bg-white dark:bg-slate-900 p-10 w-full max-w-md rounded-2xl border border-purple-500/30 shadow-glow">

        <h2 className="text-3xl font-bold mb-2 text-center text-purple-500">
          Join SkillSwap
        </h2>

        <p className="text-slate-400 text-center mb-8 text-sm">
          Create your account to start swapping skills.
        </p>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 text-xs p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-5">

          <div>
            <label className="block text-xs uppercase tracking-widest mb-1 text-purple-400 font-semibold">
              Full Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              className="w-full bg-slate-100 dark:bg-slate-800 border border-purple-500/20 p-3 rounded-xl focus:outline-none focus:border-purple-500"
              onChange={e =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest mb-1 text-purple-400 font-semibold">
              Email Address
            </label>
            <input
              type="email"
              required
              value={formData.email}
              className="w-full bg-slate-100 dark:bg-slate-800 border border-purple-500/20 p-3 rounded-xl focus:outline-none focus:border-purple-500"
              onChange={e =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest mb-1 text-purple-400 font-semibold">
              Password (6 or 8 chars)
            </label>
            <input
              type="password"
              required
              value={formData.password}
              className="w-full bg-slate-100 dark:bg-slate-800 border border-purple-500/20 p-3 rounded-xl focus:outline-none focus:border-purple-500"
              onChange={e =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 mt-4 rounded-xl shadow-glow disabled:opacity-50 transition-all"
          >
            {loading ? 'Processing...' : 'Create Account'}
          </button>

        </form>

        <p className="text-center mt-6 text-sm text-slate-400">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-purple-400 hover:underline"
          >
            Login here
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Register;