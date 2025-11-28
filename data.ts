
import { ProductDefinition, ProductVariant } from './types';

// --- HELPERS PARA IMAGENS ---

// Static reliable Unsplash images to avoid redirects and CSP violations
const IMAGES = {
  meat: 'https://images.unsplash.com/photo-1603048297172-c92544798d5e?auto=format&fit=crop&q=80&w=400',
  rice: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=400',
  beer: 'https://images.unsplash.com/photo-1623594215038-d621c172d734?auto=format&fit=crop&q=80&w=400',
  milk: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&q=80&w=400',
  bread: 'https://images.unsplash.com/photo-1598373182133-52452f7691ef?auto=format&fit=crop&q=80&w=400',
  eggs: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&q=80&w=400',
  oil: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=400',
  coffee: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=400',
  detergent: 'https://images.unsplash.com/photo-1585833555201-9f57d692875b?auto=format&fit=crop&q=80&w=400',
  fruits: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=400',
  veggies: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&q=80&w=400',
  pasta: 'https://images.unsplash.com/photo-1598965402089-897ce52e8355?auto=format&fit=crop&q=80&w=400',
  cleaning: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&q=80&w=400',
  generic: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=400'
};

// Helper to get safe images
const getImg = (keyword: string) => {
    // Map keywords to safe images
    if (keyword.includes('rice') || keyword.includes('arroz')) return IMAGES.rice;
    if (keyword.includes('bean') || keyword.includes('feijao')) return 'https://images.unsplash.com/photo-1551463695-46c5354e7d4d?auto=format&fit=crop&q=80&w=400';
    if (keyword.includes('meat') || keyword.includes('carne') || keyword.includes('picanha')) return IMAGES.meat;
    if (keyword.includes('beer') || keyword.includes('cerveja')) return IMAGES.beer;
    if (keyword.includes('milk') || keyword.includes('leite')) return IMAGES.milk;
    if (keyword.includes('bread') || keyword.includes('pao')) return IMAGES.bread;
    if (keyword.includes('egg') || keyword.includes('ovo')) return IMAGES.eggs;
    if (keyword.includes('oil') || keyword.includes('oleo')) return IMAGES.oil;
    if (keyword.includes('coffee') || keyword.includes('cafe')) return IMAGES.coffee;
    if (keyword.includes('detergent')) return IMAGES.detergent;
    if (keyword.includes('fruit')) return IMAGES.fruits;
    if (keyword.includes('veg')) return IMAGES.veggies;
    return IMAGES.generic;
};

// --- MERCEARIA BÁSICA ---

const createRiceVariants = (): ProductVariant[] => [
  { id: 'branco5', name: 'Branco 5kg', image: IMAGES.rice }, // Fixed ID for promos
  { id: '1kg', name: 'Branco 1kg', image: IMAGES.rice },
  { id: 'integral', name: 'Integral 1kg', image: 'https://images.unsplash.com/photo-1598218684705-d143c08b4952?auto=format&fit=crop&q=80&w=400' },
  { id: 'parboilizado', name: 'Parboilizado 5kg', image: IMAGES.rice }
];

const createBeanVariants = (): ProductVariant[] => [
  { id: 'carioca', name: 'Carioca 1kg', image: 'https://images.unsplash.com/photo-1551463695-46c5354e7d4d?auto=format&fit=crop&q=80&w=400' },
  { id: 'preto', name: 'Preto 1kg', image: 'https://images.unsplash.com/photo-1633887012275-3b91ba3b5168?auto=format&fit=crop&q=80&w=400' }
];

const createOilVariants = (): ProductVariant[] => [
    { id: 'soja', name: 'Óleo de Soja 900ml', image: IMAGES.oil },
    { id: 'milho', name: 'Óleo de Milho', image: IMAGES.oil },
    { id: 'canola', name: 'Óleo de Canola', image: IMAGES.oil }
];

const createCoffeeVariants = (): ProductVariant[] => [
    { id: 'po_500', name: 'Em Pó 500g', image: IMAGES.coffee },
    { id: 'capsula', name: 'Cápsulas (10un)', image: 'https://images.unsplash.com/photo-1621360841011-2092c730e704?auto=format&fit=crop&q=80&w=400' },
    { id: 'extra_forte', name: 'Extra Forte 500g', image: IMAGES.coffee }
];

const createSugarVariants = (): ProductVariant[] => [
    { id: 'refinado', name: 'Refinado 1kg', image: 'https://images.unsplash.com/photo-1581441363689-1f3c3c414635?auto=format&fit=crop&q=80&w=400' },
    { id: 'cristal', name: 'Cristal 5kg', image: 'https://images.unsplash.com/photo-1612089531872-ea88d46294d8?auto=format&fit=crop&q=80&w=400' },
    { id: 'demerara', name: 'Demerara', image: 'https://images.unsplash.com/photo-1585226776495-971c0800539c?auto=format&fit=crop&q=80&w=400' }
];

const createPastaVariants = (): ProductVariant[] => [
    { id: 'espaguete', name: 'Espaguete 500g', image: IMAGES.pasta },
    { id: 'parafuso', name: 'Parafuso 500g', image: 'https://images.unsplash.com/photo-1551462147-37885acc36f1?auto=format&fit=crop&q=80&w=400' },
    { id: 'penne', name: 'Penne', image: 'https://images.unsplash.com/photo-1611270629569-8b357cb88da9?auto=format&fit=crop&q=80&w=400' }
];

// --- LATICÍNIOS & PADARIA ---

const createMilkVariants = (): ProductVariant[] => [
    { id: 'integral', name: 'Integral 1L', image: IMAGES.milk },
    { id: 'desnatado', name: 'Desnatado 1L', image: IMAGES.milk },
    { id: 'semi', name: 'Semi-Desnatado 1L', image: IMAGES.milk },
    { id: 'po', name: 'Em Pó (Lata)', image: 'https://images.unsplash.com/photo-1634629377227-2c2448ec889a?auto=format&fit=crop&q=80&w=400' }
];

const createCheeseVariants = (): ProductVariant[] => [
    { id: 'mussarela_fatiada', name: 'Mussarela Fatiada (150g)', image: 'https://images.unsplash.com/photo-1582236895392-f045095d3a57?auto=format&fit=crop&q=80&w=400' },
    { id: 'prato', name: 'Queijo Prato (150g)', image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&q=80&w=400' },
    { id: 'minas', name: 'Queijo Minas Frescal', image: 'https://images.unsplash.com/photo-1599335441584-601e389df012?auto=format&fit=crop&q=80&w=400' },
    { id: 'requeijao', name: 'Requeijão Copo', image: 'https://images.unsplash.com/photo-1624806992066-5ffcf519848f?auto=format&fit=crop&q=80&w=400' }
];

const createYogurtVariants = (): ProductVariant[] => [
    { id: 'natural', name: 'Natural 170g', image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&q=80&w=400' },
    { id: 'morango', name: 'Polpa Morango (Bandeja)', image: 'https://images.unsplash.com/photo-1571212515416-f223d6385720?auto=format&fit=crop&q=80&w=400' },
    { id: 'grego', name: 'Grego', image: 'https://images.unsplash.com/photo-1551062635-4309a41c107f?auto=format&fit=crop&q=80&w=400' }
];

const createBreadVariants = (): ProductVariant[] => [
    { id: 'frances', name: 'Pão Francês (Unidade)', image: IMAGES.bread },
    { id: 'forma_trad', name: 'Pão de Forma Tradicional', image: 'https://images.unsplash.com/photo-1619535860434-7f0863384d41?auto=format&fit=crop&q=80&w=400' },
    { id: 'forma_int', name: 'Pão de Forma Integral', image: 'https://images.unsplash.com/photo-1509440159596-0249088b7280?auto=format&fit=crop&q=80&w=400' }
];

// --- CARNES & FRIOS ---

const createMeatVariants = (): ProductVariant[] => [
  { id: 'kg', name: 'Peça/Kg', image: IMAGES.meat },
  { id: 'fatiado', name: 'Bifes/Fatiado', image: 'https://images.unsplash.com/photo-1551028150-64b9f398f678?auto=format&fit=crop&q=80&w=400' },
  { id: 'moida', name: 'Carne Moída 500g', image: 'https://images.unsplash.com/photo-1594041680534-e8c8cdebd659?auto=format&fit=crop&q=80&w=400' },
  { id: 'picanha', name: 'Picanha', image: 'https://images.unsplash.com/photo-1558030006-4b50986dc576?auto=format&fit=crop&q=80&w=400' }
];

const createChickenVariants = (): ProductVariant[] => [
    { id: 'peito_file', name: 'Filé de Peito 1kg', image: 'https://images.unsplash.com/photo-1612077330269-788066d5a58b?auto=format&fit=crop&q=80&w=400' },
    { id: 'inteiro', name: 'Frango Inteiro', image: 'https://images.unsplash.com/photo-1518492104633-130d0cc84637?auto=format&fit=crop&q=80&w=400' },
    { id: 'coxa', name: 'Coxa e Sobrecoxa', image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&q=80&w=400' }
];

const createColdCutsVariants = (): ProductVariant[] => [
    { id: 'presunto', name: 'Presunto Fatiado (100g)', image: 'https://images.unsplash.com/photo-1605307373809-56d78a846176?auto=format&fit=crop&q=80&w=400' },
    { id: 'mortadela', name: 'Mortadela (100g)', image: 'https://images.unsplash.com/photo-1589173322238-6b196883e390?auto=format&fit=crop&q=80&w=400' },
    { id: 'peito_peru', name: 'Peito de Peru (100g)', image: 'https://images.unsplash.com/photo-1609123896229-873b88934446?auto=format&fit=crop&q=80&w=400' }
];

// --- BEBIDAS ---

const createBeerVariants = (): ProductVariant[] => [
  { id: 'lata350', name: 'Lata 350ml', image: IMAGES.beer },
  { id: 'latao', name: 'Latão 473ml', image: IMAGES.beer },
  { id: 'longneck', name: 'Long Neck 330ml', image: 'https://images.unsplash.com/photo-1618885472179-5e474019f2a9?auto=format&fit=crop&q=80&w=400' },
  { id: '600ml', name: 'Garrafa 600ml', image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&q=80&w=400' }
];

const createSodaVariants = (): ProductVariant[] => [
    { id: '2l', name: 'Garrafa 2 Litros', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=400' },
    { id: 'lata', name: 'Lata 350ml', image: 'https://images.unsplash.com/photo-1622483767128-3a8e21753cb1?auto=format&fit=crop&q=80&w=400' },
    { id: 'zero', name: 'Versão Zero/Light', image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?auto=format&fit=crop&q=80&w=400' }
];

// --- LIMPEZA & HIGIENE ---

const createLaundryVariants = (): ProductVariant[] => [
    { id: 'po', name: 'Sabão em Pó 800g/1kg', image: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?auto=format&fit=crop&q=80&w=400' },
    { id: 'liquido', name: 'Sabão Líquido 3L', image: 'https://images.unsplash.com/photo-1585833555201-9f57d692875b?auto=format&fit=crop&q=80&w=400' },
    { id: 'amaciante', name: 'Amaciante 2L', image: 'https://images.unsplash.com/photo-1584634731339-252c581abfc5?auto=format&fit=crop&q=80&w=400' }
];

const createCleaningVariants = (): ProductVariant[] => [
    { id: 'detergente', name: 'Detergente 500ml', image: IMAGES.detergent },
    { id: 'desinfetante', name: 'Desinfetante', image: 'https://images.unsplash.com/photo-1584634731339-252c581abfc5?auto=format&fit=crop&q=80&w=400' },
    { id: 'agua_sanitaria', name: 'Água Sanitária 2L', image: 'https://images.unsplash.com/photo-1585833555201-9f57d692875b?auto=format&fit=crop&q=80&w=400' }
];

const createPersonalCareVariants = (): ProductVariant[] => [
    { id: 'shampoo', name: 'Shampoo', image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&q=80&w=400' },
    { id: 'condicionador', name: 'Condicionador', image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&q=80&w=400' },
    { id: 'sabonete', name: 'Sabonete Barra', image: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&q=80&w=400' },
    { id: 'dental', name: 'Creme Dental', image: 'https://images.unsplash.com/photo-1559591937-e1dc329ef226?auto=format&fit=crop&q=80&w=400' },
    { id: 'desodorante', name: 'Desodorante', image: 'https://images.unsplash.com/photo-1616688587635-4e782d8c3639?auto=format&fit=crop&q=80&w=400' }
];

const createToiletPaperVariants = (): ProductVariant[] => [
    { id: 'f_dupla_12', name: 'Folha Dupla 12 Rolos', image: 'https://images.unsplash.com/photo-1584622956247-4c8d7b0553db?auto=format&fit=crop&q=80&w=400' },
    { id: 'f_dupla_4', name: 'Folha Dupla 4 Rolos', image: 'https://images.unsplash.com/photo-1584622956247-4c8d7b0553db?auto=format&fit=crop&q=80&w=400' }
];

// --- HORTIFRUTI ---

const createFruitVariants = (): ProductVariant[] => [
    { id: 'kg', name: 'Preço por Kg', image: IMAGES.fruits },
    { id: 'unidade', name: 'Unidade/Bandeja', image: IMAGES.fruits }
];

const createVegVariants = (): ProductVariant[] => [
    { id: 'kg', name: 'Preço por Kg', image: IMAGES.veggies },
    { id: 'bandeja', name: 'Bandeja/Embalado', image: IMAGES.veggies }
];


// ==========================================
// CATÁLOGO GIGANTE UNIFICADO
// ==========================================

export const PRODUCT_CATALOG: Record<string, ProductDefinition> = {
  // === MERCEARIA BÁSICA ===
  'arroz': {
    variants: createRiceVariants(),
    brands: [
      { name: 'Camil', variants: createRiceVariants() },
      { name: 'Tio João', variants: createRiceVariants() },
      { name: 'Prato Fino', variants: createRiceVariants() },
      { name: 'Fantástico', variants: createRiceVariants() }
    ]
  },
  'feijao': {
    variants: createBeanVariants(),
    brands: [
        { name: 'Camil', variants: createBeanVariants() },
        { name: 'Kicaldo', variants: createBeanVariants() },
        { name: 'Broto Legal', variants: createBeanVariants() }
    ]
  },
  'macarrao': {
      variants: createPastaVariants(),
      brands: [
          { name: 'Galo', variants: createPastaVariants() },
          { name: 'Adria', variants: createPastaVariants() },
          { name: 'Renata', variants: createPastaVariants() },
          { name: 'Barilla', variants: createPastaVariants() }
      ]
  },
  'oleo': {
      variants: createOilVariants(),
      brands: [
          { name: 'Liza', variants: createOilVariants() },
          { name: 'Soya', variants: createOilVariants() },
          { name: 'Concórdia', variants: createOilVariants() }
      ]
  },
  'acucar': {
      variants: createSugarVariants(),
      brands: [
          { name: 'União', variants: createSugarVariants() },
          { name: 'Da Barra', variants: createSugarVariants() },
          { name: 'Caravelas', variants: createSugarVariants() }
      ]
  },
  'sal': {
      variants: [{id:'1kg', name:'1kg', image: 'https://images.unsplash.com/photo-1518110925495-569698b4f9f1?auto=format&fit=crop&q=80&w=400'}],
      brands: [{name: 'Cisne', variants:[{id:'1kg', name:'Refinado 1kg', image:'https://images.unsplash.com/photo-1518110925495-569698b4f9f1?auto=format&fit=crop&q=80&w=400'}]}]
  },
  'cafe': {
      variants: createCoffeeVariants(),
      brands: [
          { name: 'Pilão', variants: createCoffeeVariants() },
          { name: '3 Corações', variants: createCoffeeVariants() },
          { name: 'Melitta', variants: createCoffeeVariants() },
          { name: 'Caboclo', variants: createCoffeeVariants() }
      ]
  },
  'farinha': {
      variants: [{id: 'trigo', name:'Trigo 1kg', image: 'https://images.unsplash.com/photo-1627460980594-e362e0802c65?auto=format&fit=crop&q=80&w=400'}, {id: 'mandioca', name: 'Mandioca', image: 'https://images.unsplash.com/photo-1627460980594-e362e0802c65?auto=format&fit=crop&q=80&w=400'}],
      brands: [{name: 'Dona Benta', variants: [{id: 'trigo', name:'Trigo 1kg', image: 'https://images.unsplash.com/photo-1627460980594-e362e0802c65?auto=format&fit=crop&q=80&w=400'}]}, {name: 'Renata', variants: [{id: 'trigo', name:'Trigo 1kg', image: 'https://images.unsplash.com/photo-1627460980594-e362e0802c65?auto=format&fit=crop&q=80&w=400'}]}]
  },
  'molho tomate': {
      variants: [{id: 'sache', name:'Sachê 340g', image: 'https://images.unsplash.com/photo-1579207860166-d3c2a23330f8?auto=format&fit=crop&q=80&w=400'}],
      brands: [{name: 'Pomarola', variants: [{id: 'sache', name:'Tradicional Sachê', image: 'https://images.unsplash.com/photo-1579207860166-d3c2a23330f8?auto=format&fit=crop&q=80&w=400'}]}, {name: 'Elefante', variants: [{id: 'lata', name:'Lata', image: 'https://images.unsplash.com/photo-1579207860166-d3c2a23330f8?auto=format&fit=crop&q=80&w=400'}]}]
  },

  // === LATICÍNIOS & FRIOS ===
  'leite': {
      variants: createMilkVariants(),
      brands: [
          { name: 'Parmalat', variants: createMilkVariants() },
          { name: 'Piracanjuba', variants: createMilkVariants() },
          { name: 'Itambé', variants: createMilkVariants() },
          { name: 'Líder', variants: createMilkVariants() }
      ]
  },
  'manteiga': {
      variants: [{id: 'pote', name: 'Pote 200g', image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&q=80&w=400'}, {id: 'barra', name: 'Barra', image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&q=80&w=400'}],
      brands: [{name: 'Aviação', variants:[{id: 'pote', name: 'Pote 200g', image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&q=80&w=400'}]}, {name: 'Batavo', variants:[{id: 'pote', name: 'Pote 200g', image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&q=80&w=400'}]}]
  },
  'margarina': {
      variants: [{id: '500g', name:'500g', image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&q=80&w=400'}],
      brands: [{name: 'Qualy', variants:[{id: '500g', name:'500g', image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&q=80&w=400'}]}, {name: 'Doriana', variants:[{id: '500g', name:'500g', image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&q=80&w=400'}]}]
  },
  'queijo': {
      variants: createCheeseVariants(),
      brands: [{name: 'Sadia', variants: createCheeseVariants()}, {name: 'President', variants: createCheeseVariants()}, {name: 'Polenghi', variants: createCheeseVariants()}]
  },
  'iogurte': {
      variants: createYogurtVariants(),
      brands: [{name: 'Danone', variants: createYogurtVariants()}, {name: 'Vigor', variants: createYogurtVariants()}, {name: 'Nestlé', variants: createYogurtVariants()}]
  },
  'ovos': {
      variants: [{id: 'duzia', name: 'Dúzia (12 un)', image: IMAGES.eggs}, {id: 'cartela', name: 'Cartela (30 un)', image: IMAGES.eggs}],
      brands: [{name: 'Granja Local', variants: [{id: 'duzia', name: 'Dúzia Branco', image: IMAGES.eggs}]}, {name: 'Mantiqueira', variants: [{id: 'duzia', name: 'Ovos Vermelhos', image: IMAGES.eggs}]}]
  },
  'presunto': {
      variants: createColdCutsVariants(),
      brands: [{name: 'Sadia', variants: createColdCutsVariants()}, {name: 'Seara', variants: createColdCutsVariants()}, {name: 'Perdigão', variants: createColdCutsVariants()}]
  },

  // === PADARIA ===
  'pao': {
      variants: createBreadVariants(),
      brands: [{name: 'Pullman', variants: createBreadVariants()}, {name: 'Seven Boys', variants: createBreadVariants()}, {name: 'Bauducco', variants: createBreadVariants()}, {name: 'Padaria Própria', variants: [{id:'frances', name:'Pão Francês Fresco', image: IMAGES.bread}]}]
  },
  'biscoito': {
      variants: [{id: 'recheado', name: 'Recheado', image: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&q=80&w=400'}, {id: 'salgado', name: 'Água e Sal', image: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&q=80&w=400'}],
      brands: [{name: 'Bauducco', variants:[{id: 'recheado', name: 'Recheado', image: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&q=80&w=400'}]}, {name: 'Nestlé', variants:[{id: 'recheado', name: 'Passatempo', image: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&q=80&w=400'}]}, {name: 'Mabel', variants:[{id: 'rosquinha', name: 'Rosquinha', image: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&q=80&w=400'}]}]
  },

  // === CARNES ===
  'carne': {
    variants: createMeatVariants(),
    brands: [
      { name: 'Friboi', variants: createMeatVariants() },
      { name: 'Maturatta', variants: [{ id: 'bbq', name: 'Peça Churrasco', image: 'https://images.unsplash.com/photo-1606213941427-463d12d4a5b4?auto=format&fit=crop&q=80&w=400' }] },
      { name: 'Swift', variants: createMeatVariants() },
      { name: 'Açougue Local', variants: [{ id: 'fresco', name: 'Corte Fresco', image: IMAGES.meat }] }
    ]
  },
  'frango': {
    variants: createChickenVariants(),
    brands: [
        { name: 'Sadia', variants: createChickenVariants()},
        { name: 'Seara', variants: createChickenVariants()},
        { name: 'Perdigão', variants: createChickenVariants()}
    ]
  },
  'peixe': {
      variants: [{id: 'file', name: 'Filé de Tilápia', image: 'https://images.unsplash.com/photo-1517409425167-a690041d830b?auto=format&fit=crop&q=80&w=400'}, {id: 'posta', name: 'Posta', image: 'https://images.unsplash.com/photo-1517409425167-a690041d830b?auto=format&fit=crop&q=80&w=400'}],
      brands: [{name: 'Costa Sul', variants:[{id: 'file', name: 'Filé 500g', image: 'https://images.unsplash.com/photo-1517409425167-a690041d830b?auto=format&fit=crop&q=80&w=400'}]}, {name: 'Peixaria', variants:[{id: 'fresco', name: 'Peixe Fresco', image: 'https://images.unsplash.com/photo-1517409425167-a690041d830b?auto=format&fit=crop&q=80&w=400'}]}]
  },

  // === BEBIDAS ===
  'cerveja': {
      variants: createBeerVariants(),
      brands: [
          { name: 'Heineken', variants: createBeerVariants() },
          { name: 'Amstel', variants: createBeerVariants() },
          { name: 'Brahma', variants: createBeerVariants() },
          { name: 'Skol', variants: createBeerVariants() },
          { name: 'Spaten', variants: createBeerVariants() }
      ]
  },
  'refrigerante': {
      variants: createSodaVariants(),
      brands: [
          { name: 'Coca-Cola', variants: createSodaVariants() },
          { name: 'Guaraná Antarctica', variants: createSodaVariants() },
          { name: 'Pepsi', variants: createSodaVariants() },
          { name: 'Fanta', variants: createSodaVariants() }
      ]
  },
  'agua': {
      variants: [{id: '500ml', name: '500ml', image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&q=80&w=400'}, {id: '15l', name: '1.5 Litros', image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&q=80&w=400'}],
      brands: [{name: 'Bonafont', variants:[{id: '500ml', name: '500ml', image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&q=80&w=400'}]}, {name: 'Crystal', variants:[{id: '500ml', name: '500ml', image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&q=80&w=400'}]}]
  },
  'suco': {
      variants: [{id: '1l', name: 'Caixa 1L', image: 'https://images.unsplash.com/photo-1603569283847-aa295f0d016a?auto=format&fit=crop&q=80&w=400'}],
      brands: [{name: 'Del Valle', variants:[{id: '1l', name: 'Néctar 1L', image: 'https://images.unsplash.com/photo-1603569283847-aa295f0d016a?auto=format&fit=crop&q=80&w=400'}]}, {name: 'Maguary', variants: [{id: '1l', name: 'Néctar 1L', image: 'https://images.unsplash.com/photo-1603569283847-aa295f0d016a?auto=format&fit=crop&q=80&w=400'}]}]
  },

  // === LIMPEZA ===
  'sabao': {
      variants: createLaundryVariants(),
      brands: [
          { name: 'Omo', variants: createLaundryVariants() },
          { name: 'Brilhante', variants: createLaundryVariants() },
          { name: 'Tixan', variants: createLaundryVariants() }
      ]
  },
  'detergente': {
      variants: createCleaningVariants(),
      brands: [{name: 'Ypê', variants: createCleaningVariants()}, {name: 'Limpol', variants: createCleaningVariants()}]
  },
  'papel higienico': {
      variants: createToiletPaperVariants(),
      brands: [{name: 'Neve', variants: createToiletPaperVariants()}, {name: 'Personal', variants: createToiletPaperVariants()}]
  },

  // === HIGIENE ===
  'shampoo': {
      variants: createPersonalCareVariants(),
      brands: [{name: 'Dove', variants: createPersonalCareVariants()}, {name: 'Pantene', variants: createPersonalCareVariants()}, {name: 'Seda', variants: createPersonalCareVariants()}]
  },
  'dental': {
      variants: [{id:'90g', name:'Tubo 90g', image:'https://images.unsplash.com/photo-1559591937-e1dc329ef226?auto=format&fit=crop&q=80&w=400'}],
      brands: [{name:'Colgate', variants:[{id:'90g', name:'Total 12', image:'https://images.unsplash.com/photo-1559591937-e1dc329ef226?auto=format&fit=crop&q=80&w=400'}]}, {name:'Sorriso', variants:[{id:'90g', name:'Dentes Brancos', image:'https://images.unsplash.com/photo-1559591937-e1dc329ef226?auto=format&fit=crop&q=80&w=400'}]}]
  },
  'desodorante': {
      variants: [{id:'aerosol', name:'Aerosol', image: 'https://images.unsplash.com/photo-1616688587635-4e782d8c3639?auto=format&fit=crop&q=80&w=400'}],
      brands: [{name:'Rexona', variants:[{id:'aerosol', name:'Aerosol', image: 'https://images.unsplash.com/photo-1616688587635-4e782d8c3639?auto=format&fit=crop&q=80&w=400'}]}, {name:'Nivea', variants:[{id:'aerosol', name:'Aerosol', image: 'https://images.unsplash.com/photo-1616688587635-4e782d8c3639?auto=format&fit=crop&q=80&w=400'}]}]
  },

  // === HORTIFRUTI ===
  'banana': { variants: createFruitVariants(), brands: [] },
  'maca': { variants: createFruitVariants(), brands: [] },
  'tomate': { variants: createVegVariants(), brands: [] },
  'cebola': { variants: createVegVariants(), brands: [] },
  'batata': { variants: createVegVariants(), brands: [] },
  'alface': { variants: [{id:'un', name:'Pé', image: IMAGES.veggies}], brands: [] },

  // === GENERICS / FALLBACKS FOR BIG LIST ===
  'leite uht': { variants: createMilkVariants(), brands: [{name:'Lider', variants:createMilkVariants()}] },
  'refrigerante cola': { variants: createSodaVariants(), brands: [{name:'Coca', variants:createSodaVariants()}] },
  'agua mineral': { variants: [{id:'500ml', name:'500ml', image:IMAGES.generic}], brands:[] },
  'verduras': { variants: createVegVariants(), brands: [] },
  'legumes': { variants: createVegVariants(), brands: [] },
  'frutas': { variants: createFruitVariants(), brands: [] },
  'biscoitos': { variants: [{id:'pct', name:'Pacote', image:IMAGES.generic}], brands: [] },
  'chocolate': { variants: [{id:'barra', name:'Barra', image:IMAGES.generic}], brands: [{name:'Lacta', variants:[{id:'barra', name:'Barra', image:IMAGES.generic}]}] },
  'balas': { variants: [{id:'pct', name:'Pacote', image:IMAGES.generic}], brands: [] },
  'cereais': { variants: [{id:'cx', name:'Caixa', image:IMAGES.generic}], brands: [{name:'Kelloggs', variants:[{id:'cx', name:'Sucrilhos', image:IMAGES.generic}]}] },
  'temperos': { variants: [{id:'sache', name:'Sachê', image:IMAGES.generic}], brands: [{name:'Kitano', variants:[{id:'sache', name:'Sachê', image:IMAGES.generic}]}] },
  'massa pronta': { variants: [{id:'un', name:'Pacote', image:IMAGES.pasta}], brands: [] },
  'molhos prontos': { variants: [{id:'un', name:'Sachê', image:IMAGES.generic}], brands: [] },
  'congelados': { variants: [{id:'cx', name:'Caixa', image:IMAGES.generic}], brands: [{name:'Sadia', variants:[{id:'cx', name:'Lasanha', image:IMAGES.generic}]}] },
  'enlatados': { variants: [{id:'lt', name:'Lata', image:IMAGES.generic}], brands: [] },
  'conservas': { variants: [{id:'vd', name:'Vidro', image:IMAGES.generic}], brands: [] },
  'chas': { variants: [{id:'cx', name:'Caixa', image:IMAGES.generic}], brands: [{name:'Leão', variants:[{id:'cx', name:'Matte', image:IMAGES.generic}]}] },
  'achocolatado': { variants: [{id:'lt', name:'Lata 400g', image:IMAGES.generic}], brands: [{name:'Nescau', variants:[{id:'lt', name:'Lata', image:IMAGES.generic}]}, {name:'Toddy', variants:[{id:'lt', name:'Lata', image:IMAGES.generic}]}] },
  'leite condensado': { variants: [{id:'lt', name:'Lata/CX', image:IMAGES.milk}], brands: [{name:'Leite Moça', variants:[{id:'lt', name:'Lata', image:IMAGES.milk}]}] },
  'creme de leite': { variants: [{id:'cx', name:'Caixinha', image:IMAGES.milk}], brands: [{name:'Nestlé', variants:[{id:'cx', name:'Caixinha', image:IMAGES.milk}]}] },
  'limpeza casa': { variants: createCleaningVariants(), brands: [] },
  'guardanapos': { variants: [{id:'pct', name:'Pacote', image:IMAGES.generic}], brands: [] },
  'papel toalha': { variants: [{id:'rolos', name:'2 Rolos', image:IMAGES.generic}], brands: [{name:'Snob', variants:[{id:'rolos', name:'2 Rolos', image:IMAGES.generic}]}] },
  'fraldas': { variants: [{id:'pct', name:'Pacote', image:IMAGES.generic}], brands: [{name:'Pampers', variants:[{id:'pct', name:'Pacote', image:IMAGES.generic}]}] },
  'lixo': { variants: [{id:'rl', name:'Rolo', image:IMAGES.generic}], brands: [] },
  'esponja': { variants: [{id:'pct', name:'Pacote', image:IMAGES.generic}], brands: [{name:'Bombril', variants:[{id:'pct', name:'Pacote', image:IMAGES.generic}]}] },
  'multiuso': { variants: [{id:'frasco', name:'Frasco', image:IMAGES.detergent}], brands: [{name:'Veja', variants:[{id:'frasco', name:'Frasco', image:IMAGES.detergent}]}] },
  'absorvente': { variants: [{id:'pct', name:'Pacote', image:IMAGES.generic}], brands: [{name:'Sempre Livre', variants:[{id:'pct', name:'Pacote', image:IMAGES.generic}]}] },
  'papel aluminio': { variants: [{id:'rl', name:'Rolo', image:IMAGES.generic}], brands: [] },
  'snacks': { variants: [{id:'pct', name:'Pacote', image:IMAGES.generic}], brands: [] },
  'leite po': { variants: [{id:'lt', name:'Lata', image:IMAGES.milk}], brands: [{name:'Ninho', variants:[{id:'lt', name:'Lata', image:IMAGES.milk}]}] },
  'castanhas': { variants: [{id:'pct', name:'Pacote', image:IMAGES.fruits}], brands: [] },
  'doces': { variants: [{id:'un', name:'Unidade', image:IMAGES.generic}], brands: [] },
  'pizzas': { variants: [{id:'cx', name:'Caixa', image:IMAGES.generic}], brands: [{name:'Sadia', variants:[{id:'cx', name:'Caixa', image:IMAGES.generic}]}] },
  'vinhos': { variants: [{id:'gf', name:'Garrafa', image:IMAGES.generic}], brands: [] },
  'destilados': { variants: [{id:'gf', name:'Garrafa', image:IMAGES.generic}], brands: [] },
  'papinhas': { variants: [{id:'pt', name:'Pote', image:IMAGES.generic}], brands: [{name:'Nestlé', variants:[{id:'pt', name:'Pote', image:IMAGES.generic}]}] },
  'lencos umedecidos': { variants: [{id:'pct', name:'Pacote', image:IMAGES.generic}], brands: [{name:'Huggies', variants:[{id:'pct', name:'Pacote', image:IMAGES.generic}]}] }
};
