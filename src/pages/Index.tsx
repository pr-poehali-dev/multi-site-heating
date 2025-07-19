import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Modals from '@/components/Modals';
import CMSEditor from '@/components/CMSEditor';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useCityStore } from '@/stores/cityStore';
import { CITIES } from '@/data/cities';

const Index = () => {
  const { currentCity, detectLocation, showCityModal, isLocationDetected, setCurrentCity } = useCityStore();
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
    const modifier = currentCity?.priceModifier || 1.0;
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

  useEffect(() => {
    if (!isLocationDetected) {
      detectLocation();
    }
  }, [detectLocation, isLocationDetected]);

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
      <Header 
        currentCity={currentCity?.name || 'Ярославль'}
        onLocationClick={() => setModalState(prev => ({ ...prev, showLocationModal: true }))}
      />
      
      <Hero 
        currentCity={currentCity?.name || 'Ярославль'}
        onOrderClick={() => setModalState(prev => ({ ...prev, showOrderModal: true }))}
        onCalculatorClick={() => setModalState(prev => ({ ...prev, showCalculatorModal: true }))}
      />
      
      <Services 
        services={services}
        workImages={workImages}
        reviews={reviews}
        team={team}
        currentCity={currentCity?.name || 'Ярославль'}
        onReviewClick={() => setModalState(prev => ({ ...prev, showReviewModal: true }))}
      />
      
      <Modals
        cities={cities}
        currentCity={currentCity?.name || 'Ярославль'}
        services={services}
        modalState={modalState}
        orderForm={orderForm}
        reviewForm={reviewForm}
        calculatorData={calculatorData}
        calculatedPrice={calculatedPrice}
        onCityChange={handleCityChange}
        onModalStateChange={handleModalStateChange}
        onOrderFormChange={handleOrderFormChange}
        onReviewFormChange={handleReviewFormChange}
        onCalculatorDataChange={handleCalculatorDataChange}
        onOrderSubmit={handleOrderSubmit}
        onReviewSubmit={handleReviewSubmit}
        onCalculatePrice={calculatePrice}
        onFileUpload={handleFileUpload}
      />

      <CMSEditor
        isOpen={modalState.showCMSModal}
        onClose={() => setModalState(prev => ({ ...prev, showCMSModal: false }))}
      />

      {/* Плавающая кнопка CMS (только для администраторов) */}
      <Button
        onClick={() => setModalState(prev => ({ ...prev, showCMSModal: true }))}
        className="fixed bottom-4 left-4 z-50 bg-purple-600 hover:bg-purple-700 text-white rounded-full w-12 h-12 p-0 shadow-lg"
        title="Открыть CMS"
      >
        <Icon name="Settings" size={20} />
      </Button>
    </div>
  );
};

export default Index;