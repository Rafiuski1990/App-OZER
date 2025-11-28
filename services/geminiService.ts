
import { GoogleGenAI, Type } from "@google/genai";
import { ShoppingItem, MarketResult, TransportMode, Coordinates } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Using a cost constant for simulation if the model doesn't return it perfectly
const FUEL_COST_PER_KM_CAR = 0.60; // R$ 0.60 per km
const FUEL_COST_PER_KM_MOTO = 0.25; // R$ 0.25 per km

// Real coordinates for Araras Markets for accurate distance calculation
export const ARARAS_MARKETS = [
  {
    id: 'favetta-1',
    name: "Supermercado Favetta (Loja 1 - Centro)",
    address: "R. José Bonifácio, 98 - Centro, Araras - SP",
    lat: -22.3072, 
    lng: -47.3798,
    priceFactor: 1.02, // Standard price
    openingTime: "07:30",
    closingTime: "21:00",
    paymentMethods: ["Crédito", "Débito", "Pix", "Vale Alimentação"]
  },
  {
    id: 'favetta-2',
    name: "Supermercado Favetta (Loja 2 - Campinho)",
    address: "Av. Melvin Jones, 1830 - Do Campinho, Araras - SP",
    lat: -22.3245, 
    lng: -47.3542,
    priceFactor: 1.02,
    openingTime: "07:30",
    closingTime: "21:00",
    paymentMethods: ["Crédito", "Débito", "Pix", "Vale Alimentação"]
  },
  {
    id: 'favetta-3',
    name: "Supermercado Favetta (Loja 3 - Jd. José Ometto)",
    address: "Av. Luiz Carlos Tunes, 3700 - Jardim Jose Ometto III, Araras - SP",
    lat: -22.3312, 
    lng: -47.3325,
    priceFactor: 1.03,
    openingTime: "08:00",
    closingTime: "20:00",
    paymentMethods: ["Crédito", "Débito", "Pix", "Vale Alimentação"]
  },
  {
    id: 'atacadao',
    name: "Atacadão Araras",
    address: "Av. Dona Renata, 3215 - Vila Pastorello, Araras - SP",
    lat: -22.3035, 
    lng: -47.3695,
    priceFactor: 0.90, // Wholesale - Cheaper
    openingTime: "07:00",
    closingTime: "22:00",
    paymentMethods: ["Crédito", "Débito", "Pix", "Cartão Atacadão"]
  },
  {
    id: 'delta',
    name: "Delta Supermercados",
    address: "R. Esmeraldas, 18 - Jardim Santa Cruz, Araras - SP",
    lat: -22.3048, 
    lng: -47.3685,
    priceFactor: 0.98, // Competitive
    openingTime: "08:00",
    closingTime: "22:00",
    paymentMethods: ["Crédito", "Débito", "Pix", "Vale Alimentação", "Ticket"]
  },
  {
    id: 'pague-menos',
    name: "Supermercados Pague Menos",
    address: "Av. Dona Renata, 1075 - Vila Michelin, Araras - SP",
    lat: -22.3160, 
    lng: -47.3810,
    priceFactor: 0.97, // Competitive
    openingTime: "07:30",
    closingTime: "22:00",
    paymentMethods: ["Crédito", "Débito", "Pix", "Vale Alimentação"]
  },
  {
    id: 'copacabana',
    name: "Supermercado Copacabana",
    address: "Rua José Antônio Cressoni, 119 - Jardim Copacabana, Araras - SP",
    lat: -22.2865, 
    lng: -47.3762,
    priceFactor: 1.01,
    openingTime: "08:00",
    closingTime: "20:00",
    paymentMethods: ["Crédito", "Débito", "Pix"]
  },
  {
    id: 'tonin',
    name: "Superatacado Tonin",
    address: "Avenida Horacio Krepischi, 651, Araras - SP",
    lat: -22.3360, 
    lng: -47.3690,
    priceFactor: 0.92, // Wholesale - Cheaper
    openingTime: "07:30",
    closingTime: "21:00",
    paymentMethods: ["Crédito", "Débito", "Pix", "Cartão Tonin"]
  }
];

// Average prices database for simulation/fallback (Prices in BRL)
// Keys must match the normalized keys used in ShoppingList.tsx or variants
const AVERAGE_PRICES: Record<string, number> = {
  // Arroz variants
  'arroz branco 5': 26.90,
  'arroz branco 1': 6.50,
  'arroz integral': 8.90,
  'arroz': 26.90,

  // Feijao variants
  'feijao carioca': 7.49,
  'feijao preto': 8.90,
  'feijao': 7.49,

  // Carne variants
  'picanha': 69.90,
  'acem': 29.90,
  'patinho': 39.90,
  'contra file': 49.90,
  'carne moida': 24.90,
  'carne': 34.90,

  // Frango variants
  'peito de frango': 18.90,
  'coxa': 12.90,
  'asinha': 16.90,
  'frango inteiro': 10.90,
  'frango': 15.90,
  'linguica': 19.90,
  'peixe': 29.90,

  // Bebidas
  'lata 350': 3.99,
  'latao': 4.99,
  'long neck': 5.50,
  'cerveja': 4.50,
  'refrigerante 2l': 8.90,
  'refrigerante': 8.90,
  'agua': 2.50,
  'suco': 8.90,
  'cha': 5.90,
  'achocolatado': 9.90,

  // Café
  'cafe po': 17.90,
  'capsula': 22.90,

  // Hygiene
  'shampoo': 14.90,
  'condicionador': 16.90,
  'sabonete': 2.50,
  'creme dental': 5.20,
  'escova': 12.90,
  'fio dental': 9.90,
  'desodorante': 13.90,

  // Cleaning
  'sabao po': 13.90,
  'liquido': 14.90,
  'detergente': 2.19,
  'amaciante': 11.90,
  'desinfetante': 7.50,
  'agua sanitaria': 4.50,
  'limpador': 5.90,
  'multiuso': 5.90,
  'esponja': 4.50,
  'lixo': 12.90,
  'papel toalha': 5.90,
  'papel higienico': 21.90,

  // Padaria / Mercearia
  'pao frances': 14.90, // kg
  'pao forma': 8.50,
  'bolo': 12.90,
  'torrada': 5.50,
  'macarrao': 4.50,
  'oleo': 6.20,
  'azeite': 29.90,
  'acucar': 4.89,
  'sal': 2.50,
  'aveia': 6.50,
  'pipoca': 4.90,
  'granola': 18.90,
  'molho tomate': 2.20,
  'ketchup': 10.90,
  'mostarda': 8.90,
  'maionese': 7.90,
  'biscoito': 3.50,
  'chocolate': 6.50,
  'geleia': 16.90,
  'balas': 3.50,
  'salgadinho': 8.90,

  // Hortifruti / Frios
  'tomate': 8.90,
  'alface': 3.50,
  'cebola': 5.90,
  'batata': 6.50,
  'cenoura': 4.90,
  'maca': 9.90,
  'banana': 5.90,
  'laranja': 3.90,
  'presunto': 5.50, // 100g approx in list logic, but usually sold by kg. Adjusted for unit pack simulation
  'queijo': 8.90,
  'mortadela': 3.50,
  'manteiga': 11.90,
  'margarina': 6.90,
  'iogurte': 4.20,
  'sorvete': 24.90,
  'pizza': 14.90,
  'legumes congelados': 12.90
};

// Helper to normalize strings for key lookup
const normalize = (str: string) => str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

// Calculate distance between two coordinates in km (Haversine formula)
export const haversineDistance = (coords1: Coordinates, coords2: Coordinates) => {
  const toRad = (x: number) => (x * Math.PI) / 180;
  const R = 6371; // Radius of Earth in km

  const dLat = toRad(coords2.latitude - coords1.latitude);
  const dLon = toRad(coords2.longitude - coords1.longitude);
  const lat1 = toRad(coords1.latitude);
  const lat2 = toRad(coords2.latitude);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};

// Helper to calculate total based on average prices
const calculateEstimatedTotal = (items: ShoppingItem[]) => {
    let total = 0;
    items.forEach(item => {
        // Try to match variant first, then name
        const normalizedVariant = item.variant ? normalize(item.variant) : '';
        const normalizedName = normalize(item.name);
        
        let priceKey = '';
        
        // 1. Exact variant match search in keys (e.g. 'pao frances')
        if (normalizedVariant) {
            priceKey = Object.keys(AVERAGE_PRICES).find(k => normalizedVariant.includes(k) || k.includes(normalizedVariant)) || '';
        }

        // 2. Fallback to name match (e.g. 'carne')
        if (!priceKey) {
            priceKey = Object.keys(AVERAGE_PRICES).find(k => normalizedName.includes(k)) || '';
        }

        const price = priceKey ? AVERAGE_PRICES[priceKey] : 10.00; // Default fallback R$ 10.00
        total += price * item.quantity;
    });
    return total;
};

export const findAndCompareMarkets = async (
  items: ShoppingItem[],
  location: Coordinates,
  transport: TransportMode
): Promise<MarketResult[]> => {
  
  const modelId = "gemini-2.5-flash"; 
  
  // Format items including variants
  const itemListString = items.map(i => {
      const variantText = i.variant ? `(${i.variant})` : '';
      const brandText = i.brand ? `Marca: ${i.brand}` : "Marca: Qualquer";
      return `${i.quantity}x ${i.name} ${variantText} [${brandText}]`;
  }).join(", ");
  
  // Specific prompt context for Araras, SP
  const prompt = `
    Atue como o back-end inteligente do app "Ozer".
    
    Contexto: O usuário quer comparar preços nos supermercados de Araras - SP.
    Mercados cadastrados: Favetta (3 lojas), Atacadão, Delta, Pague Menos, Copacabana, Tonin.
    Localização do Usuário: Latitude ${location.latitude}, Longitude ${location.longitude}.
    Lista de compras: ${itemListString}.
    Modo de transporte: ${transport}.

    INSTRUÇÕES:
    1. Considere especificidades do produto (Picanha é mais caro que Acém).
    2. Calcule a distância real usando os endereços conhecidos de Araras.
    3. Retorne um JSON com a estimativa.

    Retorne APENAS um JSON array.
    Schema do JSON:
    [
      {
        "name": "Nome do Supermercado",
        "address": "Endereço em Araras SP",
        "productsTotal": (número, valor total estimado em Reais),
        "distanceKm": (número, distancia real da localização do usuário até o mercado),
        "timeMinutes": (número, tempo estimado de deslocamento ida),
        "missingItems": (array de strings, nomes dos produtos em falta)
      }
    ]
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        tools: [{ googleMaps: {} }],
        toolConfig: {
            retrievalConfig: {
                latLng: {
                    latitude: location.latitude,
                    longitude: location.longitude
                }
            }
        },
        responseMimeType: "application/json",
        responseSchema: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING },
                    address: { type: Type.STRING },
                    productsTotal: { type: Type.NUMBER },
                    distanceKm: { type: Type.NUMBER },
                    timeMinutes: { type: Type.NUMBER },
                    missingItems: { type: Type.ARRAY, items: { type: Type.STRING } }
                }
            }
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    const results = JSON.parse(text) as Omit<MarketResult, 'id'>[];
    
    return results.map((r, index) => {
        // Try to find matching hardcoded market data to enrich AI response with hours/payment
        const matchingMarket = ARARAS_MARKETS.find(m => m.name.includes(r.name) || r.name.includes(m.name) || normalize(r.address).includes(normalize(m.address)));
        
        return {
            ...r,
            id: `market-${index}`,
            openingTime: matchingMarket?.openingTime,
            closingTime: matchingMarket?.closingTime,
            paymentMethods: matchingMarket?.paymentMethods
        };
    });

  } catch (error) {
    console.error("Gemini API Error (using Araras fallback data):", error);
    
    // --- FALLBACK / SIMULATION LOGIC WITH REAL DISTANCE CALCULATION ---
    const estimatedBaseTotal = calculateEstimatedTotal(items);

    return ARARAS_MARKETS.map(market => {
      // Calculate real distance from user to this market
      const distance = haversineDistance(location, { latitude: market.lat, longitude: market.lng });
      
      const minPerKm = distance > 20 ? 1 : 2.5;
      const timeEst = Math.round(distance * minPerKm + 5);

      const missing: string[] = [];
      if (market.id === 'copacabana' && items.length > 5) {
         missing.push(items[items.length - 1].name);
      }

      return {
        id: market.id,
        name: market.name,
        address: market.address,
        // Apply market price factor + small random variation (0-2%) for realism
        productsTotal: (estimatedBaseTotal * market.priceFactor) * (1 + Math.random() * 0.02),
        distanceKm: distance,
        timeMinutes: timeEst,
        missingItems: missing,
        coordinates: { lat: market.lat, lng: market.lng },
        openingTime: market.openingTime,
        closingTime: market.closingTime,
        paymentMethods: market.paymentMethods
      };
    });
  }
};

export const calculateTripCost = (distanceKm: number, mode: TransportMode): number => {
    const roundTrip = distanceKm * 2;
    switch (mode) {
        case TransportMode.CAR:
            return roundTrip * FUEL_COST_PER_KM_CAR;
        case TransportMode.MOTO:
            return roundTrip * FUEL_COST_PER_KM_MOTO;
        case TransportMode.WALK:
            return 0;
        default:
            return 0;
    }
}
