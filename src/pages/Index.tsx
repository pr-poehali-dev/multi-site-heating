import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [currentCity, setCurrentCity] = useState('');
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showCalculatorModal, setShowCalculatorModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: 'Анна Петрова',
      rating: 5,
      text: 'Отличная работа! Система стала работать намного лучше.',
      photo: '/img/8041bae9-9fec-4263-8895-96159a16dc61.jpg',
      date: '2024-01-15'
    },
    {
      id: 2,
      name: 'Михаил Иванов',
      rating: 5,
      text: 'Быстро и качественно. Рекомендую!',
      photo: null,
      date: '2024-01-10'
    }
  ]);
  
  // Калькулятор
  const [calculatorData, setCalculatorData] = useState({
    serviceType: '',
    apartmentSize: '',
    radiatorCount: '',
    pipeLength: ''
  });
  const [calculatedPrice, setCalculatedPrice] = useState(0);

  // Форма заявки
  const [orderForm, setOrderForm] = useState({
    name: '',
    phone: '',
    address: '',
    service: '',
    comment: ''
  });

  // Форма отзыва
  const [reviewForm, setReviewForm] = useState({
    name: '',
    rating: 5,
    text: '',
    photo: null,
    video: null
  });
  
  const cities = [
    'Ярославль', 'Москва', 'Рыбинск', 'Переславль-Залесский', 
    'Углич', 'Ростов', 'Тутаев', 'Данилов'
  ];

  const services = [
    {
      icon: 'Wrench',
      title: 'Промывка радиаторов',
      description: 'Профессиональная очистка радиаторов от накипи и загрязнений',
      price: 'от 800 руб/секция',
      basePrice: 800
    },
    {
      icon: 'Zap',
      title: 'Гидродинамическая промывка',
      description: 'Очистка труб под высоким давлением',
      price: 'от 1500 руб/м',
      basePrice: 1500
    },
    {
      icon: 'Thermometer',
      title: 'Химическая промывка',
      description: 'Удаление отложений специальными реагентами',
      price: 'от 2000 руб/система',
      basePrice: 2000
    },
    {
      icon: 'CheckCircle',
      title: 'Диагностика системы',
      description: 'Проверка эффективности отопления',
      price: 'от 500 руб',
      basePrice: 500
    }
  ];

  const workImages = [
    '/img/8041bae9-9fec-4263-8895-96159a16dc61.jpg',
    '/img/a5934608-ad15-465b-8974-f4149d535bc4.jpg'
  ];

  const team = [
    {
      name: 'Алексей Петров',
      role: 'Главный специалист',
      experience: '15 лет опыта',
      phone: '+7 (4852) 58-76-43'
    },
    {
      name: 'Михаил Иванов', 
      role: 'Технический специалист',
      experience: '8 лет опыта',
      phone: '+7 (4852) 58-76-44'
    }
  ];

  useEffect(() => {
    const detectCity = () => {
      setCurrentCity('Ярославль');
      setShowLocationModal(true);
    };
    
    const timer = setTimeout(detectCity, 1000);
    return () => clearTimeout(timer);
  }, []);

  const calculatePrice = () => {
    let total = 0;
    const service = services.find(s => s.title === calculatorData.serviceType);
    if (!service) return;

    switch (calculatorData.serviceType) {
      case 'Промывка радиаторов':
        total = service.basePrice * parseInt(calculatorData.radiatorCount || '0');
        break;
      case 'Гидродинамическая промывка':
        total = service.basePrice * parseInt(calculatorData.pipeLength || '0');
        break;
      case 'Химическая промывка':
        total = service.basePrice;
        break;
      case 'Диагностика системы':
        total = service.basePrice;
        break;
    }
    
    setCalculatedPrice(total);
  };

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    alert('Заявка отправлена! Мы свяжемся с вами в течение 15 минут.');
    setShowOrderModal(false);
    setOrderForm({ name: '', phone: '', address: '', service: '', comment: '' });
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const newReview = {
      id: reviews.length + 1,
      name: reviewForm.name,
      rating: reviewForm.rating,
      text: reviewForm.text,
      photo: reviewForm.photo,
      date: new Date().toISOString().split('T')[0]
    };
    setReviews([newReview, ...reviews]);
    setShowReviewModal(false);
    setReviewForm({ name: '', rating: 5, text: '', photo: null, video: null });
    alert('Отзыв добавлен! Спасибо за обратную связь.');
  };

  const handleFileUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setReviewForm(prev => ({ ...prev, [type]: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Icon name="Thermometer" size={32} className="text-primary" />
              <div>
                <h1 className="text-2xl font-bold">Промывка-отопления76.ru</h1>
                <p className="text-sm text-muted-foreground">Профессиональная промывка отопительных систем</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                onClick={() => setShowLocationModal(true)}
                className="flex items-center space-x-2"
              >
                <Icon name="MapPin" size={16} />
                <span>{currentCity || 'Выберите город'}</span>
              </Button>
              <div className="text-right">
                <div className="text-lg font-semibold text-primary">+7 (4852) 58-76-43</div>
                <div className="text-sm text-muted-foreground">Звоните с 8:00 до 20:00</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 to-black text-primary py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-5xl font-bold mb-6">
              Профессиональная промывка отопления в {currentCity}
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Восстанавливаем эффективность вашей отопительной системы. 
              Гарантия качества. Опыт более 15 лет.
            </p>
            <div className="flex justify-center space-x-4">
              <Button size="lg" onClick={() => setShowOrderModal(true)} className="bg-primary hover:bg-accent text-primary-foreground">
                <Icon name="Phone" size={20} className="mr-2" />
                Вызвать мастера
              </Button>
              <Button size="lg" variant="outline" onClick={() => setShowCalculatorModal(true)} className="text-primary border-primary hover:bg-primary hover:text-primary-foreground">
                <Icon name="Calculator" size={20} className="mr-2" />
                Рассчитать стоимость
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">Наши услуги</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <Icon name={service.icon} size={48} className="text-primary mx-auto mb-4" />
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  <Badge variant="secondary" className="bg-primary text-primary-foreground">
                    {service.price}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Price List */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">Прайс-лист</h3>
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="flex justify-between items-center py-4 border-b border-border">
                    <div>
                      <h4 className="font-semibold">Промывка радиатора отопления</h4>
                      <p className="text-muted-foreground">За одну секцию</p>
                    </div>
                    <span className="text-xl font-bold text-primary">от 800 руб</span>
                  </div>
                  <div className="flex justify-between items-center py-4 border-b border-border">
                    <div>
                      <h4 className="font-semibold">Гидродинамическая промывка труб</h4>
                      <p className="text-muted-foreground">За погонный метр</p>
                    </div>
                    <span className="text-xl font-bold text-primary">от 1500 руб</span>
                  </div>
                  <div className="flex justify-between items-center py-4 border-b border-border">
                    <div>
                      <h4 className="font-semibold">Химическая промывка системы</h4>
                      <p className="text-muted-foreground">Комплексная обработка</p>
                    </div>
                    <span className="text-xl font-bold text-primary">от 2000 руб</span>
                  </div>
                  <div className="flex justify-between items-center py-4">
                    <div>
                      <h4 className="font-semibold">Диагностика и выезд мастера</h4>
                      <p className="text-muted-foreground">В пределах города</p>
                    </div>
                    <span className="text-xl font-bold text-primary">БЕСПЛАТНО</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Work Gallery */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">Фото и видео наших работ</h3>
          
          <Tabs defaultValue="photos" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="photos">Фотографии</TabsTrigger>
              <TabsTrigger value="videos">Видео с Rutube</TabsTrigger>
            </TabsList>
            
            <TabsContent value="photos" className="mt-8">
              <div className="grid md:grid-cols-2 gap-6">
                {workImages.map((image, index) => (
                  <Card key={index} className="overflow-hidden">
                    <img 
                      src={image} 
                      alt={`Работа ${index + 1}`}
                      className="w-full h-64 object-cover hover:scale-105 transition-transform"
                    />
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="videos" className="mt-8">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <div className="relative h-48 rounded-lg overflow-hidden mb-4">
                    <iframe 
                      src="https://rutube.ru/play/embed/a/fa5e8db1c6b24c02b9b3e5dbaaf2c0e1/?skinColor=ffcd3d"
                      frameBorder="0" 
                      allow="clipboard-write; autoplay" 
                      allowFullScreen
                      className="w-full h-full"
                    ></iframe>
                  </div>
                  <h4 className="font-semibold mb-2">Процесс гидродинамической промывки</h4>
                  <p className="text-muted-foreground">Видео демонстрирует технологию промывки труб</p>
                </Card>
                <Card className="p-6">
                  <div className="relative h-48 rounded-lg overflow-hidden mb-4">
                    <iframe 
                      src="https://rutube.ru/play/embed/a/b8a3f9e2d7c14f05a8c2d3b1e0f9a6b7/?skinColor=ffcd3d"
                      frameBorder="0" 
                      allow="clipboard-write; autoplay" 
                      allowFullScreen
                      className="w-full h-full"
                    ></iframe>
                  </div>
                  <h4 className="font-semibold mb-2">До и после промывки радиатора</h4>
                  <p className="text-muted-foreground">Результат нашей работы</p>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h3 className="text-3xl font-bold">Отзывы клиентов</h3>
            <Button onClick={() => setShowReviewModal(true)} className="bg-primary hover:bg-accent">
              <Icon name="MessageSquare" size={20} className="mr-2" />
              Оставить отзыв
            </Button>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {reviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                      <Icon name="User" size={24} className="text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-semibold">{review.name}</h4>
                        <div className="flex">
                          {[...Array(review.rating)].map((_, i) => (
                            <Icon key={i} name="Star" size={16} className="text-primary fill-current" />
                          ))}
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-3">{review.text}</p>
                      {review.photo && (
                        <img src={review.photo} alt="Фото отзыва" className="w-32 h-24 object-cover rounded mb-2" />
                      )}
                      <p className="text-sm text-muted-foreground">{review.date}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">Наша команда</h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {team.map((member, index) => (
              <Card key={index}>
                <CardContent className="p-6 text-center">
                  <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="User" size={32} className="text-primary-foreground" />
                  </div>
                  <h4 className="font-semibold text-lg mb-2">{member.name}</h4>
                  <p className="text-muted-foreground mb-2">{member.role}</p>
                  <Badge variant="outline" className="mb-4">{member.experience}</Badge>
                  <div className="flex items-center justify-center space-x-2 text-primary">
                    <Icon name="Phone" size={16} />
                    <span>{member.phone}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 bg-gray-900 text-primary">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-8">Свяжитесь с нами</h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="flex flex-col items-center">
              <Icon name="Phone" size={32} className="mb-4" />
              <h4 className="font-semibold mb-2">Телефон</h4>
              <p>+7 (4852) 58-76-43</p>
            </div>
            <div className="flex flex-col items-center">
              <Icon name="Mail" size={32} className="mb-4" />
              <h4 className="font-semibold mb-2">Email</h4>
              <p>info@промывка-отопления76.ru</p>
            </div>
            <div className="flex flex-col items-center">
              <Icon name="MapPin" size={32} className="mb-4" />
              <h4 className="font-semibold mb-2">Адрес</h4>
              <p>{currentCity}, ул. Промышленная, 15</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-primary py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Промывка-отопления76.ru. Все права защищены.</p>
        </div>
      </footer>

      {/* Modals */}
      
      {/* Location Modal */}
      <Dialog open={showLocationModal} onOpenChange={setShowLocationModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Icon name="MapPin" size={20} />
              <span>Выберите ваш город</span>
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-3 py-4">
            {cities.map((city) => (
              <Button
                key={city}
                variant={currentCity === city ? "default" : "outline"}
                onClick={() => {
                  setCurrentCity(city);
                  setShowLocationModal(false);
                }}
                className="justify-start"
              >
                {city}
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Order Modal */}
      <Dialog open={showOrderModal} onOpenChange={setShowOrderModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Оставить заявку</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleOrderSubmit} className="space-y-4">
            <Input
              placeholder="Ваше имя"
              value={orderForm.name}
              onChange={(e) => setOrderForm(prev => ({ ...prev, name: e.target.value }))}
              required
            />
            <Input
              placeholder="Телефон"
              value={orderForm.phone}
              onChange={(e) => setOrderForm(prev => ({ ...prev, phone: e.target.value }))}
              required
            />
            <Input
              placeholder="Адрес"
              value={orderForm.address}
              onChange={(e) => setOrderForm(prev => ({ ...prev, address: e.target.value }))}
              required
            />
            <Select onValueChange={(value) => setOrderForm(prev => ({ ...prev, service: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите услугу" />
              </SelectTrigger>
              <SelectContent>
                {services.map((service) => (
                  <SelectItem key={service.title} value={service.title}>{service.title}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Textarea
              placeholder="Комментарий"
              value={orderForm.comment}
              onChange={(e) => setOrderForm(prev => ({ ...prev, comment: e.target.value }))}
            />
            <Button type="submit" className="w-full">Отправить заявку</Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Calculator Modal */}
      <Dialog open={showCalculatorModal} onOpenChange={setShowCalculatorModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Калькулятор стоимости</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Select onValueChange={(value) => {
              setCalculatorData(prev => ({ ...prev, serviceType: value }));
              setCalculatedPrice(0);
            }}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите услугу" />
              </SelectTrigger>
              <SelectContent>
                {services.map((service) => (
                  <SelectItem key={service.title} value={service.title}>{service.title}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {calculatorData.serviceType === 'Промывка радиаторов' && (
              <Input
                type="number"
                placeholder="Количество секций"
                value={calculatorData.radiatorCount}
                onChange={(e) => setCalculatorData(prev => ({ ...prev, radiatorCount: e.target.value }))}
              />
            )}
            
            {calculatorData.serviceType === 'Гидродинамическая промывка' && (
              <Input
                type="number"
                placeholder="Длина труб (метры)"
                value={calculatorData.pipeLength}
                onChange={(e) => setCalculatorData(prev => ({ ...prev, pipeLength: e.target.value }))}
              />
            )}
            
            <Button onClick={calculatePrice} className="w-full">Рассчитать</Button>
            
            {calculatedPrice > 0 && (
              <div className="text-center p-4 bg-primary/10 rounded">
                <p className="text-lg font-bold">Примерная стоимость: {calculatedPrice} руб</p>
                <p className="text-sm text-muted-foreground">Точная стоимость определяется после осмотра</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Review Modal */}
      <Dialog open={showReviewModal} onOpenChange={setShowReviewModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Оставить отзыв</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleReviewSubmit} className="space-y-4">
            <Input
              placeholder="Ваше имя"
              value={reviewForm.name}
              onChange={(e) => setReviewForm(prev => ({ ...prev, name: e.target.value }))}
              required
            />
            <div>
              <label className="block text-sm font-medium mb-2">Оценка</label>
              <Select onValueChange={(value) => setReviewForm(prev => ({ ...prev, rating: parseInt(value) }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите оценку" />
                </SelectTrigger>
                <SelectContent>
                  {[1,2,3,4,5].map((rating) => (
                    <SelectItem key={rating} value={rating.toString()}>
                      {rating} звезд{rating > 1 && rating < 5 ? 'ы' : rating === 1 ? 'а' : ''}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Textarea
              placeholder="Ваш отзыв"
              value={reviewForm.text}
              onChange={(e) => setReviewForm(prev => ({ ...prev, text: e.target.value }))}
              required
            />
            <div>
              <label className="block text-sm font-medium mb-2">Фото (необязательно)</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(e, 'photo')}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Видео (необязательно)</label>
              <input
                type="file"
                accept="video/*"
                onChange={(e) => handleFileUpload(e, 'video')}
                className="w-full"
              />
            </div>
            <Button type="submit" className="w-full">Отправить отзыв</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;