import { GoogleGenAI, Type } from "@google/genai";
import { ShoppingItem, MarketResult, TransportMode, Coordinates } from "../types";

const FUEL_COST_PER_KM_CAR = 0.60;
const FUEL_COST_PER_KM_MOTO = 0.25;

// Helper to safely get AI instance
const getAI = () => {
  // In Vite config we polyfilled process.env.API_KEY
  const apiKey = process.env.API_KEY;
  
  if (!apiKey || apiKey === "") {
    console.warn("API Key missing. App will use fallback mode.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

// Real coordinates for Araras Markets for accurate distance calculation
export const ARARAS_MARKETS = [
  {
    id: 'favetta-1',
    name: "Supermercado Favetta (Loja 1 - Centro)",
    address: "R. José Bonifácio, 98 - Centro, Araras - SP",
    lat: -22.3072, 
    lng: -47.3798,
    priceFactor: 1.02, 
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
    priceFactor: 0.90, 
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
    priceFactor: 0.98, 
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
    priceFactor: 0.97, 
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
    priceFactor: 0.92, 
    openingTime: "07:30",
    closingTime: "21:00",
    paymentMethods: ["Crédito", "Débito", "Pix", "Cartão Tonin"]
  }
];

// Average prices database for simulation/fallback (Prices in BRL)
const AVERAGE_PRICES: Record<string, number> = {
  'arroz branco 5': 26.90,
  'arroz branco 1': 6.50,
  'arroz integral': 8.90,
  'arroz': 26.90,
  'feijao carioca': 7.49,
  'feijao preto': 8.90,
  'feijao': 7.49,
  'espaguete': 4.50,
  'parafuso': 4.50,
  'penne': 5.50,
  'macarrao': 4.50,
  'lasanha': 12.90,
  'pizza': 14.90,
  'oleo': 6.50,
  'azeite': 32.90,
  'vinagre': 3.50,
  'sal': 2.50,
  'acucar': 4.90,
  'molho tomate': 2.50,
  'picanha': 69.90,
  'acem': 29.90,
  'patinho': 39.90,
  'contra file': 49.90,
  'carne moida': 24.90,
  'carne': 34.90,
  'peito de frango': 18.90,
  'coxa': 12.90,
  'asinha': 16.90,
  'frango inteiro': 10.90,
  'frango': 15.90,
  'leite': 5.50,
  'manteiga': 11.90,
  'margarina': 6.90,
  'queijo': 8.90,
  'mussarela': 8.90,
  'presunto': 5.50,
  'mortadela': 3.50,
  'requeijao': 7.90,
  'iogurte': 4.50,
  'ovos': 12.00,
  'cerveja': 4.50,
  'refrigerante': 8.90,
  'agua': 2.50,
  'suco': 7.90,
  'cafe': 17.90,
  'pao': 14.90,
  'pao forma': 8.50,
  'biscoito': 3.50,
  'bolo': 12.90,
  'banana': 5.90,
  'maca': 8.90,
  'tomate': 7.90,
  'cebola': 5.90,
  'batata': 6.50,
  'alface': 3.50,
  'fruta': 7.00,
  'sabao': 14.90,
  'detergente': 2.50,
  'amaciante': 12.90,
  'agua sanitaria': 4.50,
  'papel higienico': 18.90,
  'shampoo': 14.90,
  'condicionador': 16.90,
  'sabonete': 2.50,
  'dental': 5.50,
  'desodorante': 13.90,
  'higiene': 10.00
};

const normalize = (str: string) => str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

export const haversineDistance = (coords1: Coordinates, coords2: Coordinates) => {
  const toRad = (x: number) => (x * Math.PI) / 180;
  const R = 6371; 

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

const calculateEstimatedTotal = (items: ShoppingItem[]) => {
    let total = 0;
    items.forEach(item => {
        const normalizedVariant = item.variant ? normalize(item.variant) : '';
        const normalizedName = normalize(item.name);
        
        let priceKey = '';
        if (normalizedVariant) {
            priceKey = Object.keys(AVERAGE_PRICES).find(k => normalizedVariant.includes(k) || k.includes(normalizedVariant)) || '';
        }
        if (!priceKey) {
            priceKey = Object.keys(AVERAGE_PRICES).find(k => normalizedName.includes(k)) || '';
        }

        const price = priceKey ? AVERAGE_PRICES[priceKey] : 10.00; 
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
  const itemListString = items.map(i => {
      const variantText = i.variant ? `(${i.variant})` : '';
      const brandText = i.brand ? `Marca: ${i.brand}` : "Marca: Qualquer";
      return `${i.quantity}x ${i.name} ${variantText} [${brandText}]`;
  }).join(", ");
  
  const prompt = `
    Atue como o back-end inteligente do app "Ozer".
    Contexto: O usuário quer comparar preços nos supermercados de Araras - SP.
    Mercados: Favetta (3 lojas), Atacadão, Delta, Pague Menos, Copacabana, Tonin.
    Lista: ${itemListString}.
    Retorne JSON array.
  `;

  try {
    const ai = getAI();
    // Fallback if no AI key
    if (!ai) throw new Error("API Key missing");

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        // NOTE: Google Maps tool removed as it is incompatible with responseSchema (JSON mode).
        // The prompt context already includes market info.
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
    console.warn("Using Fallback/Simulation Data due to error:", error);
    
    // --- FALLBACK LOGIC ---
    const estimatedBaseTotal = calculateEstimatedTotal(items);

    return ARARAS_MARKETS.map(market => {
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