import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';

function Login() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [senha, setSenha] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    if (!name || !senha) {
      setError('Informe o usuário e a senha.');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const response = await api.post('/users/login', {
        name,
        senha,
      });

      console.log('Retorno do login:', response.data);

      const { message, tipo, user } = response.data;

      if (message !== 'Login realizado com sucesso') {
        setError('Usuário ou senha inválidos.');
        return;
      }

      // Salva os dados do usuário logado
      localStorage.setItem(
        'usuario',
        JSON.stringify(user)
      );

      localStorage.setItem(
        'tipoUsuario',
        tipo
      );

      console.log('TIPO SALVO:', tipo);

      // Redireciona de acordo com o tipo
      if (tipo === 'professor') {
        navigate('/');
      } else if (tipo === 'aluno') {
        navigate('/aluno');
      } else {
        setError('Tipo de usuário inválido.');
      }

    } catch (error) {
      console.error('Erro ao realizar login:', error);

      setError('Usuário ou senha inválidos.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">

      <div className="login-card">

        <h1>Login</h1>

        <p className="login-subtitle">
          Entre para acessar seus posts
        </p>

        <form onSubmit={handleLogin}>

          <div className="form-group">
            <label htmlFor="name">
              Usuário
            </label>

            <input
              id="name"
              type="text"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              placeholder="Digite seu usuário"
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="senha">
              Senha
            </label>

            <input
              id="senha"
              type="password"
              value={senha}
              onChange={(event) =>
                setSenha(event.target.value)
              }
              placeholder="Digite sua senha"
              autoComplete="current-password"
            />
          </div>

          {error && (
            <p className="login-error">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>

        </form>

      </div>

    </div>
  );
}

export default Login;
