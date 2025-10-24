import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import api from '../services/api';
import axios from 'axios';
import type { Notification } from '../types/ApiResponse';

const ConfirmEmailPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('Verificando seu e-mail...');
  const [error, setError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    const token = searchParams.get('token');

    if (!token) {
      toast.error('Token de confirmação não encontrado na URL.');
      setMessage('Token de confirmação não encontrado.');
      setError(true);
      return;
    }

    const confirmEmail = async () => {
      try {
        await api.post('api/accounts/confirm-email', { token });
        toast.success('E-mail confirmado com sucesso!');
        setIsSuccess(true);
        
        intervalRef.current = window.setInterval(() => {
          setCountdown((prev) => prev - 1);
        }, 1000);

      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.data?.notifications) {
          err.response.data.notifications.forEach((notification: Notification) => {
            toast.error(notification.message);
          });
        } else {
          toast.error('O link pode ter expirado ou ser inválido.');
        }
        setMessage('Ocorreu um erro ao confirmar seu e-mail.');
        setError(true);
        console.error('Erro na confirmação de e-mail:', err);
      }
    };

    confirmEmail();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [searchParams]);

  useEffect(() => {
    if (isSuccess) {
      if (countdown > 0) {
        setMessage(`Você será redirecionado para a página de login em ${countdown} segundos.`);
      } else {
        if (intervalRef.current) clearInterval(intervalRef.current);
        navigate('/login');
      }
    }
  }, [countdown, isSuccess, navigate]);


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-lg text-center">
        <h2 className="text-3xl font-bold mb-6 text-indigo-400">Confirmação de E-mail</h2>
        <div className="flex justify-center items-center mb-6">
          {isSuccess && !error && (
             <svg className="animate-spin h-8 w-8 text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
             </svg>
          )}
           {error && (
            <svg className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        </div>
        <p className={`text-lg ${error ? 'text-red-400' : 'text-gray-300'}`}>
          {message}
        </p>
        {(isSuccess || error) && (
          <p className="mt-4 text-gray-400">
            Se não for redirecionado, <Link to="/login" className="text-indigo-400 hover:text-indigo-300">clique aqui para fazer login</Link>.
          </p>
        )}
      </div>
    </div>
  );
};

export default ConfirmEmailPage;
