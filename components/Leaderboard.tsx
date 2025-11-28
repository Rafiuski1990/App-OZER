import React from 'react';
import { LeaderboardUser } from '../types';
import { Trophy, Award, Medal } from 'lucide-react';

const MOCK_USERS: LeaderboardUser[] = [
  { rank: 1, name: "Maria Silva", points: 1250, contributions: 45, photoUrl: "https://placehold.co/100x100/orange/white?text=MS" },
  { rank: 2, name: "João Santos", points: 980, contributions: 32, photoUrl: "https://placehold.co/100x100/blue/white?text=JS" },
  { rank: 3, name: "Ana Costa", points: 850, contributions: 28, photoUrl: "https://placehold.co/100x100/green/white?text=AC" },
  { rank: 4, name: "Pedro Oliveira", points: 620, contributions: 15 },
  { rank: 5, name: "Lucas Lima", points: 410, contributions: 12 },
];

export const Leaderboard: React.FC = () => {
  const getRankIcon = (rank: number) => {
    switch(rank) {
      case 1: return <Medal size={24} className="text-yellow-500 fill-yellow-100" />;
      case 2: return <Medal size={24} className="text-gray-400 fill-gray-100" />;
      case 3: return <Medal size={24} className="text-amber-700 fill-amber-100" />;
      default: return <span className="text-gray-500 font-bold text-sm">#{rank}</span>;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <Trophy className="text-ozer-500" />
          Ranking
        </h2>
        <span className="text-xs font-medium text-ozer-600 bg-ozer-50 px-2 py-1 rounded-full border border-ozer-100">
            Top Contribuidores
        </span>
      </div>

      <div className="space-y-4">
        {MOCK_USERS.map((user) => (
          <div key={user.rank} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
            
            {/* Rank Icon */}
            <div className="w-8 flex justify-center">
                {getRankIcon(user.rank)}
            </div>

            {/* Avatar */}
            <div className="relative">
                <img 
                    src={user.photoUrl || `https://placehold.co/40x40/gray/white?text=${user.name.charAt(0)}`} 
                    alt={user.name} 
                    className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover"
                />
                {user.rank <= 3 && (
                    <div className="absolute -bottom-1 -right-1 bg-ozer-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full border border-white">
                        {user.rank}
                    </div>
                )}
            </div>
            
            {/* Info */}
            <div className="flex-1">
              <div className="font-bold text-gray-800 text-sm">{user.name}</div>
              <div className="text-xs text-gray-500">{user.contributions} contribuições</div>
            </div>

            {/* Points */}
            <div className="text-right bg-orange-50 px-2 py-1 rounded">
                <div className="font-black text-ozer-600 text-sm">{user.points}</div>
                <div className="text-[10px] text-ozer-400 uppercase">Pts</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t text-center">
        <button className="text-sm text-ozer-600 font-medium flex items-center justify-center gap-1 hover:underline">
            <Award size={16} />
            Ver meus pontos
        </button>
      </div>
    </div>
  );
};