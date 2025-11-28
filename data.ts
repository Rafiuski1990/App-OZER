
import { ProductDefinition } from './types';

export const PRODUCT_CATALOG: Record<string, ProductDefinition> = {
  // --- CARNES & PROTEÍNAS ---
  'carne': {
    variants: [
      { id: 'acem', name: 'Acém (kg)', image: 'https://images.unsplash.com/photo-1615937691194-97cafc3bc3cf?auto=format&fit=crop&q=80&w=400' },
      { id: 'picanha', name: 'Picanha (kg)', image: 'https://images.unsplash.com/photo-1606213941427-463d12d4a5b4?auto=format&fit=crop&q=80&w=400' },
      { id: 'patinho', name: 'Patinho (kg)', image: 'https://images.unsplash.com/photo-1551028150-64b9f398f678?auto=format&fit=crop&q=80&w=400' },
      { id: 'contra', name: 'Contra Filé', image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&q=80&w=400' },
      { id: 'moida', name: 'Carne Moída', image: 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?auto=format&fit=crop&q=80&w=400' },
    ],
    brands: ['Friboi', 'Maturatta', 'Swift', 'Montana', 'Açougue Local']
  },
  'frango': {
    variants: [
      { id: 'peito', name: 'Peito (kg)', image: 'https://images.unsplash.com/photo-1612077330269-788066d5a58b?auto=format&fit=crop&q=80&w=400' },
      { id: 'coxa', name: 'Coxa/Sobrecoxa', image: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&q=80&w=400' },
      { id: 'asa', name: 'Asinha', image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&q=80&w=400' },
      { id: 'inteiro', name: 'Inteiro', image: 'https://images.unsplash.com/photo-1518492104633-130d0cc84637?auto=format&fit=crop&q=80&w=400' },
      { id: 'empanado', name: 'Empanado/Nuggets', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Chicken_Nuggets.jpg/640px-Chicken_Nuggets.jpg' },
    ],
    brands: ['Sadia', 'Perdigão', 'Seara', 'Aurora', 'Copacol']
  },
  'linguica': {
    variants: [
      { id: 'toscana', name: 'Toscana', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Sausages_in_supermarket.jpg/640px-Sausages_in_supermarket.jpg' },
      { id: 'calabresa', name: 'Calabresa', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Chorizo_de_Pamplona_fatiado.jpg/640px-Chorizo_de_Pamplona_fatiado.jpg' },
      { id: 'frango', name: 'De Frango', image: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&q=80&w=400' }
    ],
    brands: ['Sadia', 'Perdigão', 'Aurora', 'Seara']
  },
  'peixe': {
    variants: [
      { id: 'tilapia', name: 'Filé Tilápia', image: 'https://images.unsplash.com/photo-1511208687438-2c5a5abb810c?auto=format&fit=crop&q=80&w=400' },
      { id: 'sardinha', name: 'Sardinha (Lata)', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Canned_sardines_01.jpg/640px-Canned_sardines_01.jpg' },
      { id: 'atum', name: 'Atum (Lata)', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Canned_tuna.jpg/640px-Canned_tuna.jpg' }
    ],
    brands: ['Gomes da Costa', 'Coqueiro', 'Peixaria Local', 'Swift']
  },

  // --- MERCEARIA BÁSICA ---
  'arroz': {
    variants: [
      { id: 'branco5', name: 'Branco (5kg)', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=400' }, 
      { id: 'branco1', name: 'Branco (1kg)', image: 'https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&q=80&w=400' }, 
      { id: 'integral', name: 'Integral', image: 'https://images.unsplash.com/photo-1598218684705-d143c08b4952?auto=format&fit=crop&q=80&w=400' },
    ],
    brands: ['Tio João', 'Camil', 'Prato Fino', 'Emoções', 'Qualitá']
  },
  'feijao': {
    variants: [
      { id: 'carioca', name: 'Carioca', image: 'https://images.unsplash.com/photo-1551462147-37885acc36f1?auto=format&fit=crop&q=80&w=400' },
      { id: 'preto', name: 'Preto', image: 'https://images.unsplash.com/photo-1633887012351-866440266df1?auto=format&fit=crop&q=80&w=400' },
    ],
    brands: ['Camil', 'Kicaldo', 'Tio João', 'Broto Legal']
  },
  'macarrao': {
      variants: [
          { id: 'espaguete', name: 'Espaguete', image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&q=80&w=400' },
          { id: 'penne', name: 'Penne', image: 'https://images.unsplash.com/photo-1608835291093-394b0c943a75?auto=format&fit=crop&q=80&w=400' },
          { id: 'parafuso', name: 'Parafuso', image: 'https://images.unsplash.com/photo-1551462147-37885acc36f1?auto=format&fit=crop&q=80&w=400' },
          { id: 'instantaneo', name: 'Miojo', image: 'https://images.unsplash.com/photo-1612927601601-663840473e65?auto=format&fit=crop&q=80&w=400' }
      ],
      brands: ['Galo', 'Adria', 'Renata', 'Dona Benta', 'Barilla', 'Nissin']
  },
  'oleo': {
      variants: [
          { id: 'soja', name: 'Óleo de Soja', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd0347?auto=format&fit=crop&q=80&w=400' },
          { id: 'milho', name: 'Óleo de Milho', image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=400' },
          { id: 'azeite', name: 'Azeite Oliva', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd0347?auto=format&fit=crop&q=80&w=400' }
      ],
      brands: ['Liza', 'Soya', 'Concórdia', 'Gallo', 'Andorinha']
  },
  'cafe': {
      variants: [
          { id: 'po', name: 'Em Pó (500g)', image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=400' },
          { id: 'capsula', name: 'Cápsula', image: 'https://images.unsplash.com/photo-1615354508006-8d591b617079?auto=format&fit=crop&q=80&w=400' }
      ],
      brands: ['Pilão', 'Melitta', '3 Corações', 'Caboclo']
  },
  'acucar': {
      variants: [
          { id: 'refinado', name: 'Refinado (1kg)', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=400' },
          { id: 'cristal', name: 'Cristal (5kg)', image: 'https://images.unsplash.com/photo-1581441363689-1f3c3c414635?auto=format&fit=crop&q=80&w=400' }
      ],
      brands: ['União', 'Caravelas', 'Da Barra', 'Guarani']
  },
  'sal': {
      variants: [{ id: 'refinado', name: 'Sal Refinado', image: 'https://images.unsplash.com/photo-1518110925495-5921c62a8594?auto=format&fit=crop&q=80&w=400' }],
      brands: ['Cisne', 'Lebre', 'Nobre']
  },
  'aveia': {
      variants: [
          { id: 'flocos', name: 'Em Flocos', image: 'https://images.unsplash.com/photo-1614732187685-64903328eb9f?auto=format&fit=crop&q=80&w=400' },
          { id: 'farelo', name: 'Farelo', image: 'https://images.unsplash.com/photo-1509456593530-9430cb28807d?auto=format&fit=crop&q=80&w=400' }
      ],
      brands: ['Quaker', 'Nestlé', 'Mãe Terra']
  },
  'pipoca': {
      variants: [
          { id: 'milho', name: 'Milho Pipoca', image: 'https://images.unsplash.com/photo-1569245585093-61a7a28e8264?auto=format&fit=crop&q=80&w=400' },
          { id: 'micro', name: 'Microondas', image: 'https://images.unsplash.com/photo-1578849278619-a73a94e63ce0?auto=format&fit=crop&q=80&w=400' }
      ],
      brands: ['Yoki', 'Camil', 'Pipoquinha']
  },
  'granola': {
      variants: [{ id: 'tradicional', name: 'Tradicional', image: 'https://images.unsplash.com/photo-1517093734098-243542095368?auto=format&fit=crop&q=80&w=400' }],
      brands: ['Mãe Terra', 'Kelloggs', 'Tia Sônia']
  },
  'molho de tomate': {
      variants: [
          { id: 'sache', name: 'Sachê (340g)', image: 'https://images.unsplash.com/photo-1603569283847-aa295f0d016a?auto=format&fit=crop&q=80&w=400' },
          { id: 'lata', name: 'Lata/Peneirado', image: 'https://images.unsplash.com/photo-1565158260477-93ae3e54b61d?auto=format&fit=crop&q=80&w=400' }
      ],
      brands: ['Elefante', 'Pomarola', 'Quero', 'Fugini']
  },
  'condimentos': {
     variants: [
         { id: 'ketchup', name: 'Ketchup', image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&q=80&w=400' },
         { id: 'maionese', name: 'Maionese', image: 'https://images.unsplash.com/photo-1585238342024-78d387f4a707?auto=format&fit=crop&q=80&w=400' },
         { id: 'mostarda', name: 'Mostarda', image: 'https://images.unsplash.com/photo-1528750997573-59b8b6ee5649?auto=format&fit=crop&q=80&w=400' },
         { id: 'pimenta', name: 'Molho Pimenta', image: 'https://images.unsplash.com/photo-1584342371457-418b7c7b8971?auto=format&fit=crop&q=80&w=400' }
     ],
     brands: ['Heinz', 'Hellmanns', 'Hemmer', 'Arisco', 'Quero']
  },

  // --- PADARIA ---
  'pao': {
      variants: [
          { id: 'frances', name: 'Pão Francês', image: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&q=80&w=400' },
          { id: 'forma', name: 'Pão de Forma', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=400' },
          { id: 'integral', name: 'Forma Integral', image: 'https://images.unsplash.com/photo-1598373182133-52452f7691f6?auto=format&fit=crop&q=80&w=400' }
      ],
      brands: ['Pullman', 'Wickbold', 'Seven Boys', 'Bauducco', 'Padaria Local']
  },
  'bolo': {
      variants: [
          { id: 'pronto', name: 'Bolo Pronto', image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&q=80&w=400' },
          { id: 'mistura', name: 'Mistura Bolo', image: 'https://images.unsplash.com/photo-1586788224331-947f68671cf1?auto=format&fit=crop&q=80&w=400' }
      ],
      brands: ['Pullman', 'Bauducco', 'Dona Benta', 'Renata']
  },
  'torradas': {
      variants: [{ id: 'pacote', name: 'Pacote 140g', image: 'https://images.unsplash.com/photo-1584776293029-4bd7c0fe12b3?auto=format&fit=crop&q=80&w=400' }],
      brands: ['Bauducco', 'Wickbold', 'Magic Toast']
  },
  
  // --- FRIOS & LATICÍNIOS ---
  'leite': {
      variants: [
          { id: 'integral', name: 'Integral (1L)', image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&q=80&w=400' },
          { id: 'desnatado', name: 'Desnatado (1L)', image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&q=80&w=400' }
      ],
      brands: ['Italac', 'Piracanjuba', 'Ninho', 'Parmalat', 'Líder']
  },
  'queijo': {
      variants: [
          { id: 'mussarela', name: 'Mussarela', image: 'https://images.unsplash.com/photo-1588195538326-c5f1f23fa438?auto=format&fit=crop&q=80&w=400' },
          { id: 'prato', name: 'Prato', image: 'https://images.unsplash.com/photo-1624806992097-90c375276e03?auto=format&fit=crop&q=80&w=400' },
          { id: 'minas', name: 'Minas Frescal', image: 'https://images.unsplash.com/photo-1486297678749-171b36097e66?auto=format&fit=crop&q=80&w=400' }
      ],
      brands: ['Sadia', 'Perdigão', 'Vigor', 'Polenghi', 'Italac']
  },
  'presunto': {
      variants: [{ id: 'fatiado', name: 'Fatiado (kg)', image: 'https://images.unsplash.com/photo-1524438418049-ab2acb7aa48f?auto=format&fit=crop&q=80&w=400' }],
      brands: ['Sadia', 'Perdigão', 'Seara', 'Aurora']
  },
  'mortadela': {
      variants: [{ id: 'defumada', name: 'Defumada (kg)', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Mortadella_Bologna.jpg/640px-Mortadella_Bologna.jpg' }],
      brands: ['Sadia', 'Perdigão', 'Ceratti', 'Marba']
  },
  'manteiga': {
      variants: [
          { id: 'pote', name: 'Manteiga Pote', image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&q=80&w=400' },
          { id: 'margarina', name: 'Margarina', image: 'https://images.unsplash.com/photo-1623855244183-52fd8d3ce2f7?auto=format&fit=crop&q=80&w=400' }
      ],
      brands: ['Aviação', 'Qualy', 'Vigor', 'Doriana', 'Itambé']
  },
  'iogurte': {
      variants: [
          { id: 'garrafa', name: 'Garrafa 1Kg', image: 'https://images.unsplash.com/photo-1571212515416-f4323274cc6c?auto=format&fit=crop&q=80&w=400' },
          { id: 'grego', name: 'Grego', image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&q=80&w=400' }
      ],
      brands: ['Danone', 'Vigor', 'Nestlé', 'Itambé']
  },
  'sorvete': {
      variants: [{ id: 'pote', name: 'Pote 2L', image: 'https://images.unsplash.com/photo-1576506295286-5cda18df43e7?auto=format&fit=crop&q=80&w=400' }],
      brands: ['Kibon', 'Nestlé', 'Marca Própria']
  },

  // --- HORTIFRUTI ---
  'tomate': { variants: [{ id: 'kg', name: 'Tomate (kg)', image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=400' }], brands: ['Hortifruti'] },
  'alface': { variants: [{ id: 'un', name: 'Alface (un)', image: 'https://images.unsplash.com/photo-1622206151226-18ca2c958a2f?auto=format&fit=crop&q=80&w=400' }], brands: ['Hortifruti'] },
  'cebola': { variants: [{ id: 'kg', name: 'Cebola (kg)', image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&q=80&w=400' }], brands: ['Hortifruti'] },
  'batata': { variants: [{ id: 'inglesa', name: 'Inglesa (kg)', image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&q=80&w=400' }], brands: ['Hortifruti'] },
  'cenoura': { variants: [{ id: 'kg', name: 'Cenoura (kg)', image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&q=80&w=400' }], brands: ['Hortifruti'] },
  'maca': { variants: [{ id: 'gala', name: 'Gala (kg)', image: 'https://images.unsplash.com/photo-1579613832125-5d34813ffe68?auto=format&fit=crop&q=80&w=400' }], brands: ['Hortifruti'] },
  'banana': { variants: [{ id: 'nanica', name: 'Nanica (kg)', image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&q=80&w=400' }], brands: ['Hortifruti'] },
  'laranja': { variants: [{ id: 'pera', name: 'Pera (kg)', image: 'https://images.unsplash.com/photo-1547514701-42782101795e?auto=format&fit=crop&q=80&w=400' }], brands: ['Hortifruti'] },
  'legumes congelados': {
      variants: [{ id: 'seleta', name: 'Seleta Legumes', image: 'https://images.unsplash.com/photo-1629857948332-628d0517703f?auto=format&fit=crop&q=80&w=400' }],
      brands: ['Daucy', 'Seara', 'Sadia']
  },

  // --- BEBIDAS ---
  'agua': {
      variants: [
          { id: '500', name: 'Garrafa 500ml', image: 'https://images.unsplash.com/photo-1616118132534-381148898bb4?auto=format&fit=crop&q=80&w=400' },
          { id: '1500', name: 'Garrafa 1.5L', image: 'https://images.unsplash.com/photo-1603394630850-69b3ca8121ca?auto=format&fit=crop&q=80&w=400' }
      ],
      brands: ['Crystal', 'Bonafont', 'Minalba', 'Lindoya']
  },
  'refrigerante': {
      variants: [
          { id: '2l', name: 'Garrafa 2L', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=400' },
          { id: 'lata', name: 'Lata 350ml', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=400' }
      ],
      brands: ['Coca-Cola', 'Guaraná', 'Pepsi', 'Fanta', 'Sprite']
  },
  'cerveja': {
      variants: [
          { id: 'lata', name: 'Lata 350ml', image: 'https://images.unsplash.com/photo-1623594215038-d621c172d734?auto=format&fit=crop&q=80&w=400' },
          { id: 'longneck', name: 'Long Neck', image: 'https://images.unsplash.com/photo-1618885472179-5e474019f2a9?auto=format&fit=crop&q=80&w=400' }
      ],
      brands: ['Heineken', 'Brahma', 'Skol', 'Amstel', 'Spaten']
  },
  'suco': {
      variants: [
          { id: 'caixa', name: 'Néctar 1L', image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&q=80&w=400' },
          { id: 'polpa', name: 'Polpa Congelada', image: 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&q=80&w=400' }
      ],
      brands: ['Del Valle', 'Maguary', 'Ades', 'Natural One']
  },
  'cha': {
      variants: [{ id: 'caixa', name: 'Caixa (sachês)', image: 'https://images.unsplash.com/photo-1594631252845-d9b502913042?auto=format&fit=crop&q=80&w=400' }],
      brands: ['Leão', 'Dr Oetker', 'Twinings']
  },
  'achocolatado': {
      variants: [{ id: 'po', name: 'Em Pó (400g)', image: 'https://images.unsplash.com/photo-1542843137-8791a6904d14?auto=format&fit=crop&q=80&w=400' }],
      brands: ['Nescau', 'Toddy', '3 Corações']
  },

  // --- DOCES & SNACKS ---
  'chocolate': { variants: [{ id: 'barra', name: 'Barra', image: 'https://images.unsplash.com/photo-1606312619070-d48b706521bf?auto=format&fit=crop&q=80&w=400' }], brands: ['Nestlé', 'Lacta', 'Garoto', 'Hersheys'] },
  'biscoito': { variants: [{ id: 'recheado', name: 'Recheado', image: 'https://images.unsplash.com/photo-1560155016-bd4879ae8f21?auto=format&fit=crop&q=80&w=400' }], brands: ['Bauducco', 'Nestlé', 'Traquinas'] },
  'salgadinho': { variants: [{ id: 'pacote', name: 'Pacote', image: 'https://images.unsplash.com/photo-1621447504864-d8686e12698c?auto=format&fit=crop&q=80&w=400' }], brands: ['Elma Chips', 'Ruffles', 'Doritos'] },
  'geleia': { variants: [{ id: 'pote', name: 'Pote Vidro', image: 'https://images.unsplash.com/photo-1557007629-d58673a5a782?auto=format&fit=crop&q=80&w=400' }], brands: ['Queensberry', 'Ritter'] },
  'balas': { variants: [{ id: 'pct', name: 'Pacote', image: 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?auto=format&fit=crop&q=80&w=400' }], brands: ['Fini', 'Halls', '7Belo'] },
  
  // --- HIGIENE ---
  'shampoo': {
    variants: [
      { id: 'lisos', name: 'Lisos', image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&q=80&w=400' },
      { id: 'cachos', name: 'Cachos', image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?auto=format&fit=crop&q=80&w=400' },
      { id: 'masculino', name: 'Masculino', image: 'https://images.unsplash.com/photo-1600490800318-77114b74549f?auto=format&fit=crop&q=80&w=400' },
    ],
    brands: ['Seda', 'Pantene', 'Dove', 'L\'Oréal', 'Clear']
  },
  'condicionador': {
      variants: [{ id: 'padrao', name: 'Condicionador', image: 'https://images.unsplash.com/photo-1576426863848-c21f5fc67291?auto=format&fit=crop&q=80&w=400' }],
      brands: ['Seda', 'Pantene', 'Dove', 'L\'Oréal']
  },
  'sabonete': {
      variants: [{ id: 'barra', name: 'Barra', image: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&q=80&w=400' }],
      brands: ['Lux', 'Dove', 'Nivea', 'Protex', 'Phebo']
  },
  'dental': {
      variants: [
          { id: 'pasta', name: 'Creme Dental', image: 'https://images.unsplash.com/photo-1559591937-e10977d4d658?auto=format&fit=crop&q=80&w=400' },
          { id: 'escova', name: 'Escova', image: 'https://images.unsplash.com/photo-1559591937-234ab11e40c6?auto=format&fit=crop&q=80&w=400' },
          { id: 'fio', name: 'Fio Dental', image: 'https://images.unsplash.com/photo-1588775404175-33bdf0553124?auto=format&fit=crop&q=80&w=400' }
      ],
      brands: ['Colgate', 'Oral-B', 'Sorriso', 'CloseUp']
  },
  'desodorante': {
      variants: [
          { id: 'aerosol', name: 'Aerosol', image: 'https://images.unsplash.com/photo-1619451334792-150fd785ee74?auto=format&fit=crop&q=80&w=400' },
          { id: 'rollon', name: 'Roll-on', image: 'https://images.unsplash.com/photo-1629198781938-166299d54e57?auto=format&fit=crop&q=80&w=400' }
      ],
      brands: ['Rexona', 'Dove', 'Nivea', 'Axe', 'Monange']
  },

  // --- LIMPEZA ---
  'sabao': {
      variants: [
          { id: 'po', name: 'Em Pó (kg)', image: 'https://images.unsplash.com/photo-1585838491738-4e897931c817?auto=format&fit=crop&q=80&w=400' },
          { id: 'liquido', name: 'Líquido (L)', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=400' }
      ],
      brands: ['Omo', 'Brilhante', 'Tixan', 'Ariel', 'Ypê']
  },
  'detergente': { variants: [{ id: 'frasco', name: 'Frasco 500ml', image: 'https://images.unsplash.com/photo-1533633354780-d131cb09c73c?auto=format&fit=crop&q=80&w=400' }], brands: ['Ypê', 'Limpol', 'Minuano'] },
  'amaciante': { variants: [{ id: 'frasco', name: '2 Litros', image: 'https://images.unsplash.com/photo-1585314062604-1a357de8b000?auto=format&fit=crop&q=80&w=400' }], brands: ['Comfort', 'Fofo', 'Downy', 'Ypê'] },
  'agua sanitaria': { variants: [{ id: '1l', name: '1 Litro', image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&q=80&w=400' }], brands: ['Qboa', 'Ypê', 'Super Candida'] },
  'desinfetante': { variants: [{ id: 'frasco', name: 'Frasco', image: 'https://images.unsplash.com/photo-1628102491629-778571d893a3?auto=format&fit=crop&q=80&w=400' }], brands: ['Pinho Sol', 'Veja', 'Ypê'] },
  'multiuso': { variants: [{ id: 'frasco', name: 'Frasco', image: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&q=80&w=400' }], brands: ['Veja', 'Mr Músculo', 'Ypê'] },
  'esponja': { variants: [{ id: 'pct', name: 'Pacote c/ 3', image: 'https://images.unsplash.com/photo-1585838491738-4e897931c817?auto=format&fit=crop&q=80&w=400' }], brands: ['Scott Brite', 'Bombril', 'Assolan'] },
  'lixo': { variants: [{ id: 'rolo', name: 'Saco Lixo (Rolo)', image: 'https://images.unsplash.com/photo-1611039986376-7935a8df241d?auto=format&fit=crop&q=80&w=400' }], brands: ['Embalixo', 'Dover'] },
  'papel': {
      variants: [
          { id: 'higienico', name: 'Papel Higiênico', image: 'https://images.unsplash.com/photo-1584556812952-905ffd0c611f?auto=format&fit=crop&q=80&w=400' },
          { id: 'toalha', name: 'Papel Toalha', image: 'https://images.unsplash.com/photo-1610450918073-d6c292120404?auto=format&fit=crop&q=80&w=400' }
      ],
      brands: ['Neve', 'Personal', 'Scott', 'Snob']
  }
};
