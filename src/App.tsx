import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { 
  Lock, 
  ChevronDown, 
  Instagram, 
  Youtube, 
  Facebook, 
  Send,
  MessageCircle,
  Menu,
  X,
  Globe
} from "lucide-react";
import { useState, useEffect, ReactNode, useRef } from "react";
import { CONTENT } from "./constants/content";
import { CheckoutDrawer } from "./components/CheckoutDrawer";
import { GoldButton } from "./components/GoldButton";

const SectionLabel = ({ children, center = false }: { children: ReactNode, center?: boolean }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={`flex items-center gap-2 mb-2 ${center ? "justify-center" : ""}`}
  >
    <div className="h-[1px] w-8 bg-gold-500/50" />
    <span className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] text-gold-200/70 uppercase">
      {children}
    </span>
    {center && <div className="h-[1px] w-8 bg-gold-500/50" />}
  </motion.div>
);

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [ytSubs, setYtSubs] = useState(CONTENT.socials.links.find(l => l.platform === "YouTube")?.followers || "3,28 Milhões");

  // Dynamic delivery date
  const formattedDeliveryDate = "08/06/2026";

  const heroRef = useRef(null);

  const { scrollYProgress: heroScrollY } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroParallaxY = useTransform(heroScrollY, [0, 1], ["0%", "30%"]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    
    // Fetch dynamic YouTube subs
    const fetchYTSubs = async () => {
      try {
        const res = await fetch("/api/youtube-subs");
        const data = await res.json();
        if (data.subscribers) setYtSubs(data.subscribers);
      } catch (err) {
        console.error("Failed to fetch YT subs:", err);
      }
    };
    
    fetchYTSubs();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen selection:bg-gold-500/30">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-gold-900/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-gold-900/5 blur-[120px] rounded-full" />
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "glass border-b border-gold-500/20 py-3" : "py-6"}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center">
          </div>

          <div className="hidden md:flex items-center gap-10">
            {CONTENT.nav.map((item) => (
              <motion.a 
                key={item.label} 
                href={item.href}
                whileHover={{ 
                  color: "#d4af37",
                  textShadow: "0 0 8px rgba(212, 175, 55, 0.8)",
                  scale: 1.05
                }}
                className="text-xs font-medium tracking-[0.2em] text-white transition-colors"
              >
                {item.label}
              </motion.a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <GoldButton 
              className="hidden sm:flex py-2 px-4 h-auto text-[10px] font-bold tracking-[0.2em] border-gold-500/30"
              onClick={() => setIsCartOpen(true)}
            >
              COMPRAR AGORA
            </GoldButton>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-gold-200"
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 z-40 glass md:hidden flex flex-col items-center justify-center gap-8"
          >
            {CONTENT.nav.map((item) => (
              <a 
                key={item.label} 
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-xl font-serif gold-text tracking-widest"
              >
                {item.label}
              </a>
            ))}
            <button 
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsCartOpen(true);
              }}
              className="gold-gradient text-black px-8 py-3 rounded-md font-bold tracking-widest text-center"
            >
              COMPRAR AGORA
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-24 pb-20 md:pt-32 md:pb-32 px-6 overflow-hidden">
        {/* Parallax Background Decor */}
        <motion.div 
          style={{ y: heroParallaxY }}
          className="absolute inset-0 pointer-events-none z-0"
        >
        </motion.div>


        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-12">
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block text-gold-500 font-bold tracking-[0.3em] text-xs md:text-sm mb-6 uppercase bg-gold-500/5 px-6 py-2 rounded-full border border-gold-500/20 backdrop-blur-sm"
              >
                PRÉ-VENDA EXCLUSIVA DO LIVRO
              </motion.span>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.85] mb-8 text-white uppercase tracking-tighter text-center"
              >
                FALA <span className="gold-text">GLAUBER</span>
              </motion.h1>

              {/* Book Image for Mobile */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="lg:hidden mb-12 flex justify-center perspective-1000"
              >
                <div className="relative group max-w-[280px]">
                  {/* Glow Effect behind image */}
                  <div className="absolute inset-0 bg-gold-500/10 blur-[40px] rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 -z-10" />
                  
                  <div className="relative rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(212,175,55,0.1)] border border-gold-500/40 bg-black/20 group-hover:border-gold-500/60 group-hover:shadow-[0_0_60px_rgba(212,175,55,0.2)] transition-all duration-500 group-hover:scale-[1.02]">
                    <img 
                      src={CONTENT.hero.bookImage} 
                      alt="Book Cover Mobile" 
                      referrerPolicy="no-referrer"
                      className="w-full h-auto block"
                    />
                  </div>
                </div>
              </motion.div>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-white text-base md:text-xl max-w-xl mx-auto leading-relaxed font-light italic"
              >
                Conheça o homem que comanda o podcast com 1 bilhão e meio de views e nenhuma concessão!
              </motion.p>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex flex-col items-center group w-full sm:w-[320px]">
                {/* Preço e Frete - Centralizados com o botão */}
                <div className="space-y-1 mb-6 text-white/60 text-center w-full">
                  <div className="flex items-center justify-center gap-2 flex-wrap">
                    <p className="text-sm">
                      De: <span className="line-through">{CONTENT.hero.oldPrice}</span> * Por: <span className="text-gold-300 font-bold text-lg">{CONTENT.hero.newPrice}</span>
                    </p>
                    <span className="bg-gold-500 text-black text-[10px] font-black px-1.5 py-0.5 rounded-sm tracking-tighter shadow-lg shadow-gold-500/20">{CONTENT.hero.discountPercent}</span>
                  </div>
                  <p className="text-xs tracking-[0.1em] text-gold-200/80 uppercase font-semibold">
                    + {CONTENT.hero.shipping}
                  </p>
                </div>

                <GoldButton 
                  primary 
                  icon={Lock} 
                  className="w-full"
                  onClick={() => setIsCartOpen(true)}
                >
                  {CONTENT.hero.cta}
                </GoldButton>
                <p className="mt-8 text-[11px] tracking-[0.3em] text-center w-full">
                  <span className="text-white">Entrega prevista para:</span> <span className="gold-text font-black ml-1">{formattedDeliveryDate}</span>
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="hidden lg:flex relative justify-center perspective-1000"
          >
            <div className="relative group">
              {/* Glow Effect behind image - desktop */}
              <div className="absolute -inset-4 bg-gold-500/10 blur-[50px] rounded-full opacity-30 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 -z-10" />
              
              {/* Frame do site */}
              <motion.div 
                className="relative rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(212,175,55,0.1)] border border-gold-500/40 bg-black/20 group-hover:border-gold-500/60 group-hover:shadow-[0_0_60px_rgba(212,175,55,0.2)] transition-all duration-500"
              >
                <motion.img 
                  src={CONTENT.hero.bookImage} 
                  alt="Luxury Book Cover" 
                  referrerPolicy="no-referrer"
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="relative w-full max-w-[400px] block cursor-pointer group-hover:scale-[1.03] transition-all duration-500"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-12 flex flex-col items-center gap-2 opacity-50 relative z-20"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <ChevronDown className="w-16 h-16 text-gold-500" />
        </motion.div>
      </section>

      {/* Childhood Dreams / Impact Block */}
      <section id="infancia" className="pt-20 pb-0 md:pt-32 md:pb-0 px-6 bg-black/44">
        <div className="max-w-7xl mx-auto">
          {/* Impact Text Box - Styled to match site aesthetic */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="-mt-12 mb-24 p-8 md:p-16 rounded-3xl gold-border bg-black/60 backdrop-blur-xl text-white shadow-2xl max-w-5xl mx-auto flex flex-col items-center relative overflow-hidden"
          >
            {/* Subtle glow effect */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-gold-500/10 blur-[100px] rounded-full" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-gold-500/10 blur-[100px] rounded-full" />

            <h3 className="text-xl md:text-2xl font-bold tracking-[0.3em] gold-text mb-8 uppercase text-center font-serif italic">
              SONHOS DE INFÂNCIA
            </h3>
            
            <p className="text-lg md:text-2xl font-light leading-relaxed text-justify mb-12 max-w-4xl text-white/90 font-serif italic">
              "Minha infância foi sonhando em ser jogador de futebol. Eu era mais um dos milhares de jovens do subúrbio
              que via no futebol uma forma de sair daquela realidade de pobreza e brilhar fazendo o que amava. Não
              esqueço o dia, eu com 11 anos atravessando a ponte para treinar, estava sozinho. Naquela época treinava
              no sub-11 do Flamengo e todos os dias saía de São Gonçalo sozinho para buscar esse sonho. Não esqueço o
              dia que passou um comboio com viaturas lindas e eu cheguei para meu pai: <span className="gold-text">'Caraca, pai, eu vi uma polícia
              diferente, preta, dourada, que polícia é essa?'</span>, <span className="text-white/60">'Essa é a Polícia Federal'</span>. Eu falei: <span className="gold-text">'Caramba, então esses
              são os mais brabos do Brasil'</span>. Eu tinha apenas 11 anos e ali já nascia a chama que queimaria no meu
              coração anos depois."
            </p>

            <div className="flex flex-col items-center group w-full sm:w-[320px] mx-auto gap-6 transition-all duration-300">
              <GoldButton
                primary
                icon={Lock}
                className="w-full"
                onClick={() => setIsCartOpen(true)}
              >
                GARANTA SEU EXEMPLAR
              </GoldButton>
              <span className="text-white text-[11px] italic font-light tracking-[0.2em] uppercase text-center w-full block">
                Entrega prevista para: <span className="gold-text font-bold ml-1">{formattedDeliveryDate}</span>
              </span>
            </div>
          </motion.div>
          
          <div id="sinopse" className="text-center mb-8 md:mb-12 scroll-mt-24">
            <SectionLabel center>{CONTENT.synopsis.label}</SectionLabel>
            <h2 className="font-serif text-4xl md:text-6xl font-bold tracking-tight">
              {CONTENT.synopsis.title}
            </h2>
          </div>

          {/* Consolidated Synopsis: Photo Left, Text Right */}
          <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-8 lg:gap-16 items-stretch mb-8 md:mb-12">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-full group"
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gold-500/10 blur-[30px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
              
              <div className="absolute -inset-1 gold-gradient rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
              <div className="relative rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(212,175,55,0.1)] border border-gold-500/40 bg-black/20 group-hover:border-gold-500/60 group-hover:shadow-[0_0_60px_rgba(212,175,55,0.2)] transition-all duration-500 group-hover:scale-[1.02] h-full">
                <img 
                  src="https://i.imgur.com/rUhW0MI.png" 
                  alt="Glauber" 
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
            
            <div className="flex flex-col justify-between py-2">
              {CONTENT.synopsis.paragraphs.map((p, i) => (
                <motion.p 
                  key={i}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-[18px] text-white font-light leading-relaxed text-justify font-[system-ui]"
                >
                  {p}
                </motion.p>
              ))}
            </div>
          </div>

        </div>
      </section>
      
      {/* Origin Section */}
      <section id="origem" className="pt-10 pb-20 md:pt-16 md:pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 md:mb-24">
            <SectionLabel center>{CONTENT.origin.label}</SectionLabel>
            <h2 className="font-serif text-4xl md:text-6xl font-bold tracking-tight uppercase">
              {CONTENT.origin.title}
            </h2>
          </div>

          <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-8 lg:gap-16 items-stretch">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-full aspect-[4/5] lg:aspect-auto group"
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gold-500/10 blur-[30px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
              
              <div className="absolute -inset-1 gold-gradient rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
              <div className="relative rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(212,175,55,0.1)] border border-gold-500/40 bg-black/20 group-hover:border-gold-500/60 group-hover:shadow-[0_0_60px_rgba(212,175,55,0.2)] transition-all duration-500 group-hover:scale-[1.02] h-full">
                <img 
                  src="https://i.imgur.com/BM4LDG4.png" 
                  alt="Origem Glauber" 
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
            
            <div className="flex flex-col justify-between py-2">
              <div className="space-y-8">
                {CONTENT.origin.paragraphs.map((p, i) => (
                  <motion.p 
                    key={i}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="text-[18px] text-white font-light leading-relaxed text-justify font-[system-ui]"
                  >
                    {p}
                  </motion.p>
                ))}
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mt-12">
                <motion.div 
                  whileHover={!isPlayingVideo ? { scale: 1.02 } : {}}
                  className="relative group rounded-xl overflow-hidden gold-border bg-black aspect-video flex items-center justify-center font-sans"
                >
                  {!isPlayingVideo ? (
                    <>
                      <img 
                        src={CONTENT.synopsis.videoPlaceholder} 
                        alt="Video Placeholder" 
                        className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 cursor-pointer" 
                        referrerPolicy="no-referrer"
                        onClick={() => setIsPlayingVideo(true)}
                      />
                      <div 
                        className="absolute inset-0 flex items-center justify-center cursor-pointer"
                        onClick={() => setIsPlayingVideo(true)}
                      >
                        <div className="w-16 h-16 rounded-full glass border border-gold-500/50 flex items-center justify-center group-hover:bg-gold-500 transition-colors">
                          <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent ml-1" />
                        </div>
                      </div>
                      <div className="absolute bottom-4 left-4 text-[10px] tracking-[0.2em] font-bold pointer-events-none">VÍDEO DE APRESENTAÇÃO</div>
                    </>
                  ) : (
                    <video 
                      className="w-full h-full" 
                      controls 
                      autoPlay 
                      playsInline
                      preload="auto"
                      onEnded={() => setIsPlayingVideo(false)}
                    >
                      <source src={CONTENT.synopsis.videoUrl} type="video/mp4" />
                      Seu navegador não suporta vídeos.
                    </video>
                  )}
                </motion.div>

                <div className="flex flex-col justify-center p-6 gold-border rounded-xl bg-gold-900/5">
                  <div className="flex items-center gap-4 mb-2">
                    <Globe className="w-5 h-5 text-gold-500" />
                    <span className="text-[10px] tracking-widest text-white/40 uppercase">IDIOMA</span>
                  </div>
                  <div className="text-xl font-serif gold-text">{CONTENT.synopsis.language}</div>
                </div>
              </div>

              <div className="flex flex-col items-center gap-6 mt-12">
                <div className="w-fit flex flex-col items-center gap-6">
                  <GoldButton
                    primary
                    icon={Lock}
                    onClick={() => setIsCartOpen(true)}
                    className="w-full"
                  >
                    {CONTENT.origin.cta}
                  </GoldButton>
                  
                  <p className="text-[10px] tracking-[0.3em] uppercase whitespace-nowrap">
                    <span className="text-white">Entrega prevista para:</span> <span className="gold-text font-black ml-1 uppercase">{CONTENT.origin.deliveryDate}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>


        </div>
      </section>

      {/* Mano Valter Section */}
      <section id="mano-valter" className="pt-0 pb-20 md:pb-32 px-6">
        <div className="max-w-7xl mx-auto -mt-16 relative z-10">
          <div className="text-center mb-16 md:mb-24">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-8 bg-gold-500/50" />
              <span className="gold-text text-sm font-bold tracking-[0.4em] uppercase">
                {CONTENT.manoValter.title}
              </span>
              <div className="h-px w-8 bg-gold-500/50" />
            </div>
            <h2 className="font-serif text-4xl md:text-6xl font-bold tracking-tight uppercase">
              MEU BRAÇO DIREITO
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col items-center">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative aspect-[4/5] w-full max-w-[500px] mb-12 group"
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gold-500/10 blur-[40px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
                
                <div className="absolute -inset-2 gold-gradient rounded-3xl blur-md opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                <div className="relative rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(212,175,55,0.1)] border border-gold-500/40 bg-black/20 group-hover:border-gold-500/60 group-hover:shadow-[0_0_60px_rgba(212,175,55,0.2)] transition-all duration-500 group-hover:scale-[1.02] h-full">
                  <img 
                    src={CONTENT.manoValter.image} 
                    alt={CONTENT.manoValter.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>

              <div className="space-y-8 w-full text-[18px]">
                {CONTENT.manoValter.paragraphs.map((p, i) => (
                  <motion.p 
                    key={i}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="text-[18px] text-white font-light leading-relaxed text-justify font-[system-ui]"
                  >
                    {p}
                  </motion.p>
                ))}
              </div>

              <div className="flex flex-col items-center gap-6 mt-12">
                <GoldButton
                  primary
                  icon={Lock}
                  onClick={() => setIsCartOpen(true)}
                >
                  {CONTENT.manoValter.cta}
                </GoldButton>
                
                <p className="text-[10px] tracking-[0.3em] uppercase">
                  <span className="text-white">Entrega prevista para:</span> <span className="gold-text font-black ml-1 uppercase">{CONTENT.manoValter.deliveryDate}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* People Content Section */}
      <section id="pessoas" className="relative py-24 md:py-32 overflow-hidden bg-[#050505]">
        {/* Subtle Background Decor */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-1/2 left-0 w-[40%] h-[40%] bg-gold-900/10 blur-[120px] rounded-full translate-y-[-50%]" />
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.03)_0%,transparent_70%)]" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 -mt-24">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Título Mobile Header */}
            <div className="lg:hidden text-center mb-8">
              <div className="mt-4">
                <SectionLabel center={true}>CONTEÚDO E PÚBLICO</SectionLabel>
              </div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-white leading-tight uppercase tracking-tight">
                {CONTENT.peopleContent.title}
              </h2>
            </div>

            {/* Content Side */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center order-3 lg:order-1"
            >
              <div className="hidden lg:block">
                <div className="mt-4">
                  <SectionLabel center={true}>CONTEÚDO E PÚBLICO</SectionLabel>
                </div>
                <h2 className="font-serif text-2xl md:text-3xl font-bold mb-8 text-white leading-tight uppercase tracking-tight">
                  {CONTENT.peopleContent.title}
                </h2>
              </div>
              
              <div className="space-y-6 text-white text-[18px] font-light leading-relaxed mb-10 text-justify font-[system-ui]">
                {CONTENT.peopleContent.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <div className="flex flex-col items-center gap-6">
                <GoldButton 
                  primary 
                  className="px-12"
                  onClick={() => setIsCartOpen(true)}
                >
                  {CONTENT.peopleContent.cta}
                </GoldButton>
                
                <div className="flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase">
                  <span className="text-white">Entrega prevista:</span> 
                  <span className="gold-text font-black">{CONTENT.peopleContent.deliveryDate}</span>
                </div>
              </div>
            </motion.div>

            {/* Image Side */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative z-0 mb-12 lg:mb-0 order-2 lg:order-2 group"
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gold-500/10 blur-[40px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
              
              <div className="rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(212,175,55,0.1)] border border-gold-500/40 bg-black/20 group-hover:border-gold-500/60 group-hover:shadow-[0_0_60px_rgba(212,175,55,0.2)] transition-all duration-500 group-hover:scale-[1.02]">
                <img 
                  src={CONTENT.peopleContent.image} 
                  alt={CONTENT.peopleContent.title}
                  className="w-full h-auto block"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gold-500/10 blur-2xl rounded-full -z-10" />
            </motion.div> 
          </div>
        </div>
      </section>

      {/* Author Section */}
      <section id="autor" className="pt-0 pb-20 md:pb-32 px-6 scroll-mt-24">
        <div className="max-w-7xl mx-auto -mt-12 relative z-10">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Título Mobile Header */}
            <div className="lg:hidden text-center mb-8">
              <div className="mt-4">
                <SectionLabel center={true}>{CONTENT.author.label}</SectionLabel>
              </div>
              <h2 className="font-serif text-4xl md:text-6xl font-bold mb-4">{CONTENT.author.title}</h2>
              <div className="gold-text font-serif text-2xl mb-4 italic">{CONTENT.author.name}</div>
            </div>

            {/* Image Side */}
            <div className="relative mb-12 lg:mb-0 order-2 lg:order-1 group">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gold-500/10 blur-[40px] rounded-full opacity-20 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(212,175,55,0.1)] border border-gold-500/40 bg-black/20 group-hover:border-gold-500/60 group-hover:shadow-[0_0_60px_rgba(212,175,55,0.2)] transition-all duration-500 group-hover:scale-[1.02] w-full max-w-md mx-auto lg:ml-0">
                <img 
                  src={CONTENT.author.image} 
                  alt={CONTENT.author.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-auto block"
                />
              </div>
            </div>

            {/* Content Side */}
            <div className="flex flex-col items-center text-center order-3 lg:order-2">
              <div className="hidden lg:block">
                <div className="mt-4">
                  <SectionLabel center={true}>{CONTENT.author.label}</SectionLabel>
                </div>
                <h2 className="font-serif text-4xl md:text-6xl font-bold mb-4">{CONTENT.author.title}</h2>
                <div className="gold-text font-serif text-2xl mb-8 italic">{CONTENT.author.name}</div>
              </div>
              
              <div className="space-y-6 text-white text-[18px] text-justify font-light leading-relaxed mb-10 font-[system-ui]">
                {CONTENT.author.bio.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <div className="flex flex-col items-center gap-6">
                <GoldButton 
                  primary 
                  className="px-12"
                  onClick={() => setIsCartOpen(true)}
                >
                  {CONTENT.author.cta}
                </GoldButton>
                
                <div className="flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase">
                  <span className="text-white">Entrega prevista:</span> 
                  <span className="gold-text font-black">{CONTENT.author.deliveryDate}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="missao" className="pt-20 pb-20 md:pb-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-24">
            <div className="flex justify-center mb-4">
              <SectionLabel center={true}>O PROPÓSITO</SectionLabel>
            </div>
            <h2 className="font-serif text-4xl md:text-6xl font-bold text-white uppercase tracking-tighter">
              {CONTENT.mission.title}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image Side - Positioned below title on mobile, right on desktop */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="order-1 md:order-2 relative w-full group"
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gold-500/10 blur-[30px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
              
              <div className="absolute -inset-1 gold-gradient rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
              <div className="relative rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(212,175,55,0.1)] border border-gold-500/40 bg-black/20 group-hover:border-gold-500/60 group-hover:shadow-[0_0_60px_rgba(212,175,55,0.2)] transition-all duration-500 group-hover:scale-[1.02]">
                <img 
                  src={CONTENT.mission.image} 
                  alt="A Minha Missão" 
                  referrerPolicy="no-referrer"
                  className="w-full h-auto block"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gold-500/10 blur-2xl rounded-full -z-10" />
            </motion.div>

            {/* Content Side - Positioned below image on mobile, left on desktop */}
            <div className="order-2 md:order-1 flex flex-col justify-center">
              <div className="space-y-6 text-white text-[18px] text-justify font-light leading-relaxed mb-10 font-[system-ui]">
                {CONTENT.mission.paragraphs.map((p, i) => (
                  <motion.p 
                    key={i}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    {p}
                  </motion.p>
                ))}
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="flex flex-col items-center gap-6"
              >
                <GoldButton 
                  primary 
                  className="px-16"
                  onClick={() => setIsCartOpen(true)}
                >
                  {CONTENT.mission.cta}
                </GoldButton>
                
                <div className="flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase">
                  <span className="text-white">Entrega prevista:</span> 
                  <span className="gold-text font-black">{CONTENT.mission.deliveryDate}</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Transformation Section */}
      <section id="transformacao" className="pt-20 pb-20 md:pb-32 px-6 overflow-hidden bg-zinc-950/30">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-24">
            <div className="flex justify-center mb-4">
              <SectionLabel center={true}>{CONTENT.extraTopic?.label}</SectionLabel>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-white uppercase tracking-tighter">
              {CONTENT.extraTopic?.title}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image Side - Left on desktop, Top on mobile */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative w-full group order-1 md:order-1"
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gold-500/10 blur-[30px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
              
              <div className="absolute -inset-1 gold-gradient rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500 scale-[0.9] group-hover:scale-[0.95]" />
              <div className="relative rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(212,175,55,0.1)] border-2 border-gold-500/40 bg-black/20 group-hover:border-gold-500/60 group-hover:shadow-[0_0_60px_rgba(212,175,55,0.2)] transition-all duration-500 scale-[0.9] group-hover:scale-[0.95]">
                <img 
                  src={CONTENT.extraTopic?.image} 
                  alt={CONTENT.extraTopic?.title} 
                  referrerPolicy="no-referrer"
                  className="w-full h-auto block"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gold-500/10 blur-2xl rounded-full -z-10" />
            </motion.div>

            {/* Content Side - Right on desktop, Bottom on mobile */}
            <div className="flex flex-col justify-center order-2 md:order-2">
              <div className="space-y-6 text-white text-[18px] text-justify font-light leading-relaxed mb-10 font-[system-ui]">
                {CONTENT.extraTopic?.paragraphs.map((p, i) => (
                  <motion.p 
                    key={i}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    {p}
                  </motion.p>
                ))}
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="flex flex-col items-center gap-6"
              >
                <GoldButton 
                  primary 
                  className="px-16"
                  onClick={() => setIsCartOpen(true)}
                >
                  {CONTENT.extraTopic?.cta}
                </GoldButton>
                
                <div className="flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase">
                  <span className="text-white">Entrega prevista:</span> 
                  <span className="gold-text font-black">{CONTENT.extraTopic?.deliveryDate}</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Grid */}
      <section className="py-20 md:py-32 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex flex-col items-center mb-16">
             <SectionLabel center>{CONTENT.socials.title}</SectionLabel>
             <h2 className="font-serif text-4xl md:text-6xl font-bold mb-6 italic">{CONTENT.socials.subtitle}</h2>
             <p className="text-white max-w-lg">{CONTENT.socials.description}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CONTENT.socials.links.map((link) => (
              <motion.a
                key={link.platform}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ 
                  y: -10, 
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(212, 175, 55, 0.1)",
                  borderColor: "rgba(212, 175, 55, 0.6)"
                }}
                className="group p-8 glass gold-border rounded-2xl flex flex-col items-center gap-4 transition-all duration-300 hover:bg-gold-500/10"
              >
                <div className="w-16 h-16 rounded-full bg-gold-900/20 flex items-center justify-center group-hover:scale-115 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-500">
                  {link.platform === "Instagram" && <Instagram className="w-8 h-8 text-gold-500 group-hover:text-gold-300 transition-colors" />}
                  {link.platform === "YouTube" && <Youtube className="w-8 h-8 text-gold-500 group-hover:text-gold-300 transition-colors" />}
                  {link.platform === "TikTok" && <div className="w-8 h-8 text-gold-500 flex items-center justify-center font-bold text-xl group-hover:text-gold-300 transition-colors">T</div>}
                  {link.platform === "Facebook" && <Facebook className="w-8 h-8 text-gold-500 group-hover:text-gold-300 transition-colors" />}
                </div>
                <div className="font-bold tracking-widest text-[10px] text-white/40 uppercase">{link.platform}</div>
                <div className="font-serif text-xl">
                  {link.platform === "YouTube" ? ytSubs : link.followers}
                </div>
                <div className="text-xs text-gold-500/60">{link.handle}</div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <footer id="contato" className="py-20 px-6 border-t border-white/10 bg-black min-h-[355px] text-[16px] scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 items-center gap-12 w-full mb-20 pl-4 text-justify font-normal font-sans leading-[22px] text-[16px] max-w-[989px] mx-auto border-0">
            <div className="flex flex-col gap-1.5 text-center">
              <p className="text-[12px] font-normal tracking-[.3em] text-white uppercase">{CONTENT.contact.footerInfo.company}</p>
              <p className="text-[12px] tracking-[.3em] text-white uppercase">{CONTENT.contact.footerInfo.cnpj}</p>
            </div>
            
            <div className="flex flex-col items-center group">
              <div className="absolute inset-0 bg-gold-500/5 blur-[40px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
              <img 
                src="https://i.imgur.com/CpKEy5k.png" 
                alt="Piovan Editora" 
                className="opacity-100 scale-110 transform-gpu group-hover:scale-120 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="flex flex-col gap-1.5 text-center">
              <p className="text-[12px] font-normal tracking-[.3em] text-white uppercase leading-[20px] h-[42px] flex items-center justify-center">{CONTENT.contact.footerInfo.service}</p>
              <p className="text-[12px] font-normal tracking-[.3em] text-white uppercase">{CONTENT.contact.footerInfo.phone}</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 text-[8px] tracking-[.4em] text-white uppercase font-medium border-t border-white/5 pt-12">
            <p className="text-center leading-[17px] text-white h-[16px] font-sans">
              © 2026 FALA GLAUBER — PODCAST. TODOS OS DIREITOS RESERVADOS ®
            </p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <motion.a
        href={CONTENT.contact.whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ 
          scale: 1.1, 
          boxShadow: "0 0 30px rgba(212, 175, 55, 0.8)",
          filter: "brightness(1.1)" 
        }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 w-12 h-12 bg-gold-500 rounded-full flex items-center justify-center shadow-2xl z-50 text-black p-3"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </motion.a>

      <CheckoutDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
      />
    </div>
  );
}
