import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  isNew?: boolean;
  isSale?: boolean;
  description: string;
}

interface CartItem extends Product {
  quantity: number;
}

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const products: Product[] = [
    {
      id: 1,
      name: 'Quantum Smartphone X1',
      price: 89999,
      originalPrice: 99999,
      image: '/img/40472602-c256-44fe-bedd-b4f74a43e7bf.jpg',
      category: 'Смартфоны',
      isNew: true,
      isSale: true,
      description: 'Революционный смартфон с квантовым процессором'
    },
    {
      id: 2,
      name: 'Cyber Headphones Pro',
      price: 24999,
      image: '/img/6cea27e4-9af6-453c-8173-13544af6d5ee.jpg',
      category: 'Аудио',
      isNew: true,
      description: 'Беспроводные наушники с пространственным звуком'
    },
    {
      id: 3,
      name: 'NeoBook Ultra',
      price: 149999,
      image: '/img/51a7ec09-0461-4ebe-b547-9752725923d7.jpg',
      category: 'Ноутбуки',
      description: 'Ультрабук следующего поколения'
    },
    {
      id: 4,
      name: 'Smart Watch Alpha',
      price: 32999,
      originalPrice: 39999,
      image: '/img/40472602-c256-44fe-bedd-b4f74a43e7bf.jpg',
      category: 'Носимые',
      isSale: true,
      description: 'Умные часы с holographic дисплеем'
    }
  ];

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-blue-800/30 bg-slate-900/50 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
                <Icon name="Zap" size={20} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                TechStore
              </h1>
            </div>
            
            <nav className="hidden md:flex items-center gap-6">
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Главная</a>
              <a href="#catalog" className="text-gray-300 hover:text-blue-400 transition-colors">Каталог</a>
              <a href="#new" className="text-gray-300 hover:text-blue-400 transition-colors">Новинки</a>
              <a href="#sale" className="text-gray-300 hover:text-blue-400 transition-colors">Акции</a>
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Профиль</a>
            </nav>

            <div className="flex items-center gap-4">
              <Input 
                placeholder="Поиск товаров..." 
                className="w-64 bg-slate-800/50 border-blue-800/30 text-white placeholder:text-gray-400"
              />
              <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="relative border-blue-800/30 bg-slate-800/50 hover:bg-blue-800/20">
                    <Icon name="ShoppingCart" size={20} />
                    {cartItems.length > 0 && (
                      <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 py-0 min-w-[20px] h-5 rounded-full">
                        {cartItems.reduce((total, item) => total + item.quantity, 0)}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="bg-slate-900 border-blue-800/30">
                  <SheetHeader>
                    <SheetTitle className="text-white">Корзина</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 space-y-4">
                    {cartItems.length === 0 ? (
                      <p className="text-gray-400">Корзина пуста</p>
                    ) : (
                      <>
                        {cartItems.map(item => (
                          <div key={item.id} className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg">
                            <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                            <div className="flex-1">
                              <h4 className="font-medium text-white text-sm">{item.name}</h4>
                              <p className="text-blue-400 text-sm">{item.price.toLocaleString()} ₽</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-8 h-8 p-0"
                              >
                                -
                              </Button>
                              <span className="text-white text-sm w-8 text-center">{item.quantity}</span>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-8 h-8 p-0"
                              >
                                +
                              </Button>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-400 hover:text-red-300"
                            >
                              <Icon name="Trash2" size={16} />
                            </Button>
                          </div>
                        ))}
                        <div className="border-t border-blue-800/30 pt-4">
                          <div className="flex justify-between items-center mb-4">
                            <span className="text-gray-300">Итого:</span>
                            <span className="text-xl font-bold text-white">{cartTotal.toLocaleString()} ₽</span>
                          </div>
                          <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                            Оформить заказ
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Технологии Будущего
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Откройте для себя самые передовые устройства, которые изменят вашу жизнь
          </p>
          <Button size="lg" className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-6 text-lg">
            Исследовать каталог
            <Icon name="ArrowRight" size={20} className="ml-2" />
          </Button>
        </div>
      </section>

      {/* New Products */}
      <section id="new" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center">
              <Icon name="Sparkles" size={24} className="text-white" />
            </div>
            <h3 className="text-3xl font-bold text-white">Новинки</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.filter(p => p.isNew).map(product => (
              <Card key={product.id} className="bg-slate-800/50 border-blue-800/30 hover:border-blue-600/50 transition-all duration-300 hover:scale-105 overflow-hidden">
                <div className="relative">
                  <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                  <div className="absolute top-2 right-2 flex gap-2">
                    {product.isNew && (
                      <Badge className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white">
                        NEW
                      </Badge>
                    )}
                    {product.isSale && (
                      <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white">
                        SALE
                      </Badge>
                    )}
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-white text-lg">{product.name}</CardTitle>
                  <p className="text-gray-400 text-sm">{product.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-blue-400">{product.price.toLocaleString()} ₽</span>
                      {product.originalPrice && (
                        <span className="text-gray-500 line-through text-sm">{product.originalPrice.toLocaleString()} ₽</span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => addToCart(product)}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                    >
                      В корзину
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon"
                      className="border-blue-800/30 hover:bg-blue-800/20"
                    >
                      <Icon name="Heart" size={16} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sale Section */}
      <section id="sale" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
              <Icon name="Tag" size={24} className="text-white" />
            </div>
            <h3 className="text-3xl font-bold text-white">Акции</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.filter(p => p.isSale).map(product => (
              <Card key={product.id} className="bg-slate-800/50 border-red-800/30 hover:border-red-600/50 transition-all duration-300 hover:scale-105 overflow-hidden">
                <div className="relative">
                  <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white">
                      SALE
                    </Badge>
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-white text-lg">{product.name}</CardTitle>
                  <p className="text-gray-400 text-sm">{product.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-red-400">{product.price.toLocaleString()} ₽</span>
                      {product.originalPrice && (
                        <span className="text-gray-500 line-through text-sm">{product.originalPrice.toLocaleString()} ₽</span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => addToCart(product)}
                      className="flex-1 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700"
                    >
                      В корзину
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon"
                      className="border-red-800/30 hover:bg-red-800/20"
                    >
                      <Icon name="Heart" size={16} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Full Catalog */}
      <section id="catalog" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
              <Icon name="Grid3x3" size={24} className="text-white" />
            </div>
            <h3 className="text-3xl font-bold text-white">Каталог</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <Card key={product.id} className="bg-slate-800/50 border-blue-800/30 hover:border-blue-600/50 transition-all duration-300 hover:scale-105 overflow-hidden">
                <div className="relative">
                  <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                  <div className="absolute top-2 right-2 flex gap-2">
                    {product.isNew && (
                      <Badge className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white">
                        NEW
                      </Badge>
                    )}
                    {product.isSale && (
                      <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white">
                        SALE
                      </Badge>
                    )}
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-white text-lg">{product.name}</CardTitle>
                  <p className="text-gray-400 text-sm">{product.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-blue-400">{product.price.toLocaleString()} ₽</span>
                      {product.originalPrice && (
                        <span className="text-gray-500 line-through text-sm">{product.originalPrice.toLocaleString()} ₽</span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => addToCart(product)}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                    >
                      В корзину
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon"
                      className="border-blue-800/30 hover:bg-blue-800/20"
                    >
                      <Icon name="Heart" size={16} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900/80 border-t border-blue-800/30 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
                  <Icon name="Zap" size={20} className="text-white" />
                </div>
                <h4 className="text-xl font-bold text-white">TechStore</h4>
              </div>
              <p className="text-gray-400">
                Магазин технологий будущего
              </p>
            </div>
            <div>
              <h5 className="font-semibold text-white mb-4">Категории</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Смартфоны</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Ноутбуки</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Аудио</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Носимые</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-white mb-4">Поддержка</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Доставка</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Возврат</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Гарантия</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Контакты</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-white mb-4">Связь</h5>
              <ul className="space-y-2 text-gray-400">
                <li>+7 (800) 123-45-67</li>
                <li>info@techstore.ru</li>
                <li>Москва, ул. Будущего, 1</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-blue-800/30 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 TechStore. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;