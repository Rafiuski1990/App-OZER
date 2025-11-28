
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { ShoppingItem, ProductVariant } from '../types';
import { PRODUCT_CATALOG } from '../data';
import { Plus, Trash2, ShoppingCart, ChevronDown, Check, Search } from 'lucide-react';

interface Props {
  items: ShoppingItem[];
  onAddItem: (item: Omit<ShoppingItem, 'id'>) => void;
  onRemoveItem: (id: string) => void;
}

export const ShoppingList: React.FC<Props> = ({ items, onAddItem, onRemoveItem }) => {
  const [name, setName] = useState('');
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [brand, setBrand] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isCustomBrand, setIsCustomBrand] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  
  const customBrandInputRef = useRef<HTMLInputElement>(null);

  // Normalize helper
  const normalize = (str: string) => str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // Update suggestions based on input
  const updateSuggestions = (input: string) => {
      const term = normalize(input);
      if (term.length < 2) {
          setSuggestions([]);
          return;
      }
      // Simple fuzzy search on keys
      const matches = Object.keys(PRODUCT_CATALOG).filter(key => key.includes(term));
      setSuggestions(matches);
  };

  const handleSuggestionClick = (suggestion: string) => {
      setName(suggestion.charAt(0).toUpperCase() + suggestion.slice(1)); // Capitalize visual
      setSuggestions([]);
      // The useEffect below will trigger matchingCategory
  };

  // 1. Identify Product Category from Name
  const matchedCategory = useMemo(() => {
    const term = normalize(name);
    if (term.length < 2) return null;
    
    // Exact match keys first
    const exactMatch = Object.keys(PRODUCT_CATALOG).find(key => term === key || term === key + 's'); 
    if (exactMatch) return { key: exactMatch, ...PRODUCT_CATALOG[exactMatch] };

    // Mapped aliases (simple manual mapping for common terms)
    if (term.includes('creme dental') || term.includes('pasta')) return { key: 'dental', ...PRODUCT_CATALOG['dental'] };
    if (term.includes('escova')) return { key: 'dental', ...PRODUCT_CATALOG['dental'] };
    if (term.includes('fio dental')) return { key: 'dental', ...PRODUCT_CATALOG['dental'] };
    if (term.includes('limpador')) return { key: 'multiuso', ...PRODUCT_CATALOG['multiuso'] };
    if (term.includes('pizza')) return { key: 'legumes congelados', ...PRODUCT_CATALOG['legumes congelados'] }; // Fallback or add new
    if (term.includes('saco')) return { key: 'lixo', ...PRODUCT_CATALOG['lixo'] };

    // Partial match
    const partialKey = Object.keys(PRODUCT_CATALOG).find(key => term.includes(key));
    if (partialKey) return { key: partialKey, ...PRODUCT_CATALOG[partialKey] };
    
    return null;
  }, [name]);

  // Determine which variants to show based on selected brand
  const displayedVariants = useMemo(() => {
    if (!matchedCategory) return [];

    if (brand && brand !== 'outra_custom') {
        const brandDef = matchedCategory.brands.find(b => b.name === brand);
        if (brandDef && brandDef.variants.length > 0) {
            return brandDef.variants;
        }
    }
    // Fallback to generic variants if "Any Brand" is selected or Custom Brand is used
    return matchedCategory.variants;
  }, [matchedCategory, brand]);

  // Reset variant when brand changes
  useEffect(() => {
    setSelectedVariant(null);
  }, [brand]);

  // Handle focus for custom brand
  useEffect(() => {
    if (isCustomBrand && customBrandInputRef.current) {
      customBrandInputRef.current.focus();
    }
  }, [isCustomBrand]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setName(val);
    updateSuggestions(val);
    setSelectedVariant(null);
    setBrand('');
    setIsCustomBrand(false);
  };

  const handleVariantSelect = (variant: ProductVariant) => {
      setSelectedVariant(variant);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    let finalName = name;
    let finalVariant = "";

    if (selectedVariant) {
        // Keep the entered name but store specific variant
        finalVariant = selectedVariant.name;
    }

    const finalBrand = brand === 'outra_custom' ? '' : brand;

    onAddItem({ name: finalName, variant: finalVariant, brand: finalBrand, quantity });
    
    // Reset form
    setName('');
    setSelectedVariant(null);
    setBrand('');
    setQuantity(1);
    setIsCustomBrand(false);
    setSuggestions([]);
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-orange-100">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <ShoppingCart className="text-ozer-500" />
        Sua Lista
      </h2>

      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        
        {/* 1. PRODUCT NAME INPUT + AUTOCOMPLETE */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">Produto</label>
          <div className="relative">
              <input
                type="text"
                value={name}
                onChange={handleNameChange}
                placeholder="Ex: Arroz, Carne, Shampoo..."
                className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ozer-500 focus:border-transparent outline-none transition-all"
                autoComplete="off"
              />
              <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
          </div>

          {/* Autocomplete Dropdown */}
          {suggestions.length > 0 && (
              <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-1 max-h-48 overflow-y-auto">
                  {suggestions.map((suggestion) => (
                      <li 
                        key={suggestion}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="p-3 hover:bg-orange-50 cursor-pointer text-gray-700 border-b border-gray-50 last:border-none capitalize flex items-center justify-between"
                      >
                          {suggestion}
                          <span className="text-xs text-gray-400">Selecionar</span>
                      </li>
                  ))}
              </ul>
          )}
        </div>

        {/* 2. BRAND SELECTION (Moved UP per request) */}
        {matchedCategory && (
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Marca</label>
                
                {!isCustomBrand ? (
                  <div className="relative">
                    <select
                      value={brand}
                      onChange={(e) => {
                        if (e.target.value === 'outra_custom') {
                          setIsCustomBrand(true);
                          setBrand('');
                        } else {
                          setBrand(e.target.value);
                        }
                      }}
                      className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ozer-500 outline-none appearance-none bg-white text-gray-700"
                    >
                      <option value="">Qualquer Marca (Mais barato)</option>
                      {matchedCategory.brands
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map((b) => (
                        <option key={b.name} value={b.name}>{b.name}</option>
                      ))}
                      <option value="outra_custom" className="font-semibold text-ozer-600">+ Outra marca</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500">
                      <ChevronDown size={16} />
                    </div>
                  </div>
                ) : (
                   <div className="relative">
                     <input
                      ref={customBrandInputRef}
                      type="text"
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                      placeholder={isCustomBrand ? "Digite a marca..." : "Marca (Opcional)"}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ozer-500 outline-none"
                      autoComplete="off"
                    />
                    {isCustomBrand && (
                      <button 
                        type="button" 
                        onClick={() => setIsCustomBrand(false)}
                        className="absolute right-2 top-3 text-xs text-ozer-600 underline hover:text-ozer-800"
                      >
                        Voltar
                      </button>
                    )}
                  </div>
                )}
              </div>
              
              <div className="w-24">
                <label className="block text-sm font-medium text-gray-700 mb-1">Qtd</label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ozer-500 outline-none"
                />
              </div>
            </div>
        )}

        {/* 3. SPECIFIC VARIANT SELECTION (Dynamic Images based on Brand) */}
        {matchedCategory && displayedVariants.length > 0 && (
            <div className="animate-fade-in bg-orange-50 p-3 rounded-lg border border-orange-100">
                <label className="block text-sm font-bold text-ozer-700 mb-2">
                    {brand && brand !== 'outra_custom' 
                        ? `Opções de ${brand}:` 
                        : `Escolha o tipo de ${matchedCategory.key}:`}
                </label>
                <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 gap-3">
                    {displayedVariants.map((v) => (
                        <div 
                            key={v.id}
                            onClick={() => handleVariantSelect(v)}
                            className={`
                                cursor-pointer rounded-xl border-2 p-2 flex flex-col items-center justify-between text-center transition-all h-full
                                ${selectedVariant?.id === v.id 
                                    ? 'border-ozer-500 bg-white shadow-lg transform scale-105 ring-2 ring-orange-200 ring-offset-1' 
                                    : 'border-transparent bg-white hover:border-orange-200 shadow-sm'}
                            `}
                        >
                            <div className="w-full h-24 mb-2 bg-white rounded-lg flex items-center justify-center overflow-hidden">
                                <img 
                                    src={v.image} 
                                    alt={v.name} 
                                    className="w-full h-full object-contain" 
                                    loading="lazy"
                                />
                            </div>
                            <span className="text-xs font-bold leading-tight text-gray-700 w-full break-words">
                                {v.name}
                            </span>
                            {selectedVariant?.id === v.id && (
                                <div className="mt-1 text-ozer-600 bg-orange-100 rounded-full p-0.5"><Check size={14} /></div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        )}

        <button
          type="submit"
          disabled={matchedCategory && !selectedVariant}
          className={`w-full font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors
            ${matchedCategory && !selectedVariant 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : 'bg-ozer-500 hover:bg-ozer-600 text-white'}
          `}
        >
          <Plus size={20} />
          Adicionar Item
        </button>
      </form>

      <div className="space-y-2">
        {items.length === 0 && (
          <div className="text-center py-8 text-gray-400 italic bg-gray-50 rounded-lg border border-dashed border-gray-200">
            Sua lista está vazia.
            <br />
            Digite um produto (ex: "Arroz") para ver as opções.
          </div>
        )}
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between bg-orange-50 p-3 rounded-lg border border-orange-100 animate-fade-in">
            <div className="flex items-start gap-3">
                <div className="bg-white p-2 rounded border border-orange-100 hidden sm:block">
                     <ShoppingCart size={16} className="text-ozer-400" />
                </div>
                <div>
                    <div className="font-bold text-gray-800 flex items-center gap-1">
                        <span className="text-ozer-600">{item.quantity}x</span> 
                        {item.name}
                    </div>
                    
                    <div className="text-xs text-gray-600 flex flex-col">
                        {item.variant && (
                             <span className="font-semibold text-gray-700 bg-white px-1 rounded w-fit border border-gray-100 mb-0.5">
                                {item.variant}
                             </span>
                        )}
                        <span className="italic text-gray-500">
                             {item.brand || 'Qualquer marca'}
                        </span>
                    </div>
                </div>
            </div>
            <button
              onClick={() => onRemoveItem(item.id)}
              className="text-red-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-full transition-colors"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
