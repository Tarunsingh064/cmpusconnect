'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation'; // ✅ Added for redirect

export default function SettingsForm() {
  const [form, setForm] = useState({
    bio: '',
    college_name: '',
    college_year: '',
    location: '',
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [bioExists, setBioExists] = useState(true);
  const router = useRouter(); // ✅ Used for redirect

  useEffect(() => {
    const fetchUserBio = async () => {
      try {
        const res = await axios.get('https://campusconnect-ki0p.onrender.com/api/userbio/portfolio/', {
          headers: {
            Authorization: `Bearer ${Cookies.get('access_token')}`,
          },
        });
        setForm(res.data);
        setBioExists(true);
      } catch (err) {
        console.warn('Bio not found. Switching to create mode.');
        setBioExists(false);
      }
    };

    fetchUserBio();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // ✅ Bio word limit check: max 200 characters (spaces included)
    if (name === 'bio' && value.length > 200) return;

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('');
    try {
      const url = 'https://campusconnect-ki0p.onrender.com/api/userbio/portfolio/';
      const method = bioExists ? axios.put : axios.post;

      await method(url, form, {
        headers: {
          Authorization: `Bearer ${Cookies.get('access_token')}`,
        },
      });

      setSuccessMsg(bioExists ? '✅ Bio updated successfully!' : '✅ Bio created successfully!');
      setBioExists(true);

      // ✅ Redirect after creating new bio
      if (!bioExists) {
        setTimeout(() => {
          router.push('/');
        }, 1000); // small delay for user to see message
      }
    } catch (err) {
      console.error('Submit failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-black rounded-3xl shadow-2xl border border-zinc-800">
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto bg-zinc-900 text-white p-8 rounded-2xl shadow-xl space-y-6 border border-zinc-800"
      >
        <h2 className="text-3xl font-bold text-white mb-4 text-center">
          {bioExists ? '⚙️ Edit Your Bio' : '🆕 Create Your Bio'}
        </h2>

        {['bio', 'college_name', 'college_year', 'location'].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium text-zinc-400 capitalize mb-2">
              {field.replace('_', ' ')}
            </label>
            <input
              name={field}
              value={form[field]}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-xl bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-200"
            />
            {field === 'bio' && (
              <p className="text-xs text-zinc-400 mt-1 text-right">
                {form.bio.length}/200 characters
              </p>
            )}
          </div>
        ))}

        <button
          type="submit"
          disabled={loading}
          className={`w-full ${
            bioExists ? 'bg-yellow-500' : 'bg-green-500'
          } text-black font-semibold py-2 rounded-xl hover:brightness-110 transition-all duration-200`}
        >
          {loading
            ? bioExists
              ? 'Updating...'
              : 'Creating...'
            : bioExists
            ? 'Update Bio'
            : 'Create Bio'}
        </button>

        {successMsg && (
          <p className="text-green-400 font-medium mt-2 animate-pulse text-center">{successMsg}</p>
        )}
      </form>
    </div>
  );
}
