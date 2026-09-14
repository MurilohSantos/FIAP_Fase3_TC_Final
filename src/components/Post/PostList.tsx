import { useState } from 'react';
import { Post } from '../../types';
import PostCard from './PostCard';

interface PostListProps {
  posts: Post[];
}

function PostList({ posts }: PostListProps) {
  const [search, setSearch] = useState('');

  const filteredPosts = posts.filter((post) =>
    post.assunto
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div>

      <div className="post-search">

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
            <PostCard
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

    </div>
  );
}

export default PostList;
