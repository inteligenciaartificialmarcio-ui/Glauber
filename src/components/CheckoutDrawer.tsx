import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Tag, Lock, Plus, Minus, ShieldCheck, ChevronDown } from 'lucide-react';
import { CONTENT } from '../constants/content';
import { GoldButton } from './GoldButton';

interface CheckoutDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutDrawer: React.FC<CheckoutDrawerProps> = ({ isOpen, onClose }) => {
  const [items, setItems] = useState([{ id: 1, quantity: 1 }]);
  const [showPromo, setShowPromo] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const price = CONTENT.hero.priceNumeric;
  const quantity = items.reduce((acc, item) => acc + item.quantity, 0);
  const total = price * quantity;

  // Handle Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const handleIncrement = () => {
    setItems(current => current.map(item => ({ ...item, quantity: item.quantity + 1 })));
  };
  const handleDecrement = () => {
    setItems(current => current.map(item => ({ ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 })));
  };

  const handleRemove = () => {
    setItems([]);
  };

  const handleReset = () => {
    setItems([{ id: 1, quantity: 1 }]);
  };

  const handleCheckout = () => {
    if (CONTENT.brand.checkoutUrl.startsWith('http')) {
      window.open(CONTENT.brand.checkoutUrl, '_blank');
    } else {
      alert('Iniciando seu checkout seguro... Você será redirecionado em instantes.');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] touch-none overscroll-none"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            role="dialog"
            aria-modal="true"
            aria-label="Carrinho de compras"
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-[#050505] text-white shadow-2xl z-[101] flex flex-col font-sans overflow-hidden border-l border-gold-500/20 overscroll-none"
          >
            {/* Header */}
            <div className="p-4 pb-0">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-[20px] font-light text-white">
                  Carrinho <span className="text-white/40 text-base ml-1 font-light">({quantity} item)</span>
                </h2>
                <button 
                  onClick={onClose}
                  aria-label="Fechar carrinho"
                  className="hover:opacity-60 transition-opacity text-gold-500"
                >
                  <X className="w-7 h-7 stroke-[1]" />
                </button>
              </div>
              <div className="h-[1px] w-full bg-gold-500/30" />
            </div>

            {/* Content Area */}
            <div className="flex-1 px-4 overflow-y-auto overflow-x-hidden scrollbar-none custom-scrollbar pb-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <Trash2 className="w-10 h-10 text-white/20" />
                  <div className="space-y-2">
                    <h3 className="text-lg font-light text-white/60">O carrinho está vazio</h3>
                  </div>
                  <GoldButton primary onClick={handleReset}>
                    CONTINUAR COMPRANDO
                  </GoldButton>
                </div>
              ) : (
                <div className="space-y-0">
                  {/* Cart Item Row */}
                  <div className="flex gap-4 py-4">
                    {/* Image Thumbnail */}
                    <div className="w-[75px] h-[100px] flex-shrink-0 border border-gold-500/20 p-1.5 bg-black relative">
                      <img 
                        src={CONTENT.hero.bookImage} 
                        alt="Capa do livro no carrinho" 
                        className="w-full h-full object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Details Area */}
                    <div className="flex-1 flex flex-col pt-0">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="text-[15px] font-light leading-tight text-white max-w-[180px]">
                          Fala Glauber – Um Bilhão e Meio de Views
                        </h4>
                        <button 
                          onClick={handleRemove}
                          aria-label="Remover item"
                          className="text-white/40 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-5 h-5 stroke-[1]" />
                        </button>
                      </div>

                      <div className="text-[14px] font-light text-white/60 mb-2">
                        R$ {price.toFixed(2).replace('.', ',')}
                      </div>

                      <div className="flex items-center justify-between">
                        {/* Quantity Selector box matching the image */}
                        <div className="flex items-center border border-gold-500/30">
                          <button 
                            onClick={handleDecrement}
                            aria-label="Diminuir quantidade"
                            className="p-0.5 px-2.5 border-r border-gold-500/30 hover:bg-gold-500/10 flex items-center justify-center"
                          >
                            <Minus className="w-3.5 h-3.5 text-gold-500 stroke-[1.5]" />
                          </button>
                          <span className="w-8 text-center text-sm font-light text-white" aria-live="polite">{quantity}</span>
                          <button 
                            onClick={handleIncrement}
                            aria-label="Aumentar quantidade"
                            className="p-0.5 px-2.5 border-l border-gold-500/30 hover:bg-gold-500/10 flex items-center justify-center"
                          >
                            <Plus className="w-3.5 h-3.5 text-gold-500 stroke-[1.5]" />
                          </button>
                        </div>
                        
                        <div className="text-[16px] font-light text-gold-500">
                          R$ {total.toFixed(2).replace('.', ',')}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="h-[1px] w-full bg-gold-500/10" />

                  {/* Promo Section Styled as the image */}
                  <div className="py-4 space-y-3">
                    <button 
                      onClick={() => setShowPromo(!showPromo)}
                      aria-expanded={showPromo}
                      aria-label="Inserir código promocional"
                      className="flex items-center gap-2 text-gold-500 hover:text-gold-300 transition-colors text-[14px] font-light cursor-pointer"
                    >
                      <Tag className="w-4 h-4 rotate-90 stroke-[1.5]" />
                      Insira o código promocional
                    </button>
                    
                    <AnimatePresence>
                      {showPromo && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="flex gap-2 overflow-hidden"
                        >
                          <input 
                            type="text" 
                            placeholder="ECONOMIZE50"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                            className="flex-1 border border-gold-500/30 bg-black/40 p-2 text-sm font-light focus:outline-none focus:border-gold-500 placeholder:text-white/20 text-white"
                          />
                          <button className="px-6 py-2 bg-gold-500/20 border border-gold-500/40 text-gold-500 text-sm font-light whitespace-nowrap hover:bg-gold-500/30 transition-colors">
                            Aplicar
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="h-[1px] w-full bg-gold-500/10" />
                </div>
              )}
            </div>

            {/* Footer Summary & Buttons */}
            {items.length > 0 && (
              <div className="p-4 pt-0 bg-[#050505] flex-shrink-0 border-t border-gold-500/10 shadow-[0_-10px_20px_rgba(0,0,0,0.5)]">
                <div className="space-y-1 pt-4 pb-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[20px] font-light text-white font-sans">Total estimado</span>
                    <span className="text-[20px] font-medium text-gold-500">R$ {total.toFixed(2).replace('.', ',')}</span>
                  </div>
                  <p className="text-[13px] text-white/40 font-light">
                    Impostos e frete são calculados no checkout.
                  </p>
                </div>

                <div className="space-y-3 mt-4">
                  <button 
                    onClick={handleCheckout}
                    className="w-full py-4 gold-gradient text-black font-bold uppercase hover:brightness-110 active:scale-[0.98] transition-all text-sm tracking-[0.2em] rounded-sm"
                  >
                    Finalizar Compra
                  </button>
                  <button 
                    onClick={onClose}
                    className="w-full py-4 border border-gold-500/30 text-gold-200 font-medium hover:bg-gold-500/5 active:scale-[0.98] transition-all text-sm rounded-sm uppercase tracking-[0.2em]"
                  >
                    Continuar Navegando
                  </button>
                </div>

                <div className="flex items-center justify-center gap-2 text-white/30 pt-6 pb-6">
                  <Lock size={14} className="opacity-50" />
                  <span className="text-[12px] uppercase tracking-widest font-medium">Checkout seguro</span>
                </div>
              </div>
            )}

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
