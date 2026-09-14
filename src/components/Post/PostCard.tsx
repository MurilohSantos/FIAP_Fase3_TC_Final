import { useState } from 'react';
import { Post } from '../../types';
import { useNavigate } from 'react-router-dom';
import api from '../../api';

interface PostCardProps {
  post: Post;
}

function PostCard({ post }: PostCardProps) {
  const [liked, setLiked] = useState(false);

  const navigate = useNavigate();

  const handleDelete = async () => {
    const confirmed = window.confirm(
      'Tem certeza que deseja excluir este post?'
    );

    if (!confirmed) {
      return;
    }

    try {
      await api.delete(`/posts/${post.id}`);

      alert('Post excluído com sucesso!');

      window.location.reload();
    } catch (error) {
      console.error('Erro ao excluir post:', error);

      alert('Não foi possível excluir o post.');
    }
  };

  return (
    <article className="instagram-post">

      <header className="post-header">

        <div className="post-avatar">
          {(post.autor || post.materia).charAt(0).toUpperCase()}
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

        <h1>{post.assunto}</h1>

        <div className="post-description">

          {post.descricao.length > 20
            ? `${post.descricao.substring(0, 20)}...`
            : post.descricao}

          {post.descricao.length > 20 && (
            <button
              className="read-more-button"
              onClick={() => navigate(`/post/${post.id}`)}
            >
              Ver mais
            </button>
          )}

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

          <button
            onClick={() => navigate(`/edit-post/${post.id}`)}
          >
            ✏️
          </button>

          <button
            onClick={handleDelete}
            className="delete-button"
          >
            🗑️
          </button>

        </div>

        <span className="post-status">
          {post.habilitado === 1
            ? 'Publicado'
            : 'Desativado'}
        </span>

      </footer>

    </article>
  );
}

export default PostCard;
