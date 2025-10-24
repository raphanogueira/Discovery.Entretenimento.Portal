import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout: React.FC = () => {
  return (
    <div className="bg-gray-900 text-white font-sans overflow-x-hidden">
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
