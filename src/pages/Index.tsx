import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useGeolocation } from '@/hooks/useGeolocation';
import { CityHeader } from '@/components/CityHeader';
import { CitySelector } from '@/components/CitySelector';
import { getCityContent } from '@/data/cityContent';
import { City } from '@/types/city';

const Index = () => {
  const { userCity, isLoading, requestLocation, setUserCity } = useGeolocation();
  const [isCitySelectorOpen, setIsCitySelectorOpen] = useState(false);
  const [showCMSModal, setShowCMSModal] = useState(false);
  
  const cityContent = userCity ? getCityContent(userCity.id) : null;
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
  
  // Modal states
  const [modalState, setModalState] = useState({
    showLocationModal: false,
    showOrderModal: false,
    showCalculatorModal: false,
    showReviewModal: false,
    showCMSModal: false
  });

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

  const getPriceWithModifier = (basePrice: number) => {
    const modifier = userCity?.priceModifier || 1.0;
    return Math.round(basePrice * modifier);
  };

  const services = [
    {
      icon: 'Wrench',
      title: 'Промывка радиаторов',
      description: 'Профессиональная очистка радиаторов от накипи и загрязнений',
      price: `от ${getPriceWithModifier(800)} руб/секция`,
      basePrice: 800
    },
    {
      icon: 'Zap',
      title: 'Гидродинамическая промывка',
      description: 'Очистка труб под высоким давлением',
      price: `от ${getPriceWithModifier(1500)} руб/м`,
      basePrice: 1500
    },
    {
      icon: 'Thermometer',
      title: 'Химическая промывка',
      description: 'Удаление отложений специальными реагентами',
      price: `от ${getPriceWithModifier(2000)} руб/система`,
      basePrice: 2000
    },
    {
      icon: 'CheckCircle',
      title: 'Диагностика системы',
      description: 'Проверка эффективности отопления',
      price: `от ${getPriceWithModifier(500)} руб`,
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

  const handleCitySelect = (city: City) => {
    setUserCity(city);
    setIsCitySelectorOpen(false);
  };

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
    setModalState(prev => ({ ...prev, showOrderModal: false }));
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
    setModalState(prev => ({ ...prev, showReviewModal: false }));
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

  const handleCityChange = (cityName) => {
    // Поиск города по имени и установка через store
    const cityData = CITIES.find(c => c.name === cityName);
    if (cityData) {
      setCurrentCity(cityData);
    }
  };

  const handleModalStateChange = (key, value) => {
    setModalState(prev => ({ ...prev, [key]: value }));
  };

  const handleOrderFormChange = (key, value) => {
    setOrderForm(prev => ({ ...prev, [key]: value }));
  };

  const handleReviewFormChange = (key, value) => {
    setReviewForm(prev => ({ ...prev, [key]: value }));
  };

  const handleCalculatorDataChange = (key, value) => {
    setCalculatorData(prev => ({ ...prev, [key]: value }));
    if (key === 'serviceType') {
      setCalculatedPrice(0);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <CityHeader 
        city={userCity}
        isLoading={isLoading}
        onCityClick={() => setIsCitySelectorOpen(true)}
      />
      
      <main className="container mx-auto px-4 py-8">
        {cityContent && (
          <div className="space-y-12">
            {/* Hero Section */}
            <section className="text-center py-12 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg">
              <h1 className="text-4xl font-bold mb-4">{cityContent.heroTitle}</h1>
              <p className="text-xl mb-8">{cityContent.heroSubtitle}</p>
              <div className="flex gap-4 justify-center">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  <Icon name="Phone" size={20} className="mr-2" />
                  Заказать звонок
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                  <Icon name="Calculator" size={20} className="mr-2" />
                  Рассчитать стоимость
                </Button>
              </div>
            </section>
            
            {/* Services */}
            <section>
              <h2 className="text-3xl font-bold text-center mb-8">Наши услуги</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {cityContent.services.map((service) => (
                  <div key={service.id} className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
                    {service.image && (
                      <img 
                        src="/img/fb4230d8-2603-4873-a93d-2fa1360ba815.jpg" 
                        alt={service.title}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                    )}
                    <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <div className="text-2xl font-bold text-blue-600 mb-4">
                      от {service.price} руб.
                    </div>
                    <ul className="space-y-1 text-sm text-gray-600">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <Icon name="Check" size={16} className="text-green-600" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
            
            {/* Gallery */}
            {cityContent.gallery.length > 0 && (
              <section>
                <h2 className="text-3xl font-bold text-center mb-8">Фото наших работ</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {cityContent.gallery.map((item) => (
                    <div key={item.id} className="group cursor-pointer">
                      <div className="relative overflow-hidden rounded-lg aspect-video">
                        <img
                          src="/img/69374652-15eb-442c-aed2-4ca83f9724ea.jpg"
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                      </div>
                      <div className="mt-2">
                        <h3 className="font-medium">{item.title}</h3>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
            
            {/* Videos */}
            {cityContent.videos.length > 0 && (
              <section>
                <h2 className="text-3xl font-bold text-center mb-8">Видео наших работ</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {cityContent.videos.map((video) => (
                    <div key={video.id} className="group">
                      <div className="relative cursor-pointer">
                        <div className="relative overflow-hidden rounded-lg bg-gray-200 aspect-video">
                          {video.thumbnail ? (
                            <img
                              src={video.thumbnail}
                              alt={video.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-300">
                              <Icon name="Video" size={48} className="text-gray-500" />
                            </div>
                          )}
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-colors">
                            <div className="bg-red-600 hover:bg-red-700 rounded-full p-4">
                              <Icon name="Play" size={24} className="text-white ml-1" />
                            </div>
                          </div>
                          {video.duration && (
                            <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                              {video.duration}
                            </div>
                          )}
                        </div>
                        <div className="mt-3">
                          <h3 className="font-medium text-sm">{video.title}</h3>
                          <p className="text-xs text-gray-600 mt-1">{video.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
            
            {/* Contact Info */}
            {userCity && (
              <section className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
                <h2 className="text-2xl font-bold mb-6">Контакты в городе {userCity.name}</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Icon name="Phone" size={20} className="text-blue-600" />
                      <div>
                        <div className="font-medium">Телефон</div>
                        <a href={`tel:${userCity.phone}`} className="text-blue-600 hover:underline">
                          {userCity.phone}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Icon name="Mail" size={20} className="text-blue-600" />
                      <div>
                        <div className="font-medium">Email</div>
                        <a href={`mailto:${userCity.email}`} className="text-blue-600 hover:underline">
                          {userCity.email}
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Icon name="MapPin" size={20} className="text-blue-600" />
                      <div>
                        <div className="font-medium">Адрес</div>
                        <div className="text-gray-600">{userCity.address}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Icon name="Clock" size={20} className="text-blue-600" />
                      <div>
                        <div className="font-medium">Режим работы</div>
                        <div className="text-gray-600">{userCity.workingHours}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}
          </div>
        )}
      </main>
      
      <CitySelector
        isOpen={isCitySelectorOpen}
        onClose={() => setIsCitySelectorOpen(false)}
        onCitySelect={handleCitySelect}
        currentCity={userCity}
      />
      
      {/* CMS Button */}
      <Button
        onClick={() => setShowCMSModal(true)}
        className="fixed bottom-4 left-4 z-50 bg-purple-600 hover:bg-purple-700 text-white rounded-full w-12 h-12 p-0 shadow-lg"
        title="Открыть CMS"
      >
        <Icon name="Settings" size={20} />
      </Button>
    </div>
  );
};

export default Index;