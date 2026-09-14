import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';

function NewPost() {
  const navigate = useNavigate();

  const [autor, setAutor] = useState('');
  const [materia, setMateria] = useState('');
  const [assunto, setAssunto] = useState('');
  const [descricao, setDescricao] = useState('');
  const [habilitado, setHabilitado] = useState(true);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!autor || !materia || !assunto || !descricao) {
      setError('Preencha todos os campos.');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const response = await api.post('/posts', {
        autor,
        materia,
        assunto,
        descricao,
        habilitado: habilitado ? 1 : 0,
      });

      console.log('Post criado:', response.data);

      navigate('/');
    } catch (error) {
      console.error('Erro ao criar post:', error);

      setError('Não foi possível criar o post.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="new-post-page">

      <h1>Novo Post</h1>

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
            Publicar post
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
            disabled={loading}
          >
            {loading ? 'Publicando...' : 'Publicar Post'}
          </button>

        </div>

      </form>

    </div>
  );
}

export default NewPost;
