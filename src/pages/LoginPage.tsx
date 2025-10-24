import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import api from '../services/api';
import axios from 'axios';
import type { ApiResponse, Notification } from '../types/ApiResponse';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await api.post('api/auth/login', { email, password });
      toast.success('Login bem-sucedido!');
      navigate('/');
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const response: ApiResponse = err.response.data;
        if (response.notifications) {
          response.notifications.forEach((notification: Notification) => {
            if(notification.message)
              toast.error(notification.message);
          });
        } else {
          toast.error('Credenciais inválidas. Tente novamente.');
        }
      } else {
        toast.error('Ocorreu um erro inesperado. Tente novamente.');
      }
      console.error('Erro no login:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-400">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="bg-gray-700 border border-gray-600 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
              id="email"
              type="email"
              placeholder="seu.email@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className="mb-8">
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="password">
              Senha
            </label>
            <input
              className="bg-gray-700 border border-gray-600 rounded w-full py-2 px-3 text-white mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
              id="password"
              type="password"
              placeholder="******************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className="flex items-center justify-center mb-6">
            <button
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-8 rounded-full focus:outline-none focus:shadow-outline transform transition-all duration-300 hover:scale-105 disabled:bg-indigo-400 disabled:cursor-not-allowed flex items-center justify-center"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : 'Entrar'}
            </button>
          </div>
          <p className="text-center text-gray-400 text-sm">
            Não tem uma conta?{' '}
            <Link to="/cadastro" className="font-bold text-indigo-400 hover:text-indigo-300">
              Cadastre-se
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
