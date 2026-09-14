import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Post } from '../../types';

interface StudentPostCardProps {
  post: Post;
}

function StudentPostCard({ post }: StudentPostCardProps) {
  const [liked, setLiked] = useState(false);

  return (
    <article className="instagram-post">

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

        <h1>{post.assunto}</h1>

        <div className="post-description">

          {post.descricao.length > 20
            ? `${post.descricao.substring(0, 20)}...`
            : post.descricao}

          {post.descricao.length > 20 && (
            <Link
              to={`/post/${post.id}`}
              className="read-more-button"
            >
              Ver mais
            </Link>
          )}

        </div>

      </div>

      <footer className="post-footer">

        <div className="post-actions">

          <button
            type="button"
            onClick={() => setLiked(!liked)}
            className={liked ? 'liked' : ''}
          >
            {liked ? '♥' : '♡'}
          </button>

          <button type="button">
            💬
          </button>

          <button type="button">
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
  );
}

export default StudentPostCard;
