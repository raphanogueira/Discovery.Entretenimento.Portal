import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

const ConfirmEmailPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('Verificando seu e-mail...');
  const [error, setError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const token = searchParams.get('token');

    if (!token) {
      setMessage('Token de confirmação não encontrado na URL.');
      setError(true);
      return;
    }

    const confirmEmail = async () => {
      try {
        await api.post('api/accounts/confirm-email', { token });
        setMessage('E-mail confirmado com sucesso! Você será redirecionado para a página de login em 5 segundos.');
        setIsSuccess(true);
        setTimeout(() => {
          navigate('/login');
        }, 5000);
      } catch (err) {
        setMessage('Ocorreu um erro ao confirmar seu e-mail. O link pode ter expirado ou ser inválido. Por favor, tente novamente ou contate o suporte.');
        setError(true);
        console.error('Erro na confirmação de e-mail:', err);
      }
    };

    confirmEmail();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-lg text-center">
        <h2 className="text-3xl font-bold mb-6 text-indigo-400">Confirmação de E-mail</h2>
        <p className={`text-lg ${error ? 'text-red-400' : 'text-gray-300'}`}>
          {message}
        </p>
        {isSuccess && (
          <p className="mt-4 text-gray-400">
            Se não for redirecionado, <Link to="/login" className="text-indigo-400 hover:text-indigo-300">clique aqui para fazer login</Link>.
          </p>
        )}
      </div>
    </div>
  );
};

export default ConfirmEmailPage;
