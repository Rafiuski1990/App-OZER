
import React, { useState, useMemo } from 'react';
import { Camera, Send, Check, Search, ChevronDown, Store, Tag } from 'lucide-react';
import { ARARAS_MARKETS } from '../services/geminiService';
import { PRODUCT_CATALOG } from '../data';
import { ProductVariant } from '../types';

export const ContributionForm: React.FC = () => {
    const [mode, setMode] = useState<'camera' | 'manual'>('camera');
    
    // Manual Form State
    const [marketId, setMarketId] = useState('');
    const [productName, setProductName] = useState('');
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
    const [brand, setBrand] = useState('');
    const [price, setPrice] = useState('');

    const normalize = (str: string) => str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    const updateSuggestions = (input: string) => {
        const term = normalize(input);
        if (term.length < 2) {
            setSuggestions([]);
            return;
        }
        const matches = Object.keys(PRODUCT_CATALOG).filter(key => key.includes(term));
        setSuggestions(matches);
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setProductName(val);
        updateSuggestions(val);
        setSelectedVariant(null);
        setBrand('');
    };

    const handleSuggestionClick = (suggestion: string) => {
        setProductName(suggestion.charAt(0).toUpperCase() + suggestion.slice(1));
        setSuggestions([]);
    };

    const matchedCategory = useMemo(() => {
        const term = normalize(productName);
        if (term.length < 2) return null;
        const exactMatch = Object.keys(PRODUCT_CATALOG).find(key => term === key || term === key + 's'); 
        if (exactMatch) return { key: exactMatch, ...PRODUCT_CATALOG[exactMatch] };
        
        // Simple aliases
        if (term.includes('pasta')) return { key: 'dental', ...PRODUCT_CATALOG['dental'] };
        return null;
    }, [productName]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Obrigado! Sua contribuição foi enviada e você ganhou 10 pontos.");
        // Reset
        setMarketId('');
        setProductName('');
        setSelectedVariant(null);
        setBrand('');
        setPrice('');
        setMode('camera');
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Tag className="text-ozer-500" />
                Atualizar Preços
            </h3>

            {/* Mode Toggle */}
            <div className="flex mb-6 bg-gray-50 p-1 rounded-lg">
                <button 
                    onClick={() => setMode('camera')}
                    className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all ${mode === 'camera' ? 'bg-white shadow-sm text-ozer-600' : 'text-gray-500'}`}
                >
                    <div className="flex items-center justify-center gap-2">
                        <Camera size={16} />
                        Foto
                    </div>
                </button>
                <button 
                    onClick={() => setMode('manual')}
                    className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all ${mode === 'manual' ? 'bg-white shadow-sm text-ozer-600' : 'text-gray-500'}`}
                >
                    <div className="flex items-center justify-center gap-2">
                        <Store size={16} />
                        Manual
                    </div>
                </button>
            </div>
            
            {mode === 'camera' ? (
                <div className="text-center py-6 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50">
                     <p className="text-gray-500 text-sm mb-4">Tire uma foto da etiqueta de preço na prateleira.</p>
                     <button className="bg-ozer-500 text-white rounded-full p-4 shadow-lg hover:bg-ozer-600 transition-transform hover:scale-105 active:scale-95">
                        <Camera size={32} />
                     </button>
                     <p className="text-xs text-gray-400 mt-2">Nossa IA identifica o produto e preço.</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in">
                    
                    {/* Market Select */}
                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1">Supermercado</label>
                        <div className="relative">
                            <select 
                                required
                                value={marketId}
                                onChange={(e) => setMarketId(e.target.value)}
                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg appearance-none outline-none focus:ring-2 focus:ring-ozer-500"
                            >
                                <option value="">Selecione o local...</option>
                                {ARARAS_MARKETS.map(m => (
                                    <option key={m.id} value={m.id}>{m.name}</option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-3.5 text-gray-400 pointer-events-none" size={16} />
                        </div>
                    </div>

                    {/* Product Autocomplete */}
                    <div className="relative">
                        <label className="block text-xs font-bold text-gray-500 mb-1">Produto</label>
                        <div className="relative">
                             <input 
                                type="text"
                                value={productName}
                                onChange={handleNameChange}
                                placeholder="O que você encontrou?"
                                className="w-full pl-9 p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-ozer-500"
                                autoComplete="off"
                            />
                            <Search className="absolute left-3 top-3.5 text-gray-400" size={16} />
                        </div>
                        {suggestions.length > 0 && (
                            <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-1 max-h-40 overflow-y-auto">
                                {suggestions.map((s) => (
                                    <li key={s} onClick={() => handleSuggestionClick(s)} className="p-2 hover:bg-orange-50 cursor-pointer text-sm border-b last:border-0 capitalize">
                                        {s}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Brand Selection */}
                    <div className="flex gap-3">
                         <div className="flex-1">
                            <label className="block text-xs font-bold text-gray-500 mb-1">Marca</label>
                            {matchedCategory ? (
                                <select 
                                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none"
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                >
                                    <option value="">Selecione...</option>
                                    {matchedCategory.brands.map(b => <option key={b.name} value={b.name}>{b.name}</option>)}
                                    <option value="other">Outra</option>
                                </select>
                            ) : (
                                <input type="text" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none" placeholder="Marca..." />
                            )}
                         </div>
                         <div className="w-1/3">
                            <label className="block text-xs font-bold text-gray-500 mb-1">Preço</label>
                            <input 
                                type="number" 
                                step="0.01" 
                                placeholder="0.00"
                                required
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none font-bold text-gray-800"
                            />
                         </div>
                    </div>

                    {/* Variant Select (Specific to Brand/Product) */}
                    {matchedCategory && (
                        <div className="bg-orange-50 p-3 rounded-lg border border-orange-100">
                             <span className="block text-xs font-bold text-ozer-700 mb-2">Qual tipo?</span>
                             <div className="flex gap-2 overflow-x-auto pb-2">
                                {matchedCategory.variants.map((v) => (
                                    <div 
                                        key={v.id}
                                        onClick={() => setSelectedVariant(v)}
                                        className={`flex-shrink-0 w-20 cursor-pointer rounded border-2 p-1 flex flex-col items-center text-center bg-white ${selectedVariant?.id === v.id ? 'border-ozer-500' : 'border-transparent'}`}
                                    >
                                        <img src={v.image} className="w-10 h-10 object-cover rounded mb-1" />
                                        <span className="text-[9px] leading-tight truncate w-full">{v.name}</span>
                                    </div>
                                ))}
                             </div>
                        </div>
                    )}

                    <button type="submit" className="w-full bg-ozer-500 text-white text-sm font-bold py-3 rounded-lg hover:bg-ozer-600 flex items-center justify-center gap-2 mt-4 shadow-md">
                        <Send size={16} />
                        Enviar Preço
                    </button>
                </form>
            )}
        </div>
    )
}
