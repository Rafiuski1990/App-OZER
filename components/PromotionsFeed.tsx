
import React from 'react';
import { Promotion } from '../types';
import { Clock, MapPin, Tag } from 'lucide-react';
import { PRODUCT_CATALOG } from '../data';

const MOCK_PROMOTIONS: Promotion[] = [
    {
        id: '1',
        marketId: 'favetta-1',
        marketName: 'Favetta Supermercados',
        marketLogo: 'https://placehold.co/50x50/red/white?text=F',
        productName: 'Picanha Bovina',
        productImage: PRODUCT_CATALOG['carne'].variants.find(v => v.id === 'picanha')?.image || '',
        oldPrice: 89.90,
        newPrice: 59.90,
        description: 'Oferta relâmpago para o churrasco do fim de semana!',
        expiresIn: '2 dias'
    },
    {
        id: '2',
        marketId: 'delta',
        marketName: 'Delta Supermercados',
        marketLogo: 'https://placehold.co/50x50/blue/white?text=D',
        productName: 'Cerveja Heineken',
        productImage: PRODUCT_CATALOG['cerveja'].variants.find(v => v.id === 'longneck')?.image || '',
        oldPrice: 7.99,
        newPrice: 5.49,
        description: 'Long Neck 330ml. Leve 6 pague 5.',
        expiresIn: 'Hoje'
    },
    {
        id: '3',
        marketId: 'atacadao',
        marketName: 'Atacadão',
        marketLogo: 'https://placehold.co/50x50/orange/white?text=A',
        productName: 'Arroz Branco 5kg',
        productImage: PRODUCT_CATALOG['arroz'].variants.find(v => v.id === 'branco5')?.image || '',
        oldPrice: 28.90,
        newPrice: 23.90,
        description: 'Arroz Camil Tipo 1. Limite de 3 unidades por cliente.',
        expiresIn: '5 dias'
    }
];

export const PromotionsFeed: React.FC = () => {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between px-1">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <Tag className="text-ozer-500" />
                    Ofertas em Araras
                </h2>
                <span className="text-xs bg-red-100 text-red-600 font-bold px-2 py-1 rounded-full uppercase">Ao Vivo</span>
            </div>

            <div className="grid gap-6">
                {MOCK_PROMOTIONS.map((promo) => (
                    <div key={promo.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        {/* Header */}
                        <div className="p-3 flex items-center gap-3 border-b border-gray-50">
                            <img src={promo.marketLogo} alt={promo.marketName} className="w-10 h-10 rounded-full object-cover shadow-sm" />
                            <div>
                                <h3 className="font-bold text-gray-800 text-sm">{promo.marketName}</h3>
                                <p className="text-xs text-gray-500 flex items-center gap-1">
                                    <MapPin size={10} /> Araras - SP
                                </p>
                            </div>
                        </div>

                        {/* Image Area */}
                        <div className="relative h-48 bg-gray-50 flex items-center justify-center p-4">
                            <img src={promo.productImage} alt={promo.productName} className="h-full object-contain mix-blend-multiply" />
                            <div className="absolute top-3 right-3 bg-red-600 text-white font-black text-sm px-3 py-1 rounded shadow-lg transform rotate-3">
                                -{Math.round(((promo.oldPrice - promo.newPrice) / promo.oldPrice) * 100)}%
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-4">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h4 className="font-bold text-lg text-gray-900">{promo.productName}</h4>
                                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{promo.description}</p>
                                </div>
                                <div className="text-right">
                                    <span className="block text-xs text-gray-400 line-through">R$ {promo.oldPrice.toFixed(2)}</span>
                                    <span className="block text-2xl font-black text-green-600">R$ {promo.newPrice.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="mt-4 flex items-center justify-between pt-3 border-t border-gray-100">
                                <div className="flex items-center gap-1 text-xs text-orange-600 font-semibold">
                                    <Clock size={14} />
                                    Expira em: {promo.expiresIn}
                                </div>
                                <button className="bg-ozer-50 text-ozer-600 px-4 py-2 rounded-lg text-xs font-bold hover:bg-ozer-100 transition-colors">
                                    Ver no Mapa
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center py-4 bg-blue-50 rounded-lg border border-blue-100 p-4">
                <p className="text-sm text-blue-800 font-semibold mb-2">É dono de supermercado?</p>
                <button className="bg-blue-600 text-white text-sm font-bold py-2 px-6 rounded-lg hover:bg-blue-700">
                    Anuncie sua Oferta
                </button>
            </div>
        </div>
    );
};
