import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api';
import { Post } from '../../types';

function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [liked, setLiked] = useState(false);

  useEffect(() => {
    async function loadPost() {
      try {
        const response = await api.get<Post>(`/posts/${id}`);

        setPost(response.data);
      } catch (error) {
        console.error('Erro ao buscar post:', error);
        setError('Não foi possível carregar o post.');
      } finally {
        setLoading(false);
      }
    }

    loadPost();
  }, [id]);

  if (loading) {
    return <p>Carregando post...</p>;
  }

  if (error || !post) {
    return (
      <div className="post-details-page">
        <p>{error || 'Post não encontrado.'}</p>

        <button onClick={() => navigate('/')}>
          Voltar
        </button>
      </div>
    );
  }

  return (
    <main className="post-details-page">

      <button
        className="back-button"
        onClick={() => navigate(-1)}
      >
        ← Voltar
      </button>

      <article className="instagram-post post-details">

        <header className="post-header">

          <div className="post-avatar">
            {(post.autor || post.materia)
              .charAt(0)
              .toUpperCase()}
          </div>

          <div className="post-header-info">

            <strong>
              {post.autor || 'Autor não informado'}
            </strong>

            <span>
              {post.materia}
            </span>

          </div>

        </header>

        <div className="post-content">

          <h1>
            {post.assunto}
          </h1>

          <div className="post-description post-full-description">
            {post.descricao}
          </div>

        </div>

        <footer className="post-footer">

          <div className="post-actions">

            <button
              onClick={() => setLiked(!liked)}
              className={liked ? 'liked' : ''}
            >
              {liked ? '♥' : '♡'}
            </button>

            <button>
              💬
            </button>

            <button>
              ↗
            </button>

          </div>

          <span className="post-status">
            {post.habilitado === 1
              ? 'Publicado'
              : 'Desativado'}
          </span>

        </footer>

      </article>

    </main>
  );
}

export default PostDetails;
