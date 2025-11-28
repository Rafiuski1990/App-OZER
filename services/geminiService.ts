import { GoogleGenerativeAI } from "@google/generative-ai";
import { ShoppingItem, MarketResult, TransportMode, Coordinates } from "../types";

const ai = new GoogleGenerativeAI(process.env.API_KEY as string);

// Cost constants
const FUEL_COST_PER_KM_CAR = 0.60;
const FUEL_COST_PER_KM_MOTO = 0.25;

// Market data
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

// Average prices
const AVERAGE_PRICES: Record<string, number> = {
  "arroz": 26.90,
  "feijao": 7.49,
  "macarrao": 4.50,
  "oleo": 6.50,
  "carne": 34.90,
  "frango": 15.90,
  "leite": 5.50,
  "cerveja": 4.50,
  "pao": 14.90,
  "banana": 5.90,
  "sabao": 14.90,
  "shampoo": 14.90
};

const normalize = (str: string) =>
  str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

// Haversine formula
export const haversineDistance = (c1: Coordinates, c2: Coordinates) => {
  const R = 6371;
  const dLat = ((c2.latitude - c1.latitude) * Math.PI) / 180;
  const dLon = ((c2.longitude - c1.longitude) * Math.PI) / 180;
  const lat1 = (c1.latitude * Math.PI) / 180;
  const lat2 = (c2.latitude * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.sin(dLon / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);

  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

// Estimated total fallback
const calculateEstimatedTotal = (items: ShoppingItem[]) => {
  let total = 0;
  items.forEach((item) => {
    const key = normalize(item.name);
    const price = AVERAGE_PRICES[key] || 10;
    total += price * item.quantity;
  });
  return total;
};

export const findAndCompareMarkets = async (
  items: ShoppingItem[],
  location: Coordinates,
  transport: TransportMode
): Promise<MarketResult[]> => {
  try {
    const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
      Compare prices dos mercados de Araras-SP.
      Lista: ${items.map((i) => `${i.quantity}x ${i.name}`).join(", ")}
      Localização: ${location.latitude}, ${location.longitude}

      Retorne SOMENTE um JSON no formato:
      [
        {
          "name": "",
          "address": "",
          "productsTotal": 0,
          "distanceKm": 0,
          "timeMinutes": 0,
          "missingItems": []
        }
      ]
    `;

    const result = await model.generateContent(prompt);
    const json = JSON.parse(result.response.text());

    return json.map((r: any, i: number) => ({
      ...r,
      id: `market-${i}`
    }));
  } catch (e) {
    console.log("Erro Gemini, usando fallback:", e);

    const baseTotal = calculateEstimatedTotal(items);

    return ARARAS_MARKETS.map((m) => {
      const dist = haversineDistance(location, {
        latitude: m.lat,
        longitude: m.lng,
      });

      return {
        id: m.id,
        name: m.name,
        address: m.address,
        productsTotal: baseTotal * m.priceFactor,
        distanceKm: dist,
        timeMinutes: Math.round(dist * 2.5 + 5),
        missingItems: [],
        coordinates: { lat: m.lat, lng: m.lng },
        openingTime: m.openingTime,
        closingTime: m.closingTime,
        paymentMethods: m.paymentMethods,
      };
    });
  }
};

export const calculateTripCost = (
  distanceKm: number,
  mode: TransportMode


