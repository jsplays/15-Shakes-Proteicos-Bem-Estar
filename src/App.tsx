import React, { useState, useEffect } from 'react';
import { 
  GlassWater, Heart, ShoppingBag, Dumbbell, Activity, Search, Filter, 
  Check, Plus, Trash2, Clock, AlertTriangle, ShieldAlert, Sparkles, 
  ChevronRight, ArrowLeft, RefreshCw, Smartphone, Monitor, Info, 
  CheckCircle2, Flame, Droplet, Calendar, Play, Pause, RotateCcw, X, Share2
} from 'lucide-react';

interface Shake {
  id: number;
  name: string;
  subtitle: string;
  ingredients: string[];
  prep: string;
  tags: ('leite' | 'iogurte' | 'sem-laticinios' | 'banana' | 'sem-aveia' | 'menos-ingredientes')[];
  category: string;
  prepTime: string;
  caloriesApprox: string;
  proteinApprox: string;
  notes: string;
}

const SHAKES_DATA: Shake[] = [
  {
    id: 1,
    name: "Banana com aveia",
    subtitle: "Clássico reconfortante e energético",
    ingredients: ["200 ml de leite", "1 banana", "2 colheres de sopa de aveia"],
    prep: "Bata tudo no liquidificador até obter uma consistência homogênea. Opcional: adicionar gelo.",
    tags: ["leite", "banana"],
    category: "Clássicos",
    prepTime: "3 min",
    caloriesApprox: "~240 kcal",
    proteinApprox: "~9g",
    notes: "Fonte natural de carboidratos e fibras da aveia. Pode usar leite desnatado ou vegetal."
  },
  {
    id: 2,
    name: "Banana, cacau e amendoim",
    subtitle: "Sabor intenso e cremosidade rica",
    ingredients: ["200 ml de leite", "1 banana", "1 colher de sopa de pasta de amendoim", "1 colher de chá de cacau sem açúcar"],
    prep: "Bata até a pasta de amendoim se misturar bem com os demais ingredientes.",
    tags: ["leite", "banana", "sem-aveia", "menos-ingredientes"],
    category: "Especiais",
    prepTime: "3 min",
    caloriesApprox: "~310 kcal",
    proteinApprox: "~11g",
    notes: "Excelente combinação de gorduras boas e sabor marcante do cacau 100%."
  },
  {
    id: 3,
    name: "Mamão com iogurte",
    subtitle: "Leve, digestivo e refrescante",
    ingredients: ["1 pote individual de iogurte natural (cerca de 170 g)", "½ mamão papaia", "2 colheres de sopa de aveia", "Água para ajustar"],
    prep: "Bata tudo. Acrescente água aos poucos até atingir a fluidez desejada.",
    tags: ["iogurte"],
    category: "Frutas Tropicais",
    prepTime: "4 min",
    caloriesApprox: "~220 kcal",
    proteinApprox: "~10g",
    notes: "O iogurte natural traz cremosidade e acidez equilibrada com a doçura do mamão."
  },
  {
    id: 4,
    name: "Morango com leite em pó",
    subtitle: "Doce, frutado e texturizado",
    ingredients: ["200 ml de leite", "½ xícara de morangos frescos ou congelados", "2 colheres de sopa de leite em pó"],
    prep: "Bata até ficar completamente homogêneo e espumoso.",
    tags: ["leite", "sem-aveia"],
    category: "Frutas Vermelhas",
    prepTime: "3 min",
    caloriesApprox: "~210 kcal",
    proteinApprox: "~12g",
    notes: "O leite em pó intensifica o corpo da bebida e eleva o teor proteico de forma simples."
  },
  {
    id: 5,
    name: "Manga com iogurte",
    subtitle: "Textura aveludada e tropical",
    ingredients: ["1 pote individual de iogurte natural (170g)", "½ manga madura", "Água para ajustar"],
    prep: "Bata tudo até obter um creme sedoso.",
    tags: ["iogurte", "sem-aveia", "menos-ingredientes"],
    category: "Frutas Tropicais",
    prepTime: "3 min",
    caloriesApprox: "~190 kcal",
    proteinApprox: "~8g",
    notes: "A manga confere aroma marcante e textura cremosa natural sem exigir espessantes."
  },
  {
    id: 6,
    name: "Goiaba cremosa",
    subtitle: "Doçura rústica e marcante",
    ingredients: ["200 ml de leite", "1 goiaba madura", "1 colher de sopa de leite em pó"],
    prep: "Bata bem e, se preferir uma textura impecável, coe para retirar as sementes.",
    tags: ["leite", "sem-aveia"],
    category: "Frutas Tropicais",
    prepTime: "4 min",
    caloriesApprox: "~200 kcal",
    proteinApprox: "~10g",
    notes: "Rica em vitamina C. Coar é opcional para quem prefere sem sementes trituradas."
  },
  {
    id: 7,
    name: "Abacate com iogurte",
    subtitle: "Ultra cremoso e nutritivo",
    ingredients: ["1 pote individual de iogurte natural (170g)", "¼ de abacate pequeno", "Água para ajustar"],
    prep: "Bata até ficar perfeitamente cremoso e homogêneo.",
    tags: ["iogurte", "sem-aveia", "menos-ingredientes"],
    category: "Cremosos",
    prepTime: "3 min",
    caloriesApprox: "~230 kcal",
    proteinApprox: "~9g",
    notes: "Gorduras monoinsaturadas saudáveis que garantem saciedade prolongada."
  },
  {
    id: 8,
    name: "Banana com café",
    subtitle: "Energia revigorante para o dia",
    ingredients: ["150 ml de leite", "50 ml de café já preparado e frio", "½ banana", "1 colher de sopa de aveia"],
    prep: "Bata todos os ingredientes. Para evitar cafeína, use café descafeinado.",
    tags: ["leite", "banana"],
    category: "Café & Energia",
    prepTime: "3 min",
    caloriesApprox: "~180 kcal",
    proteinApprox: "~8g",
    notes: "Ótima opção pré-treino matinal combinando cafeína suave e carboidratos."
  },
  {
    id: 9,
    name: "Milho com canela",
    subtitle: "Aconchegante e aromático",
    ingredients: ["½ xícara de milho cozido e frio", "200 ml de leite", "1 colher de sopa de leite em pó", "Canela em pó a gosto"],
    prep: "Bata bem. Coe se preferir uma textura totalmente lisa.",
    tags: ["leite", "sem-aveia"],
    category: "Especiais",
    prepTime: "4 min",
    caloriesApprox: "~250 kcal",
    proteinApprox: "~9g",
    notes: "Inspirado no sabor tradicional do curau, com toque termogênico da canela."
  },
  {
    id: 10,
    name: "Batata-doce com iogurte",
    subtitle: "Nutrição consistente e saciedade",
    ingredients: ["½ xícara de batata-doce cozida e fria", "100 g de iogurte natural", "150 ml de leite", "Canela a gosto"],
    prep: "Bata até ficar homogêneo e sem grumos.",
    tags: ["leite", "iogurte", "sem-aveia"],
    category: "Funcionais",
    prepTime: "4 min",
    caloriesApprox: "~260 kcal",
    proteinApprox: "~10g",
    notes: "Carboidrato de baixo índice glicêmico aliado à proteína do leite e iogurte."
  },
  {
    id: 11,
    name: "Abacaxi com iogurte",
    subtitle: "Refrescante e digestivo",
    ingredients: ["½ xícara de abacaxi picado", "1 pote individual de iogurte natural", "100 ml de água"],
    prep: "Bata e sirva gelado. Nota: a acidez do abacaxi pode talhar levemente o iogurte se guardado.",
    tags: ["iogurte", "sem-aveia", "menos-ingredientes"],
    category: "Frutas Tropicais",
    prepTime: "3 min",
    caloriesApprox: "~160 kcal",
    proteinApprox: "~8g",
    notes: "Contém bromelina, enzima natural que auxilia na digestão."
  },
  {
    id: 12,
    name: "Banana com bebida de soja",
    subtitle: "100% vegetal e proteico",
    ingredients: ["200 ml de bebida de soja", "1 banana", "1 colher de sopa de pasta de amendoim"],
    prep: "Bata até ficar homogêneo. Confira no rótulo se a bebida é adoçada.",
    tags: ["sem-laticinios", "banana", "sem-aveia", "menos-ingredientes"],
    category: "Veganos / Vegetais",
    prepTime: "3 min",
    caloriesApprox: "~280 kcal",
    proteinApprox: "~10g",
    notes: "Excelente alternativa sem laticínios com alto teor proteico natural da soja."
  },
  {
    id: 13,
    name: "Manga com tofu e soja",
    subtitle: "Cremosa, proteica e vegetal",
    ingredients: ["100 g de tofu macio (silken tofu)", "150 ml de bebida de soja", "½ xícara de manga"],
    prep: "Bata até alcançar textura incrivelmente cremosa.",
    tags: ["sem-laticinios", "sem-aveia"],
    category: "Veganos / Vegetais",
    prepTime: "4 min",
    caloriesApprox: "~220 kcal",
    proteinApprox: "~14g",
    notes: "O tofu macio desaparece no liquidificador e garante um aporte proteico robusto sem sabor residual."
  },
  {
    id: 14,
    name: "Banana com leite em pó e canela",
    subtitle: "Doçura natural e toque especiado",
    ingredients: ["200 ml de leite", "1 banana", "2 colheres de sopa de leite em pó", "Canela em pó a gosto"],
    prep: "Bata tudo vigorosamente.",
    tags: ["leite", "banana", "sem-aveia"],
    category: "Clássicos",
    prepTime: "3 min",
    caloriesApprox: "~270 kcal",
    proteinApprox: "~13g",
    notes: "Sabor reconfortante, ideal para qualquer hora do dia."
  },
  {
    id: 15,
    name: "Pera com iogurte e aveia",
    subtitle: "Suave, aromática e rica em fibras",
    ingredients: ["1 pote individual de iogurte natural", "1 pera madura sem sementes", "2 colheres de sopa de aveia", "Água para ajustar"],
    prep: "Bata até ficar homogêneo e cremoso.",
    tags: ["iogurte"],
    category: "Frutas Tropicais",
    prepTime: "4 min",
    caloriesApprox: "~210 kcal",
    proteinApprox: "~9g",
    notes: "A pera confere textura delicada e excelente teor de fibras solúveis."
  }
];

interface Workout {
  id: string;
  title: string;
  duration: string;
  level: string;
  category: string;
  exercises: { name: string; reps: string; rest: string }[];
  description: string;
}

const WORKOUTS_DATA: Workout[] = [
  {
    id: 'w1',
    title: 'Full Body Funcional (Sem Equipamentos)',
    duration: '25 min',
    level: 'Iniciante / Intermediário',
    category: 'Corpo Inteiro',
    description: 'Circuito dinâmico para ativar toda a musculatura, melhorar o condicionamento e queimar calorias em casa.',
    exercises: [
      { name: 'Agachamento livre', reps: '3 séries x 15 repetições', rest: '45 seg' },
      { name: 'Flexão de braço (ou com joelhos apoiados)', reps: '3 séries x 10-12 repetições', rest: '60 seg' },
      { name: 'Ponte para glúteos', reps: '3 séries x 15 repetições', rest: '45 seg' },
      { name: 'Prancha abdominal isométrica', reps: '3 séries x 30-45 segundos', rest: '45 seg' },
      { name: 'Polichinelos', reps: '3 séries x 45 segundos', rest: '30 seg' }
    ]
  },
  {
    id: 'w2',
    title: 'Mobilidade & Alongamento Matinal',
    duration: '15 min',
    level: 'Todos os níveis',
    category: 'Bem-estar',
    description: 'Sequência fluida para aliviar tensões articulares, lubrificar a coluna e despertar o corpo com energia.',
    exercises: [
      { name: 'Gato-vaca (mobilidade de coluna)', reps: '2 séries x 10 movimentos', rest: '20 seg' },
      { name: 'Rotação de quadris e ombros', reps: '2 séries x 10 para cada lado', rest: '20 seg' },
      { name: 'Alongamento de posterior de coxas', reps: '30 segundos por perna', rest: '15 seg' },
      { name: 'Postura da criança (respiração profunda)', reps: '1 minuto mantendo o foco', rest: '30 seg' }
    ]
  },
  {
    id: 'w3',
    title: 'Foco em Core & Abdômen',
    duration: '20 min',
    level: 'Intermediário',
    category: 'Força & Resistência',
    description: 'Fortalecimento da região central (abdômen, lombar e oblíquos) para postura e estabilidade.',
    exercises: [
      { name: 'Prancha frontal com toque nos ombros', reps: '3 séries x 30 segundos', rest: '45 seg' },
      { name: 'Abdominal remador', reps: '3 séries x 12 repetições', rest: '45 seg' },
      { name: 'Prancha lateral', reps: '3 séries x 30 seg por lado', rest: '30 seg' },
      { name: 'Bicicleta no solo', reps: '3 séries x 20 repetições', rest: '45 seg' }
    ]
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'shakes' | 'favorites' | 'shopping' | 'workouts' | 'wellness'>('shakes');
  const [selectedShake, setSelectedShake] = useState<Shake | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [favorites, setFavorites] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('nutri_favorites');
      return saved ? JSON.parse(saved) : [1, 2];
    } catch {
      return [1, 2];
    }
  });

  const [shoppingList, setShoppingList] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('nutri_shopping');
      return saved ? JSON.parse(saved) : ['200 ml de leite', '1 banana', '2 colheres de sopa de aveia'];
    } catch {
      return [];
    }
  });

  const [customShoppingItem, setCustomShoppingItem] = useState('');
  const [waterCups, setWaterCups] = useState<number>(5);
  const [completedWorkouts, setCompletedWorkouts] = useState<string[]>([]);
  const [isMobileView, setIsMobileView] = useState<boolean>(true);
  const [showInfoHub, setShowInfoHub] = useState<boolean>(false);

  // Blender interactive mode state
  const [isBlending, setIsBlending] = useState<boolean>(false);
  const [blendSeconds, setBlendSeconds] = useState<number>(45);
  const [blendTimerActive, setBlendTimerActive] = useState<boolean>(false);

  useEffect(() => {
    try {
      localStorage.setItem('nutri_favorites', JSON.stringify(favorites));
    } catch {}
  }, [favorites]);

  useEffect(() => {
    try {
      localStorage.setItem('nutri_shopping', JSON.stringify(shoppingList));
    } catch {}
  }, [shoppingList]);

  useEffect(() => {
    let interval: any;
    if (blendTimerActive && blendSeconds > 0) {
      interval = setInterval(() => {
        setBlendSeconds(s => s - 1);
      }, 1000);
    } else if (blendSeconds === 0) {
      setBlendTimerActive(false);
      setIsBlending(false);
    }
    return () => clearInterval(interval);
  }, [blendTimerActive, blendSeconds]);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const addIngredientsToShopping = (shake: Shake) => {
    const newItems = shake.ingredients.filter(ing => !shoppingList.includes(ing));
    setShoppingList(prev => [...prev, ...newItems]);
    alert(`Ingredientes de "${shake.name}" adicionados à Lista de Compras!`);
  };

  const removeShoppingItem = (index: number) => {
    setShoppingList(prev => prev.filter((_, i) => i !== index));
  };

  const addCustomItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customShoppingItem.trim()) return;
    setShoppingList(prev => [...prev, customShoppingItem.trim()]);
    setCustomShoppingItem('');
  };

  const filteredShakes = SHAKES_DATA.filter(shake => {
    const matchesSearch = shake.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          shake.ingredients.some(i => i.toLowerCase().includes(searchQuery.toLowerCase()));
    if (!matchesSearch) return false;

    if (activeFilter === 'all') return true;
    if (activeFilter === 'leite') return shake.tags.includes('leite');
    if (activeFilter === 'iogurte') return shake.tags.includes('iogurte');
    if (activeFilter === 'sem-laticinios') return shake.tags.includes('sem-laticinios');
    if (activeFilter === 'banana') return shake.tags.includes('banana');
    if (activeFilter === 'sem-aveia') return shake.tags.includes('sem-aveia');
    if (activeFilter === 'menos-ingredientes') return shake.tags.includes('menos-ingredientes');
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col items-center justify-start font-sans antialiased">
      
      {/* Top Desktop Control Bar for Viewport Preview & Educational Disclaimer */}
      <header className="w-full bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between sticky top-0 z-50 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-sm shadow-emerald-500/30">
            <GlassWater className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight text-slate-900">NutriShake & Fit</h1>
            <p className="text-xs text-slate-500">15 Shakes Proteicos & Bem-Estar</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => setShowInfoHub(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors"
          >
            <Info className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Aviso Educativo</span>
          </button>

          <button 
            onClick={() => setIsMobileView(!isMobileView)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            title="Alternar entre moldura mobile e tela cheia"
          >
            {isMobileView ? <Monitor className="w-3.5 h-3.5" /> : <Smartphone className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isMobileView ? 'Modo Responsivo' : 'Modo Celular'}</span>
          </button>
        </div>
      </header>

      {/* Main Wrapper: Phone Frame or Full Width */}
      <div className={`w-full transition-all duration-300 ${isMobileView ? 'max-w-[430px] my-4 md:my-8 rounded-[40px] shadow-2xl border-[8px] border-slate-900 overflow-hidden bg-white relative' : 'max-w-6xl mx-auto px-4 py-6 bg-white shadow-sm rounded-2xl my-6'}`}>
        
        {/* Mobile Dynamic Island / Status Bar simulation if in mobile view */}
        {isMobileView && (
          <div className="bg-slate-900 text-white px-6 pt-3 pb-2 flex justify-between items-center text-xs font-medium select-none">
            <span>14:23</span>
            <div className="w-20 h-4 bg-black rounded-full mx-auto"></div>
            <div className="flex items-center gap-1.5">
              <span>5G</span>
              <div className="w-5 h-2.5 border border-white rounded-xs p-0.5 flex items-center">
                <div className="w-full h-full bg-white rounded-2xs"></div>
              </div>
            </div>
          </div>
        )}

        {/* App Content Area */}
        <div className="flex flex-col min-h-[750px] pb-20 relative bg-slate-50">
          
          {selectedShake ? (
            /* --- RECEIPE DETAIL VIEW --- */
            <div className="flex-1 bg-white flex flex-col animate-in fade-in duration-200">
              <div className="relative h-64 bg-slate-900 overflow-hidden">
                <img 
                  src="/src/assets/images/shake_banner_hero_1791926621403.jpg" 
                  alt={selectedShake.name}
                  className="w-full h-full object-cover opacity-80"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                
                <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
                  <button 
                    onClick={() => setSelectedShake(null)}
                    className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/60 transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => toggleFavorite(selectedShake.id)}
                    className={`w-10 h-10 rounded-full backdrop-blur-md flex items-center justify-center transition-colors ${favorites.includes(selectedShake.id) ? 'bg-rose-500 text-white' : 'bg-black/40 text-white hover:bg-black/60'}`}
                  >
                    <Heart className={`w-5 h-5 ${favorites.includes(selectedShake.id) ? 'fill-current' : ''}`} />
                  </button>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="inline-block px-2.5 py-1 bg-emerald-500/90 text-white text-[11px] font-semibold rounded-md mb-2">
                    {selectedShake.category}
                  </div>
                  <h2 className="text-2xl font-bold tracking-tight">{selectedShake.name}</h2>
                  <p className="text-sm text-slate-200 mt-0.5">{selectedShake.subtitle}</p>
                </div>
              </div>

              {/* Recipe Body */}
              <div className="p-6 flex-1 space-y-6 bg-white pb-24">
                
                {/* Meta badges */}
                <div className="grid grid-cols-3 gap-3 py-3 border-y border-slate-100 text-center">
                  <div>
                    <span className="block text-[11px] text-slate-400 font-medium uppercase tracking-wider">Rendimento</span>
                    <span className="text-sm font-semibold text-slate-800">1 Copo</span>
                  </div>
                  <div className="border-x border-slate-100">
                    <span className="block text-[11px] text-slate-400 font-medium uppercase tracking-wider">Preparo</span>
                    <span className="text-sm font-semibold text-slate-800">{selectedShake.prepTime}</span>
                  </div>
                  <div>
                    <span className="block text-[11px] text-slate-400 font-medium uppercase tracking-wider">Proteína Est.</span>
                    <span className="text-sm font-semibold text-emerald-600">{selectedShake.proteinApprox}</span>
                  </div>
                </div>

                {/* Blender interactive simulator card */}
                <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/20">
                      <RefreshCw className={`w-5 h-5 ${isBlending ? 'animate-spin' : ''}`} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-emerald-900">Modo Liquidificador</h4>
                      <p className="text-xs text-emerald-700">
                        {isBlending ? `Batendo... ${blendSeconds}s restantes` : 'Cronômetro de preparo pronto'}
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      setIsBlending(true);
                      setBlendTimerActive(true);
                      setBlendSeconds(45);
                    }}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl transition-colors shadow-sm"
                  >
                    {isBlending ? 'Reiniciar' : 'Preparar'}
                  </button>
                </div>

                {/* Ingredients list */}
                <div>
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">Ingredientes</h3>
                  <ul className="space-y-2.5">
                    {selectedShake.ingredients.map((ing, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-sm text-slate-700 bg-slate-50 px-3.5 py-2.5 rounded-xl border border-slate-100">
                        <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                        <span className="flex-1 font-medium">{ing}</span>
                      </li>
                    ))}
                  </ul>
                  <button 
                    onClick={() => addIngredientsToShopping(selectedShake)}
                    className="mt-3 w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Adicionar ingredientes à Lista de Compras</span>
                  </button>
                </div>

                {/* Preparation steps */}
                <div>
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">Modo de Preparo</h3>
                  <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                    {selectedShake.prep}
                  </p>
                </div>

                {/* Notes & Substitutions */}
                <div className="bg-amber-50/60 border border-amber-200/60 rounded-xl p-4 text-xs text-amber-900 space-y-1.5">
                  <div className="flex items-center gap-1.5 font-semibold text-amber-900">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>Notas & Substituições Possíveis</span>
                  </div>
                  <p className="leading-relaxed">{selectedShake.notes}</p>
                  <p className="text-[11px] text-amber-700 mt-1 italic">
                    Dica: Bebidas vegetais ou tofu podem ser usados para opções sem laticínios. Confira sempre os rótulos.
                  </p>
                </div>

              </div>

              {/* Fixed Bottom Action */}
              <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-md border-t border-slate-100 flex items-center gap-3 z-30 max-w-[430px] mx-auto">
                <button 
                  onClick={() => setSelectedShake(null)}
                  className="flex-1 py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm rounded-xl transition-colors shadow-lg shadow-slate-900/10 text-center"
                >
                  Voltar ao Catálogo
                </button>
              </div>

            </div>
          ) : (
            <>
              {/* --- MAIN TABS VIEWS --- */}
              {activeTab === 'shakes' && (
                <div className="p-4 space-y-4 animate-in fade-in duration-200">
                  
                  {/* Hero Banner Intro */}
                  <div className="relative rounded-2xl bg-gradient-to-r from-emerald-900 to-teal-900 text-white p-5 overflow-hidden shadow-md">
                    <div className="relative z-10 max-w-[240px]">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded-md">Bônus 3</span>
                      <h2 className="text-xl font-bold mt-1.5 leading-tight">15 Shakes Caseiros com Proteína</h2>
                      <p className="text-xs text-emerald-100 mt-1">Receitas simples de liquidificador com ingredientes acessíveis. Sem necessidade de whey.</p>
                    </div>
                    <div className="absolute right-[-20px] bottom-[-20px] w-36 h-36 bg-emerald-500/20 rounded-full blur-2xl"></div>
                  </div>

                  {/* Search Bar */}
                  <div className="relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Buscar por shake ou ingrediente (ex: banana, aveia)..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all placeholder:text-slate-400"
                    />
                  </div>

                  {/* Filter Pills */}
                  <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                    {[
                      { id: 'all', label: 'Todos (15)' },
                      { id: 'leite', label: 'Com Leite' },
                      { id: 'iogurte', label: 'Com Iogurte' },
                      { id: 'sem-laticinios', label: 'Sem Laticínios' },
                      { id: 'banana', label: 'Com Banana' },
                      { id: 'sem-aveia', label: 'Sem Aveia' },
                      { id: 'menos-ingredientes', label: 'Menos Itens' },
                    ].map(f => (
                      <button
                        key={f.id}
                        onClick={() => setActiveFilter(f.id)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${activeFilter === f.id ? 'bg-slate-900 text-white shadow-sm' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>

                  {/* Recipe List */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center px-1">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Receitas Disponíveis ({filteredShakes.length})</span>
                      <button onClick={() => setShowInfoHub(true)} className="text-xs text-emerald-600 font-semibold hover:underline">
                        Aviso Educativo
                      </button>
                    </div>

                    {filteredShakes.length === 0 ? (
                      <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-6">
                        <GlassWater className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                        <h4 className="text-sm font-semibold text-slate-700">Nenhum shake encontrado</h4>
                        <p className="text-xs text-slate-400 mt-1">Tente buscar por outro ingrediente ou remover o filtro.</p>
                      </div>
                    ) : (
                      filteredShakes.map(shake => (
                        <div 
                          key={shake.id}
                          onClick={() => setSelectedShake(shake)}
                          className="bg-white rounded-2xl p-4 border border-slate-200/80 hover:border-emerald-300 transition-all shadow-xs hover:shadow-md cursor-pointer flex items-center justify-between group"
                        >
                          <div className="flex-1 pr-3">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                                #{shake.id} · {shake.category}
                              </span>
                              <span className="text-[11px] text-slate-400">· {shake.prepTime}</span>
                            </div>
                            <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                              {shake.name}
                            </h3>
                            <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{shake.subtitle}</p>
                            <div className="flex items-center gap-2 mt-2 text-[11px] text-slate-600 font-medium">
                              <span>Proteína est.: <strong className="text-emerald-600">{shake.proteinApprox}</strong></span>
                              <span>·</span>
                              <span>{shake.ingredients.length} ingredientes</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleFavorite(shake.id);
                              }}
                              className={`p-2 rounded-xl transition-colors ${favorites.includes(shake.id) ? 'text-rose-500 bg-rose-50' : 'text-slate-300 hover:text-slate-500 bg-slate-50'}`}
                            >
                              <Heart className={`w-4 h-4 ${favorites.includes(shake.id) ? 'fill-current' : ''}`} />
                            </button>
                            <div className="w-8 h-8 rounded-xl bg-slate-100 group-hover:bg-emerald-600 group-hover:text-white flex items-center justify-center transition-colors text-slate-500">
                              <ChevronRight className="w-4 h-4" />
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                </div>
              )}

              {activeTab === 'favorites' && (
                <div className="p-4 space-y-4 animate-in fade-in duration-200">
                  <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
                    <h2 className="text-lg font-bold text-slate-900">Seus Shakes Favoritos</h2>
                    <p className="text-xs text-slate-500 mt-0.5">Acesse rapidamente as receitas que você mais gosta.</p>
                  </div>

                  {favorites.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-6">
                      <Heart className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                      <h4 className="text-base font-bold text-slate-800">Nenhum favorito salvo ainda</h4>
                      <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">Toque no ícone de coração nos shakes do catálogo para salvá-los aqui.</p>
                      <button 
                        onClick={() => setActiveTab('shakes')}
                        className="mt-4 px-4 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-xl hover:bg-emerald-700 transition-colors"
                      >
                        Explorar Catálogo
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {SHAKES_DATA.filter(s => favorites.includes(s.id)).map(shake => (
                        <div 
                          key={shake.id}
                          onClick={() => setSelectedShake(shake)}
                          className="bg-white rounded-2xl p-4 border border-slate-200 hover:border-emerald-300 transition-all shadow-xs cursor-pointer flex items-center justify-between"
                        >
                          <div className="flex-1 pr-3">
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                              #{shake.id} · {shake.category}
                            </span>
                            <h3 className="text-base font-bold text-slate-900 mt-1">{shake.name}</h3>
                            <p className="text-xs text-slate-500">{shake.subtitle}</p>
                          </div>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(shake.id);
                            }}
                            className="p-2 text-rose-500 bg-rose-50 rounded-xl hover:bg-rose-100 transition-colors"
                          >
                            <Heart className="w-4 h-4 fill-current" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'shopping' && (
                <div className="p-4 space-y-4 animate-in fade-in duration-200">
                  <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
                    <h2 className="text-lg font-bold text-slate-900">Lista de Compras</h2>
                    <p className="text-xs text-slate-500 mt-0.5">Ingredientes para preparar seus shakes proteicos.</p>
                  </div>

                  {/* Add custom item */}
                  <form onSubmit={addCustomItem} className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Adicionar ingrediente extra (ex: 1L de leite)..."
                      value={customShoppingItem}
                      onChange={e => setCustomShoppingItem(e.target.value)}
                      className="flex-1 px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    />
                    <button 
                      type="submit"
                      className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1 shadow-sm transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Adicionar</span>
                    </button>
                  </form>

                  {/* Shopping list items */}
                  <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-2">
                    <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Itens na Lista ({shoppingList.length})</span>
                      {shoppingList.length > 0 && (
                        <button 
                          onClick={() => setShoppingList([])}
                          className="text-xs text-rose-600 font-medium hover:underline"
                        >
                          Limpar tudo
                        </button>
                      )}
                    </div>

                    {shoppingList.length === 0 ? (
                      <div className="text-center py-10 text-slate-400">
                        <ShoppingBag className="w-10 h-10 mx-auto mb-2 text-slate-300" />
                        <p className="text-sm font-medium">Sua lista de compras está vazia.</p>
                        <p className="text-xs mt-0.5">Adicione ingredientes a partir das receitas do catálogo.</p>
                      </div>
                    ) : (
                      <ul className="space-y-2 pt-1">
                        {shoppingList.map((item, idx) => (
                          <li key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 text-sm">
                            <span className="font-medium text-slate-800">{item}</span>
                            <button 
                              onClick={() => removeShoppingItem(idx)}
                              className="text-slate-400 hover:text-rose-600 p-1 rounded-lg transition-colors"
                              title="Remover item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Economy tips card */}
                  <div className="bg-teal-50 border border-teal-100 rounded-2xl p-4 text-xs text-teal-900 space-y-2">
                    <h4 className="font-bold flex items-center gap-1.5 text-teal-950">
                      <Sparkles className="w-4 h-4 text-teal-600" />
                      <span>Trocas simples para economizar</span>
                    </h4>
                    <p className="leading-relaxed">
                      Prefira frutas da estação ou congeladas (banana e mamão combinam com vários itens). Use aveia, iogurte natural e pasta de amendoim em mais de uma receita para reduzir itens na compra.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'workouts' && (
                <div className="p-4 space-y-4 animate-in fade-in duration-200">
                  <div className="relative rounded-2xl overflow-hidden bg-slate-900 text-white p-5 shadow-md">
                    <img 
                      src="/src/assets/images/workout_banner_1791926622158.jpg" 
                      alt="Treinos" 
                      className="absolute inset-0 w-full h-full object-cover opacity-60"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>
                    <div className="relative z-10">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded-md">Saúde & Bem-Estar</span>
                      <h2 className="text-xl font-bold mt-1.5 leading-tight">Treinos Personalizados</h2>
                      <p className="text-xs text-slate-200 mt-1">Rotinas práticas para acompanhar sua saúde e disposição diária.</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center px-1">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Planos Disponíveis ({WORKOUTS_DATA.length})</span>
                    </div>

                    {WORKOUTS_DATA.map(w => {
                      const isCompleted = completedWorkouts.includes(w.id);
                      return (
                        <div key={w.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                                {w.category} · {w.duration}
                              </span>
                              <h3 className="text-base font-bold text-slate-900 mt-1.5">{w.title}</h3>
                              <p className="text-xs text-slate-500 mt-0.5">{w.description}</p>
                            </div>
                            <button 
                              onClick={() => {
                                setCompletedWorkouts(prev => 
                                  isCompleted ? prev.filter(id => id !== w.id) : [...prev, w.id]
                                );
                              }}
                              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${isCompleted ? 'bg-emerald-600 text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>{isCompleted ? 'Concluído' : 'Marcar Feito'}</span>
                            </button>
                          </div>

                          <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 space-y-2">
                            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Exercícios do Circuito</span>
                            <ul className="space-y-1.5">
                              {w.exercises.map((ex, idx) => (
                                <li key={idx} className="flex justify-between items-center text-xs text-slate-700">
                                  <span className="font-medium">{ex.name}</span>
                                  <span className="text-slate-500 font-mono">{ex.reps} (descanso {ex.rest})</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {activeTab === 'wellness' && (
                <div className="p-4 space-y-4 animate-in fade-in duration-200">
                  <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
                    <h2 className="text-lg font-bold text-slate-900">Monitor de Hidratação & Bem-Estar</h2>
                    <p className="text-xs text-slate-500 mt-0.5">Acompanhe seus hábitos diários para uma rotina saudável.</p>
                  </div>

                  {/* Water Tracker */}
                  <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                          <Droplet className="w-5 h-5 fill-current" />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-slate-900">Hidratação Diária</h3>
                          <p className="text-xs text-slate-500">Meta recomendada: 8 copos (2L)</p>
                        </div>
                      </div>
                      <span className="text-sm font-bold text-blue-600 font-mono">{waterCups} / 8 copos</span>
                    </div>

                    <div className="flex gap-2 justify-between pt-1">
                      {[1, 2, 3, 4, 5, 6, 7, 8].map(cup => (
                        <button
                          key={cup}
                          onClick={() => setWaterCups(cup)}
                          className={`flex-1 h-10 rounded-xl flex items-center justify-center transition-all ${cup <= waterCups ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30 font-bold' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'}`}
                        >
                          {cup}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Hygiene and Conservation Guide */}
                  <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
                    <div className="flex items-center gap-2 text-slate-900 font-bold">
                      <ShieldAlert className="w-5 h-5 text-emerald-600" />
                      <h4>Higiene e Conservação dos Shakes</h4>
                    </div>
                    <ul className="space-y-2 text-xs text-slate-600">
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold">•</span>
                        <span>Lave as mãos, as frutas e o liquidificador antes de iniciar o preparo.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold">•</span>
                        <span>Use leite pasteurizado e confira o prazo de validade na embalagem.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold">•</span>
                        <span>O ideal é consumir a bebida logo após o preparo. Se guardar, mantenha em geladeira por no máximo 2 horas em recipiente fechado.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold">•</span>
                        <span>Não coloque ovo cru, farinha crua ou ingredientes sem indicação para consumo direto.</span>
                      </li>
                    </ul>
                  </div>

                  {/* Educational responsibility box */}
                  <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 space-y-2">
                    <h4 className="font-bold flex items-center gap-1.5 text-amber-950">
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                      <span>Aviso Educativo Importante</span>
                    </h4>
                    <p className="leading-relaxed">
                      Este material traz receitas gerais, não um plano alimentar individualizado. Não promete ganho de massa muscular ou resultados específicos. A resposta depende da alimentação total, treino, saúde e rotina. Pessoas com doença renal ou restrições devem consultar um profissional.
                    </p>
                  </div>
                </div>
              )}

              {/* Fixed Bottom Navigation Bar (Mobile Touch Pattern) */}
              <nav className="absolute bottom-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-md border-t border-slate-200 grid grid-cols-5 items-center z-40 px-2">
                {[
                  { id: 'shakes', label: 'Shakes', icon: GlassWater },
                  { id: 'favorites', label: 'Favoritos', icon: Heart },
                  { id: 'shopping', label: 'Compras', icon: ShoppingBag },
                  { id: 'workouts', label: 'Treinos', icon: Dumbbell },
                  { id: 'wellness', label: 'Bem-Estar', icon: Activity },
                ].map(tab => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id as any);
                        setSelectedShake(null);
                      }}
                      className={`flex flex-col items-center justify-center h-full transition-colors ${isActive ? 'text-emerald-600 font-semibold' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                      <Icon className={`w-5 h-5 ${isActive ? 'fill-emerald-50 text-emerald-600' : ''}`} />
                      <span className="text-[10px] tracking-tight mt-1">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </>
          )}

        </div>
      </div>

      {/* Educational Hub Modal */}
      {showInfoHub && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[85vh] overflow-y-auto p-6 space-y-4 shadow-2xl relative">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Info className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Aviso Educativo & Diretrizes</h3>
              </div>
              <button 
                onClick={() => setShowInfoHub(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
              <p>
                As receitas deste aplicativo utilizam alimentos que contêm proteína; isso <strong>não significa que todas tenham a mesma quantidade</strong>, nem que substituam um suplemento ou refeição completa. A necessidade proteica varia entre pessoas, e boa parte é obtida de alimentos comuns como leite, iogurte, ovos, feijões e tofu. Proteína em pó não é obrigatória.
              </p>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2">
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Aviso Médico & Alergias</h4>
                <p className="text-xs">
                  Confira os ingredientes antes de preparar. Não use alimentos aos quais tenha alergia ou intolerância. Pessoas com doença renal ou condições que exijam controle alimentar devem buscar orientação profissional. Se leite causar desconforto, teste alternativas sem lactose apenas se não houver alergia à proteína do leite.
                </p>
              </div>

              <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100 text-xs text-emerald-900 space-y-2">
                <h4 className="font-bold uppercase tracking-wider">Guia Alimentar Brasileiro</h4>
                <p>
                  O Guia Alimentar brasileiro recomenda que alimentos in natura ou minimamente processados sejam a base da alimentação. Por isso, estas receitas priorizam ingredientes comuns do dia a dia.
                </p>
              </div>
            </div>

            <button 
              onClick={() => setShowInfoHub(false)}
              className="w-full py-3 bg-slate-900 text-white font-semibold text-xs rounded-xl hover:bg-slate-800 transition-colors shadow-sm"
            >
              Compreendido
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
