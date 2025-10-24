import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import api from '../services/api';
import axios from 'axios';
import type { ApiResponse, Notification } from '../types/ApiResponse';
import { IMaskInput } from 'react-imask';

const ConfirmEmailPage: React.FC = () => {
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(120);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  useEffect(() => {
    if (!email) {
      toast.error("E-mail não encontrado. Por favor, tente fazer o cadastro novamente.");
      navigate('/cadastro');
    }
  }, [email, navigate]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleResendToken = async () => {
    if (countdown > 0) return;
    setIsResending(true);
    try {
      await api.post('api/accounts/resend-confirm-email', { email });
      toast.success('Um novo código de confirmação foi enviado para o seu e-mail.');
      setCountdown(120); // Reinicia o contador
    } catch (err) {
      toast.error('Ocorreu um erro ao reenviar o código. Tente novamente mais tarde.');
      console.error('Erro ao reenviar o código:', err);
    } finally {
      setIsResending(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await api.post('api/accounts/confirm-email', { email, token });
      toast.success('E-mail confirmado com sucesso! Redirecionando para o login...');
      
      setTimeout(() => {
        navigate('/login');
      }, 3000);

    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const response: ApiResponse = err.response.data;
        if (response.notifications) {
          response.notifications.forEach((notification: Notification) => {
            if(notification.message)
              toast.error(notification.message);
          });
        } else {
          toast.error('Código inválido ou expirado.');
        }
      } else {
        toast.error('Ocorreu um erro inesperado. Tente novamente.');
      }
      console.error('Erro na confirmação de e-mail:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <h2 className="text-3xl font-bold mb-4 text-indigo-400">Confirme seu E-mail</h2>
        <p className="text-gray-400 mb-6">
          Enviamos um código de 8 caracteres para o seu e-mail: <span className="font-bold text-indigo-300">{email}</span>.
          Por favor, insira o código abaixo para ativar sua conta.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="token">
              Código de Confirmação
            </label>
            <IMaskInput
              mask="********"
              value={token}
              onAccept={(value) => setToken(String(value))}
              id="token"
              placeholder="********"
              className="bg-gray-700 border border-gray-600 rounded w-full py-3 px-4 text-white text-center text-2xl tracking-[0.5em] focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
              disabled={isLoading}
            />
          </div>
          <div className="flex items-center justify-center mb-6">
            <button
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-8 rounded-full focus:outline-none focus:shadow-outline transform transition-all duration-300 hover:scale-105 disabled:bg-indigo-400 disabled:cursor-not-allowed flex items-center justify-center"
              type="submit"
              disabled={isLoading || token.length < 8}
            >
              {isLoading ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : 'Confirmar E-mail'}
            </button>
          </div>
        </form>
        <p className="text-center text-gray-400 text-sm">
          Não recebeu o e-mail?{' '}
          <button 
            onClick={handleResendToken}
            className="font-bold text-indigo-400 hover:text-indigo-300 focus:outline-none disabled:text-gray-500 disabled:cursor-not-allowed"
            disabled={countdown > 0 || isResending}
          >
            {isResending ? 'Reenviando...' : (countdown > 0 ? `Reenviar em ${formatTime(countdown)}` : 'Reenviar código')}
          </button>
        </p>
        <p className="mt-4 text-gray-400 text-sm">
          <Link to="/login" className="text-indigo-400 hover:text-indigo-300">
            Voltar para o Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ConfirmEmailPage;
