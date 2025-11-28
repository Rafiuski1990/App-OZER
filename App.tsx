import React, { useState, useEffect } from 'react';
import { ShoppingItem, TransportMode, MarketResult, Coordinates, UserProfile } from './types';
import { ShoppingList } from './components/ShoppingList';
import { ResultCard } from './components/ResultCard';
import { Leaderboard } from './components/Leaderboard';
import { ContributionForm } from './components/ContributionForm';
import { PromotionsFeed } from './components/PromotionsFeed';
import { RegistrationScreen } from './components/RegistrationScreen';
import { OzerLogo } from './components/Logo';
import { findAndCompareMarkets, calculateTripCost, haversineDistance } from './services/geminiService';
import { Car, Footprints, Bike, MapPin, Loader2, Megaphone, Users, List, BarChart2 } from 'lucide-react';

// Default location: Araras, São Paulo (Centro)
const DEFAULT_LOCATION: Coordinates = { latitude: -22.3075, longitude: -47.3858 };

export default function App() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [activeTab, setActiveTab] = useState<'list' | 'results' | 'community' | 'offers'>('list');
  const [transportMode, setTransportMode] = useState<TransportMode>(TransportMode.CAR);
  const [results, setResults] = useState<MarketResult[]>([]);
  const [loading, setLoading] = useState(false);
  
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);
  const [locationStatus, setLocationStatus] = useState<'pending' | 'success' | 'error'>('pending');
  const [simulateLocation, setSimulateLocation] = useState(false);

  useEffect(() => {
    // Check for registered user (mocked via state for this session, in real app use localStorage/DB)
    // For now we start as null to force registration screen
    
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          setUserLocation(coords);
          setLocationStatus('success');

          // Auto-enable simulation if user is far from Araras (> 50km)
          const distToAraras = haversineDistance(coords, DEFAULT_LOCATION);
          if (distToAraras > 50) {
            setSimulateLocation(true);
          }
        },
        (error) => {
          console.error("Geo error:", error);
          setUserLocation(DEFAULT_LOCATION);
          setLocationStatus('error');
          setSimulateLocation(true); // Force simulation if geo fails
        }
      );
    } else {
        setUserLocation(DEFAULT_LOCATION);
        setLocationStatus('error');
        setSimulateLocation(true);
    }
  }, []);

  const handleRegister = (profile: UserProfile) => {
    setUserProfile(profile);
  };

  const handleAddItem = (item: Omit<ShoppingItem, 'id'>) => {
    setItems([...items, { ...item, id: Math.random().toString(36).substring(2, 9) }]);
  };

  const handleRemoveItem = (id: string) => {
    setItems(items.filter((i) => i.id !== id));
  };

  const handleCompare = async () => {
    if (items.length === 0) {
        alert("Adicione itens à lista primeiro.");
        return;
    }
    
    // Determine which location to use based on the toggle
    const locationToUse = (simulateLocation || !userLocation) 
        ? DEFAULT_LOCATION 
        : userLocation;

    setLoading(true);
    setActiveTab('results');
    
    // Call Gemini Service
    const data = await findAndCompareMarkets(items, locationToUse, transportMode);
    
    // Sort logic based on total cost
    const sorted = data.sort((a, b) => {
        const costA = a.productsTotal + calculateTripCost(a.distanceKm, transportMode);
        const costB = b.productsTotal + calculateTripCost(b.distanceKm, transportMode);
        return costA - costB;
    });

    setResults(sorted);
    setLoading(false);
  };

  // 1. Show Registration Screen if not logged in
  if (!userProfile) {
    return <RegistrationScreen onRegister={handleRegister} />;
  }

  // 2. Main App Interface
  return (
    <div className="min-h-screen pb-24 bg-gray-50 flex flex-col items-center">
        {/* Header */}
        <header className="w-full bg-ozer-500 text-white shadow-lg sticky top-0 z-50">
            <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    {/* Logo Icon - White on Orange */}
                    <OzerLogo className="w-10 h-10 text-white" />
                    <h1 className="text-xl font-black tracking-tight hidden xs:block">OZER</h1>
                </div>

                <div className="flex items-center gap-3">
                   {/* User Avatar Mini */}
                   <div className="flex items-center gap-2 bg-ozer-600 px-2 py-1 rounded-full border border-ozer-400">
                      <img 
                        src={userProfile.photoUrl || `https://placehold.co/30x30/orange/white?text=${userProfile.name.charAt(0)}`} 
                        alt="Profile" 
                        className="w-6 h-6 rounded-full object-cover border border-white"
                      />
                      <span className="text-[10px] font-bold truncate max-w-[60px] hidden sm:block">
                        {userProfile.name.split(' ')[0]}
                      </span>
                   </div>

                    {/* Location Toggle */}
                    <button 
                        onClick={() => setSimulateLocation(!simulateLocation)}
                        className="flex flex-col items-end text-xs group"
                    >
                        <div className="flex items-center gap-1 font-bold opacity-90 group-hover:opacity-100 transition-opacity">
                            {simulateLocation ? (
                                <>
                                    <MapPin size={12} className="text-white" />
                                    <span>Simulado</span>
                                </>
                            ) : (
                                <>
                                    <MapPin size={12} className="text-green-200" />
                                    <span>GPS</span>
                                </>
                            )}
                        </div>
                    </button>
                </div>
            </div>
            
            {/* Distance Warning Banner */}
            {simulateLocation && locationStatus === 'success' && userLocation && haversineDistance(userLocation, DEFAULT_LOCATION) > 50 && (
                <div className="bg-orange-600 text-white text-[10px] py-1 px-4 text-center">
                    Modo Simulado: Você está longe de Araras-SP.
                </div>
            )}
        </header>

        <main className="w-full max-w-md px-4 pt-4 flex-1 flex flex-col gap-6">
            
            {/* Content Areas */}
            {activeTab === 'list' && (
                <div className="animate-fade-in">
                    <ShoppingList 
                        items={items} 
                        onAddItem={handleAddItem} 
                        onRemoveItem={handleRemoveItem} 
                    />
                    
                    {items.length > 0 && (
                        <div className="mt-6 bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                            <label className="block text-sm font-bold text-gray-700 mb-3">Como você vai ao mercado?</label>
                            <div className="grid grid-cols-3 gap-2">
                                <button 
                                    onClick={() => setTransportMode(TransportMode.CAR)}
                                    className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all ${transportMode === TransportMode.CAR ? 'border-ozer-500 bg-orange-50 text-ozer-600' : 'border-gray-100 text-gray-400'}`}
                                >
                                    <Car size={24} />
                                    <span className="text-xs mt-1 font-semibold">Carro</span>
                                </button>
                                <button 
                                    onClick={() => setTransportMode(TransportMode.MOTO)}
                                    className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all ${transportMode === TransportMode.MOTO ? 'border-ozer-500 bg-orange-50 text-ozer-600' : 'border-gray-100 text-gray-400'}`}
                                >
                                    <Bike size={24} />
                                    <span className="text-xs mt-1 font-semibold">Moto</span>
                                </button>
                                <button 
                                    onClick={() => setTransportMode(TransportMode.WALK)}
                                    className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all ${transportMode === TransportMode.WALK ? 'border-ozer-500 bg-orange-50 text-ozer-600' : 'border-gray-100 text-gray-400'}`}
                                >
                                    <Footprints size={24} />
                                    <span className="text-xs mt-1 font-semibold">A pé</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'results' && (
                <div className="animate-fade-in pb-8">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                            <Loader2 size={48} className="animate-spin text-ozer-500 mb-4" />
                            <p>Calculando custos...</p>
                            <p className="text-xs opacity-70 mt-1">
                                {simulateLocation 
                                    ? "Simulando distâncias no centro de Araras" 
                                    : "Usando sua localização GPS real"}
                            </p>
                        </div>
                    ) : results.length > 0 ? (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between text-sm text-gray-500 px-1">
                                <span>{results.length} mercados encontrados</span>
                                <span>Modo: {transportMode === 'CAR' ? 'Carro' : transportMode === 'MOTO' ? 'Moto' : 'A pé'}</span>
                            </div>
                            {results.map((market, index) => (
                                <ResultCard 
                                    key={market.id} 
                                    market={market} 
                                    transportMode={transportMode}
                                    isBestOption={index === 0} 
                                />
                            ))}
                             <div className="bg-blue-50 p-4 rounded-lg text-xs text-blue-700 mt-4 border border-blue-100">
                                <strong>Nota:</strong> Os preços são baseados nos mercados de Araras-SP. 
                                {simulateLocation 
                                    ? " As distâncias são simuladas a partir do centro da cidade." 
                                    : " As distâncias são reais a partir da sua localização."}
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-12 text-gray-400">
                            <MapPin size={48} className="mx-auto mb-2 opacity-20" />
                            <p>Nenhum resultado ainda.</p>
                            <p className="text-sm">Preencha sua lista e clique em "Buscar Menor Preço".</p>
                            <button 
                                onClick={() => setActiveTab('list')}
                                className="mt-4 text-ozer-600 font-bold text-sm hover:underline"
                            >
                                Voltar para Lista
                            </button>
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'community' && (
                <div className="animate-fade-in space-y-6">
                    <Leaderboard />
                    <ContributionForm />
                </div>
            )}

            {activeTab === 'offers' && (
                <div className="animate-fade-in">
                    <PromotionsFeed />
                </div>
            )}

        </main>

        {/* Bottom Navigation Bar */}
        <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 py-2 px-4 flex justify-between items-center z-50">
            <button 
                onClick={() => setActiveTab('list')}
                className={`flex flex-col items-center gap-1 p-2 rounded-lg w-1/4 transition-colors ${activeTab === 'list' ? 'text-ozer-600 bg-orange-50' : 'text-gray-400'}`}
            >
                <List size={20} strokeWidth={activeTab === 'list' ? 2.5 : 2} />
                <span className="text-[10px] font-bold">Lista</span>
            </button>
            
            <button 
                onClick={() => setActiveTab('results')}
                className={`flex flex-col items-center gap-1 p-2 rounded-lg w-1/4 transition-colors ${activeTab === 'results' ? 'text-ozer-600 bg-orange-50' : 'text-gray-400'}`}
            >
                <BarChart2 size={20} strokeWidth={activeTab === 'results' ? 2.5 : 2} />
                <span className="text-[10px] font-bold">Comparar</span>
            </button>

            <button 
                onClick={() => setActiveTab('offers')}
                className={`flex flex-col items-center gap-1 p-2 rounded-lg w-1/4 transition-colors ${activeTab === 'offers' ? 'text-ozer-600 bg-orange-50' : 'text-gray-400'}`}
            >
                <Megaphone size={20} strokeWidth={activeTab === 'offers' ? 2.5 : 2} />
                <span className="text-[10px] font-bold">Ofertas</span>
            </button>

            <button 
                onClick={() => setActiveTab('community')}
                className={`flex flex-col items-center gap-1 p-2 rounded-lg w-1/4 transition-colors ${activeTab === 'community' ? 'text-ozer-600 bg-orange-50' : 'text-gray-400'}`}
            >
                <Users size={20} strokeWidth={activeTab === 'community' ? 2.5 : 2} />
                <span className="text-[10px] font-bold">Comunidade</span>
            </button>
        </nav>

        {/* Floating Action Button (Only on List Tab, above Nav) */}
        {activeTab === 'list' && items.length > 0 && (
            <div className="fixed bottom-20 left-0 w-full px-4 flex justify-center z-40 pointer-events-none">
                <button 
                    onClick={handleCompare}
                    className="pointer-events-auto bg-gray-900 hover:bg-black text-white text-lg font-bold py-3 px-8 rounded-full shadow-2xl flex items-center gap-3 transform transition hover:scale-105"
                >
                    <span className="text-ozer-400">
                        <MapPin className="fill-current" />
                    </span>
                    Buscar Preço
                </button>
            </div>
        )}
    </div>
  );
}