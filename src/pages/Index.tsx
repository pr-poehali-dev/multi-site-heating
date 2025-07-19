import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [currentCity, setCurrentCity] = useState('');
  const [showLocationModal, setShowLocationModal] = useState(false);
  
  const cities = [
    'Ярославль', 'Москва', 'Рыбинск', 'Переславль-Залесский', 
    'Углич', 'Ростов', 'Тутаев', 'Данилов'
  ];

  const services = [
    {
      icon: 'Wrench',
      title: 'Промывка радиаторов',
      description: 'Профессиональная очистка радиаторов от накипи и загрязнений',
      price: 'от 800 руб/секция'
    },
    {
      icon: 'Zap',
      title: 'Гидродинамическая промывка',
      description: 'Очистка труб под высоким давлением',
      price: 'от 1500 руб/м'
    },
    {
      icon: 'Thermometer',
      title: 'Химическая промывка',
      description: 'Удаление отложений специальными реагентами',
      price: 'от 2000 руб/система'
    },
    {
      icon: 'CheckCircle',
      title: 'Диагностика системы',
      description: 'Проверка эффективности отопления',
      price: 'от 500 руб'
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
    // Автоопределение города (симуляция)
    const detectCity = () => {
      setCurrentCity('Ярославль');
      setShowLocationModal(true);
    };
    
    const timer = setTimeout(detectCity, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Icon name="Thermometer" size={32} className="text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Промывка-отопления76.ru</h1>
                <p className="text-sm text-gray-600">Профессиональная промывка отопительных систем</p>
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
                <div className="text-lg font-semibold text-blue-600">+7 (4852) 58-76-43</div>
                <div className="text-sm text-gray-500">Звоните с 8:00 до 20:00</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
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
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
                <Icon name="Phone" size={20} className="mr-2" />
                Вызвать мастера
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
                <Icon name="Calculator" size={20} className="mr-2" />
                Рассчитать стоимость
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-900">Наши услуги</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <Icon name={service.icon} size={48} className="text-blue-600 mx-auto mb-4" />
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <Badge variant="secondary" className="bg-orange-100 text-orange-800">
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
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-900">Прайс-лист</h3>
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="flex justify-between items-center py-4 border-b">
                    <div>
                      <h4 className="font-semibold">Промывка радиатора отопления</h4>
                      <p className="text-gray-600">За одну секцию</p>
                    </div>
                    <span className="text-xl font-bold text-blue-600">от 800 руб</span>
                  </div>
                  <div className="flex justify-between items-center py-4 border-b">
                    <div>
                      <h4 className="font-semibold">Гидродинамическая промывка труб</h4>
                      <p className="text-gray-600">За погонный метр</p>
                    </div>
                    <span className="text-xl font-bold text-blue-600">от 1500 руб</span>
                  </div>
                  <div className="flex justify-between items-center py-4 border-b">
                    <div>
                      <h4 className="font-semibold">Химическая промывка системы</h4>
                      <p className="text-gray-600">Комплексная обработка</p>
                    </div>
                    <span className="text-xl font-bold text-blue-600">от 2000 руб</span>
                  </div>
                  <div className="flex justify-between items-center py-4">
                    <div>
                      <h4 className="font-semibold">Диагностика и выезд мастера</h4>
                      <p className="text-gray-600">В пределах города</p>
                    </div>
                    <span className="text-xl font-bold text-green-600">БЕСПЛАТНО</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Work Gallery */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-900">Фото и видео наших работ</h3>
          
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
                  <div className="bg-gray-200 h-48 rounded-lg flex items-center justify-center mb-4">
                    <Icon name="Play" size={48} className="text-gray-400" />
                  </div>
                  <h4 className="font-semibold mb-2">Процесс гидродинамической промывки</h4>
                  <p className="text-gray-600">Видео демонстрирует технологию промывки труб</p>
                </Card>
                <Card className="p-6">
                  <div className="bg-gray-200 h-48 rounded-lg flex items-center justify-center mb-4">
                    <Icon name="Play" size={48} className="text-gray-400" />
                  </div>
                  <h4 className="font-semibold mb-2">До и после промывки радиатора</h4>
                  <p className="text-gray-600">Результат нашей работы</p>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Team */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-900">Наша команда</h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {team.map((member, index) => (
              <Card key={index}>
                <CardContent className="p-6 text-center">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="User" size={32} className="text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-lg mb-2">{member.name}</h4>
                  <p className="text-gray-600 mb-2">{member.role}</p>
                  <Badge variant="outline" className="mb-4">{member.experience}</Badge>
                  <div className="flex items-center justify-center space-x-2 text-blue-600">
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
      <section className="py-16 bg-blue-600 text-white">
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
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Промывка-отопления76.ru. Все права защищены.</p>
        </div>
      </footer>

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
    </div>
  );
};

export default Index;