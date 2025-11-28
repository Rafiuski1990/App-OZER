
import React, { useEffect, useState } from 'react';
import { MarketResult, TransportMode } from '../types';
import { calculateTripCost } from '../services/geminiService';
import { Clock, MapPin, AlertTriangle, CheckCircle, CreditCard, Banknote, QrCode } from 'lucide-react';

interface Props {
  market: MarketResult;
  transportMode: TransportMode;
  isBestOption: boolean;
}

export const ResultCard: React.FC<Props> = ({ market, transportMode, isBestOption }) => {
  const tripCost = calculateTripCost(market.distanceKm, transportMode);
  const totalCost = market.productsTotal + tripCost;
  const roundTripTime = market.timeMinutes * 2; // Ida e volta

  const [isOpen, setIsOpen] = useState<boolean | null>(null);

  useEffect(() => {
    if (market.openingTime && market.closingTime) {
      const now = new Date();
      const currentHours = now.getHours();
      const currentMinutes = now.getMinutes();
      const currentTimeVal = currentHours * 60 + currentMinutes;

      const [openH, openM] = market.openingTime.split(':').map(Number);
      const [closeH, closeM] = market.closingTime.split(':').map(Number);
      
      const openTimeVal = openH * 60 + openM;
      const closeTimeVal = closeH * 60 + closeM;

      if (currentTimeVal >= openTimeVal && currentTimeVal < closeTimeVal) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    }
  }, [market]);

  const getPaymentIcon = (method: string) => {
      const m = method.toLowerCase();
      if (m.includes('pix')) return <QrCode size={12} className="inline mr-1" />;
      if (m.includes('crédito') || m.includes('débito')) return <CreditCard size={12} className="inline mr-1" />;
      if (m.includes('vale') || m.includes('ticket')) return <Banknote size={12} className="inline mr-1" />;
      return null;
  };

  return (
    <div className={`relative bg-white rounded-xl shadow-md p-5 border-2 transition-transform transform hover:scale-[1.02] ${isBestOption ? 'border-green-500 ring-2 ring-green-100' : 'border-transparent'}`}>
      
      {isBestOption && (
        <div className="absolute -top-3 right-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
          <CheckCircle size={12} />
          Melhor Escolha
        </div>
      )}

      {/* Header Info */}
      <div className="flex justify-between items-start mb-1">
        <h3 className="font-bold text-lg text-gray-900 leading-tight w-2/3">{market.name}</h3>
        <div className="text-right flex-1">
            <span className="block text-xl md:text-2xl font-black text-ozer-600 truncate">
            R$ {totalCost.toFixed(2)}
            </span>
            <span className="text-xs text-gray-500">Custo Total</span>
        </div>
      </div>

      <p className="text-sm text-gray-500 flex items-center gap-1 mb-2">
        <MapPin size={14} className="flex-shrink-0" />
        <span className="truncate">{market.address}</span>
      </p>

      {/* Status & Hours */}
      {market.openingTime && (
          <div className="flex items-center gap-2 mb-3 text-xs">
              <span className={`px-2 py-0.5 rounded-full font-bold ${isOpen ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {isOpen ? 'ABERTO' : 'FECHADO'}
              </span>
              <span className="text-gray-500">
                  {market.openingTime} às {market.closingTime}
              </span>
          </div>
      )}

      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="bg-gray-50 p-2 rounded-lg">
          <span className="text-xs text-gray-500 block">Produtos</span>
          <span className="font-semibold text-gray-800">R$ {market.productsTotal.toFixed(2)}</span>
        </div>
        <div className="bg-gray-50 p-2 rounded-lg">
          <span className="text-xs text-gray-500 block">Deslocamento (R$)</span>
          <span className="font-semibold text-gray-800">R$ {tripCost.toFixed(2)}</span>
        </div>
      </div>

      {/* Payment Methods */}
      {market.paymentMethods && market.paymentMethods.length > 0 && (
          <div className="mb-4">
              <span className="text-xs font-bold text-gray-500 mb-1 block">Aceita:</span>
              <div className="flex flex-wrap gap-1">
                  {market.paymentMethods.map((pm, idx) => (
                      <span key={idx} className="bg-gray-100 text-gray-600 text-[10px] px-2 py-1 rounded border border-gray-200 flex items-center">
                          {getPaymentIcon(pm)} {pm}
                      </span>
                  ))}
              </div>
          </div>
      )}

      <div className="flex items-center justify-between text-sm border-t pt-3 border-gray-100">
        <div className="flex items-center gap-2 text-blue-600">
            <Clock size={16} />
            <span className="font-medium">{roundTripTime} min</span>
            <span className="text-xs text-gray-400">(ida e volta)</span>
        </div>
        <div className="text-gray-500">
            {market.distanceKm.toFixed(1)} km
        </div>
      </div>

      {market.missingItems && market.missingItems.length > 0 && (
        <div className="mt-3 bg-red-50 text-red-700 text-xs px-3 py-2 rounded flex flex-col gap-1 border border-red-100">
          <div className="flex items-center gap-1 font-bold">
             <AlertTriangle size={12} />
             Itens em falta:
          </div>
          <ul className="list-disc list-inside pl-1 text-red-600">
            {market.missingItems.map((item, idx) => (
                <li key={idx} className="truncate">{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
