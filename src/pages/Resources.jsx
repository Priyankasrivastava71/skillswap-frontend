import { useState, useEffect } from 'react';
import api from '../api/axios';
import { BookOpen, ExternalLink, Plus, Link as LinkIcon } from 'lucide-react';

const Resources = () => {
  const [resources, setResources] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newResource, setNewResource] = useState({
    title: '',
    description: '',
    link: ''
  });
  const [loading, setLoading] = useState(true);

  const fetchResources = async () => {
    try {
      const res = await api.get('/resources');
      setResources(res.data?.data || []);
    } catch (err) {
      console.error("Error loading resources:", err);
      setResources([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post('/resources', newResource);

      setShowAddModal(false);
      fetchResources();
      setNewResource({ title: '', description: '', link: '' });

    } catch (err) {
      alert("Failed to add resource");
    }
  };

  return (
    <div className="space-y-8 p-6">

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-purple-500">
            Knowledge Hub
          </h1>
          <p className="text-slate-400">
            Shared community resources to boost your skills.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 shadow-glow transition-all"
        >
          <Plus size={20} />
          Share Resource
        </button>
      </div>

      {loading ? (
        <div className="text-center py-20 text-purple-500 animate-pulse">
          Loading resources...
        </div>
      ) : resources.length === 0 ? (
        <div className="text-center py-20 text-slate-500">
          No resources shared yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {resources.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-purple-500/20 shadow-glow hover:border-purple-500/50 transition-all group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400">
                  <LinkIcon size={24} />
                </div>

                <a
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 text-slate-500 hover:text-purple-400 transition-colors"
                >
                  <ExternalLink size={20} />
                </a>
              </div>

              <h3 className="text-xl font-bold mb-2 dark:text-white group-hover:text-purple-400 transition-colors">
                {item.title}
              </h3>

              <p className="text-slate-400 text-sm mb-6 line-clamp-3">
                {item.description}
              </p>

              <div className="flex items-center gap-2 text-xs font-medium text-purple-300 bg-purple-500/10 w-fit px-3 py-1 rounded-full uppercase tracking-wider">
                <BookOpen size={14} />
                Resource
              </div>
            </div>
          ))}

        </div>
      )}

      {/* Add Resource Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">

          <div className="bg-white dark:bg-slate-900 p-8 w-full max-w-md rounded-2xl border border-purple-500/40 shadow-glow">

            <h2 className="text-2xl font-bold mb-6 text-purple-500">
              Share Knowledge
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">

              <div>
                <label className="block text-xs uppercase text-purple-400 mb-1">
                  Title
                </label>
                <input
                  required
                  value={newResource.title}
                  className="w-full bg-slate-100 dark:bg-slate-800 border border-purple-500/20 p-3 rounded-xl focus:border-purple-500 outline-none"
                  onChange={e =>
                    setNewResource({
                      ...newResource,
                      title: e.target.value
                    })
                  }
                />
              </div>

              <div>
                <label className="block text-xs uppercase text-purple-400 mb-1">
                  URL / Link
                </label>
                <input
                  required
                  type="url"
                  value={newResource.link}
                  className="w-full bg-slate-100 dark:bg-slate-800 border border-purple-500/20 p-3 rounded-xl focus:border-purple-500 outline-none"
                  onChange={e =>
                    setNewResource({
                      ...newResource,
                      link: e.target.value
                    })
                  }
                />
              </div>

              <div>
                <label className="block text-xs uppercase text-purple-400 mb-1">
                  Description
                </label>
                <textarea
                  required
                  rows="3"
                  value={newResource.description}
                  className="w-full bg-slate-100 dark:bg-slate-800 border border-purple-500/20 p-3 rounded-xl focus:border-purple-500 outline-none"
                  onChange={e =>
                    setNewResource({
                      ...newResource,
                      description: e.target.value
                    })
                  }
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 text-slate-400 hover:text-white transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-xl shadow-glow transition-all"
                >
                  Publish
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Resources;