import React, { useState } from 'react';
import { UserProfile } from '../types';
import { Camera, User, FileText } from 'lucide-react';
import { OzerLogo } from './Logo';

interface Props {
  onRegister: (profile: UserProfile) => void;
}

export const RegistrationScreen: React.FC<Props> = ({ onRegister }) => {
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setPhotoUrl(imageUrl);
    }
  };

  const formatCPF = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  };

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCpf(formatCPF(e.target.value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && cpf) {
      onRegister({ name, cpf, photoUrl });
    } else {
      alert("Por favor, preencha todos os campos obrigatórios.");
    }
  };

  return (
    <div className="min-h-screen bg-ozer-500 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 animate-fade-in">
        <div className="text-center mb-8">
          {/* Logo Container - Solid Orange with White Logo */}
          <div className="bg-ozer-500 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg ring-4 ring-orange-100">
            <OzerLogo className="w-14 h-14 text-white" />
          </div>
          <h1 className="text-2xl font-black text-gray-800">Bem-vindo ao OZER</h1>
          <p className="text-gray-500 text-sm mt-1">Crie seu perfil para começar a economizar.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Photo Upload */}
          <div className="flex flex-col items-center gap-2">
            <div className="relative w-24 h-24 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden hover:border-ozer-400 transition-colors cursor-pointer group">
              {photoUrl ? (
                <img src={photoUrl} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <Camera className="text-gray-400 group-hover:text-ozer-500" size={32} />
              )}
              <input 
                type="file" 
                accept="image/*" 
                onChange={handlePhotoUpload} 
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
            <span className="text-xs text-ozer-600 font-medium">
              {photoUrl ? 'Trocar foto' : 'Adicionar foto de perfil'}
            </span>
          </div>

          {/* Name Input */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Nome Completo</label>
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ozer-500 outline-none"
                required
              />
              <User className="absolute left-3 top-3.5 text-gray-400" size={18} />
            </div>
          </div>

          {/* CPF Input */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">CPF</label>
            <div className="relative">
              <input
                type="text"
                value={cpf}
                onChange={handleCpfChange}
                placeholder="000.000.000-00"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ozer-500 outline-none"
                required
                maxLength={14}
              />
              <FileText className="absolute left-3 top-3.5 text-gray-400" size={18} />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-ozer-600 hover:bg-ozer-700 text-white font-bold py-4 rounded-lg shadow-lg flex items-center justify-center gap-2 transform transition active:scale-95 mt-4"
          >
            Começar a Usar
          </button>
        </form>
      </div>
      
      <p className="mt-8 text-white/80 text-xs text-center">
        Ozer App © 2024 • Economia Inteligente
      </p>
    </div>
  );
};