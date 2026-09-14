import { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api';

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [autor, setAutor] = useState('');
  const [materia, setMateria] = useState('');
  const [assunto, setAssunto] = useState('');
  const [descricao, setDescricao] = useState('');
  const [habilitado, setHabilitado] = useState(true);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadPost() {
      try {
        const response = await api.get(`/posts/${id}`);

        const post = response.data;

        setAutor(post.autor || '');
        setMateria(post.materia || '');
        setAssunto(post.assunto || '');
        setDescricao(post.descricao || '');
        setHabilitado(post.habilitado === 1);
      } catch (error) {
        console.error('Erro ao buscar post:', error);
        setError('Não foi possível carregar o post.');
      } finally {
        setLoading(false);
      }
    }

    loadPost();
  }, [id]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!autor || !materia || !assunto || !descricao) {
      setError('Preencha todos os campos.');
      return;
    }

    try {
      setSaving(true);
      setError('');

      const updatedPost = {
        autor,
        materia,
        assunto,
        descricao,
        habilitado: habilitado ? 1 : 0,
      };

      const response = await api.put(
        `/posts/${id}`,
        updatedPost
      );

      console.log('Post atualizado:', response.data);

      navigate('/');
    } catch (error) {
      console.error('Erro ao atualizar post:', error);
      setError('Não foi possível atualizar o post.');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <p>Carregando post...</p>;
  }

  return (
    <div className="new-post-page">

      <h1>Atualizar Post</h1>

      <form
        onSubmit={handleSubmit}
        className="new-post-form"
      >

        {/* Autor */}

        <div className="form-group">
          <label htmlFor="autor">
            Autor
          </label>

          <input
            id="autor"
            type="text"
            value={autor}
            onChange={(event) => setAutor(event.target.value)}
            placeholder="Digite o nome do autor"
          />
        </div>

        {/* Matéria */}

        <div className="form-group">
          <label htmlFor="materia">
            Matéria
          </label>

          <input
            id="materia"
            type="text"
            value={materia}
            onChange={(event) => setMateria(event.target.value)}
            placeholder="Ex: Matemática"
          />
        </div>

        {/* Assunto */}

        <div className="form-group">
          <label htmlFor="assunto">
            Assunto
          </label>

          <input
            id="assunto"
            type="text"
            value={assunto}
            onChange={(event) => setAssunto(event.target.value)}
            placeholder="Digite o título do post"
          />
        </div>

        {/* Descrição */}

        <div className="form-group">
          <label htmlFor="descricao">
            Descrição
          </label>

          <textarea
            id="descricao"
            value={descricao}
            onChange={(event) => setDescricao(event.target.value)}
            placeholder="Escreva o conteúdo do post..."
            rows={10}
          />
        </div>

        {/* Habilitado */}

        <div className="form-checkbox">

          <input
            id="habilitado"
            type="checkbox"
            checked={habilitado}
            onChange={(event) =>
              setHabilitado(event.target.checked)
            }
          />

          <label htmlFor="habilitado">
            Post habilitado
          </label>

        </div>

        {/* Erro */}

        {error && (
          <p className="form-error">
            {error}
          </p>
        )}

        {/* Botões */}

        <div className="form-buttons">

          <button
            type="button"
            onClick={() => navigate('/')}
            className="button-cancel"
          >
            Cancelar
          </button>

          <button
            type="submit"
            className="button-submit"
            disabled={saving}
          >
            {saving ? 'Atualizando...' : 'Atualizar Post'}
          </button>

        </div>

      </form>

    </div>
  );
}

export default EditPost;
