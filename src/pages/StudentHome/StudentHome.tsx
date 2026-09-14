import { useEffect, useState } from 'react';
import api from '../../api';
import { Post } from '../../types';
import StudentPostCard from './StudentPostCard';

function StudentHome() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function loadPosts() {
      try {
        const response = await api.get<Post[]>('/posts');

        console.log('Posts do aluno:', response.data);

        setPosts(response.data);
      } catch (error) {
        console.error('Erro ao buscar posts:', error);
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, []);

  const filteredPosts = posts.filter((post) =>
    post.assunto
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  if (loading) {
    return <p>Carregando posts...</p>;
  }

  return (
    <main>

      <h1>Feed</h1>

      <div className="student-search">

        <input
          type="text"
          placeholder="Buscar post pelo título..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        {search && (
          <button
            type="button"
            onClick={() => setSearch('')}
          >
            ✕
          </button>
        )}

      </div>

      <div className="post-list">

        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <StudentPostCard
              key={post.id}
              post={post}
            />
          ))
        ) : (
          <p className="no-results">
            Nenhum post encontrado.
          </p>
        )}

      </div>

    </main>
  );
}

export default StudentHome;
