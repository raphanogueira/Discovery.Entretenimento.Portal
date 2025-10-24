import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IMaskInput } from 'react-imask';
import { toast } from 'sonner';
import api from '../services/api';
import axios from 'axios';
import type { ApiResponse, Notification } from '../types/ApiResponse';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handlePhoneChange = (value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      phoneNumber: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.warning('As senhas não coincidem.');
      return;
    }
    
    setIsLoading(true);

    const cleanedPhoneNumber = formData.phoneNumber.replace(/\D/g, '');
    const dataToSend = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        username: formData.username,
        email: formData.email,
        phoneNumber: cleanedPhoneNumber,
        password: formData.password,
    };

    try {
      await api.post('api/accounts', dataToSend);
      toast.success('Cadastro realizado com sucesso! Um código de confirmação foi enviado para o seu e-mail.');
      navigate('/confirmar-email', { state: { email: formData.email } });
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const response: ApiResponse = err.response.data;
        if (response.notifications) {
          response.notifications.forEach((notification: Notification) => {
            if(notification.message)
              toast.error(notification.message);
          });
        } else {
          toast.error('Ocorreu um erro ao realizar o cadastro. Tente novamente.');
        }
      } else {
        toast.error('Ocorreu um erro inesperado. Tente novamente.');
      }
      console.error('Erro no cadastro:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-400">Crie sua Conta</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="firstName">
                Nome
              </label>
              <input
                className="bg-gray-700 border border-gray-600 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
                id="firstName"
                type="text"
                placeholder="Seu nome"
                value={formData.firstName}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="lastName">
                Sobrenome
              </label>
              <input
                className="bg-gray-700 border border-gray-600 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
                id="lastName"
                type="text"
                placeholder="Seu sobrenome"
                value={formData.lastName}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="bg-gray-700 border border-gray-600 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
              id="email"
              type="email"
              placeholder="seu.email@exemplo.com"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="phoneNumber">
              Telefone
            </label>
            <IMaskInput
              mask="(00) 00000-0000"
              value={formData.phoneNumber}
              onAccept={handlePhoneChange}
              id="phoneNumber"
              placeholder="(00) 00000-0000"
              className="bg-gray-700 border border-gray-600 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
              disabled={isLoading}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="password">
                Senha
              </label>
              <input
                className="bg-gray-700 border border-gray-600 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
                id="password"
                type="password"
                placeholder="******************"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="confirmPassword">
                Confirmar Senha
              </label>
              <input
                className="bg-gray-700 border border-gray-600 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
                id="confirmPassword"
                type="password"
                placeholder="******************"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>
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
              ) : 'Cadastrar'}
            </button>
          </div>
          <p className="text-center text-gray-400 text-sm">
            Já tem uma conta?{' '}
            <Link to="/login" className="font-bold text-indigo-400 hover:text-indigo-300">
              Faça login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
