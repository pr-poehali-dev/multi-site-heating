import React, { useState } from 'react'
import { useGeolocation } from '@/contexts/GeolocationContext'
import { useCMS } from '@/contexts/CMSContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Icon from '@/components/ui/icon'
import CityModal from '@/components/CityModal'
import RutubePlayer from '@/components/RutubePlayer'
import PhotoGallery from '@/components/PhotoGallery'

const HomePage: React.FC = () => {
  const { userCity, isLoading, setShowCityModal } = useGeolocation()
  const { getContentForCity } = useCMS()
  const [showOrderModal, setShowOrderModal] = useState(false)

  const content = userCity ? getContentForCity(userCity.name) : []

  const samplePhotos = [
    {
      id: '1',
      src: '/img/bbb5575e-7dc1-4cf3-afc8-f88890c82152.jpg',
      alt: 'Профессиональное оборудование',
      description: 'Современное оборудование для промывки отопления'
    },
    {
      id: '2', 
      src: '/img/6ebfa055-38f1-4185-9936-6ec0665deb26.jpg',
      alt: 'Промывка радиаторов',
      description: 'Профессиональная промывка радиаторов в квартире'
    },
    {
      id: '3',
      src: '/img/3d88a73f-b34c-4093-80a1-5961750d7e09.jpg',
      alt: 'Гидродинамическая промывка',
      description: 'Гидродинамическая промывка труб высоким давлением'
    }
  ]

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
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Icon name="Loader2" size={48} className="animate-spin mx-auto mb-4" />
          <p>Определяем ваш город...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="text-2xl font-bold text-blue-600">
                промывка-отопления76.ru
              </div>
              {userCity && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowCityModal(true)}
                  className="flex items-center gap-2"
                >
                  <Icon name="MapPin" size={16} />
                  {userCity.name}
                </Button>
              )}
            </div>
            <div className="flex items-center gap-4">
              {userCity && (
                <a href={`tel:${userCity.phone}`} className="text-lg font-medium">
                  {userCity.phone}
                </a>
              )}
              <Button>
                <Icon name="Phone" size={16} className="mr-2" />
                Заказать звонок
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Профессиональная промывка отопления
            {userCity && ` в ${userCity.name === 'Ярославль' ? 'Ярославле' : userCity.name}`}
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Качественная промывка систем отопления с гарантией. 
            Используем современное оборудование и проверенные технологии.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
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
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Наши услуги</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <Icon name={service.icon as any} size={48} className="mx-auto mb-4 text-blue-600" />
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="text-lg font-bold text-blue-600">
                    {service.price}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Content from CMS */}
        {content.length > 0 && (
          <section className="mb-16">
            <div className="space-y-12">
              {content.map((item) => (
                <div key={item.id}>
                  {item.type === 'text' && (
                    <div className="prose max-w-none">
                      {item.title && <h3 className="text-2xl font-bold mb-4">{item.title}</h3>}
                      <p className="text-lg leading-relaxed">{item.content}</p>
                    </div>
                  )}
                  
                  {item.type === 'rutube' && (
                    <div>
                      {item.title && <h3 className="text-2xl font-bold mb-4">{item.title}</h3>}
                      <RutubePlayer
                        videoId={item.content.split('/').pop()?.replace('/', '') || ''}
                        title={item.title || 'Видео'}
                        description={item.description}
                      />
                    </div>
                  )}
                  
                  {item.type === 'image' && (
                    <div>
                      {item.title && <h3 className="text-2xl font-bold mb-4">{item.title}</h3>}
                      <img 
                        src={item.content} 
                        alt={item.title || 'Изображение'}
                        className="w-full max-w-2xl mx-auto rounded-lg shadow-lg"
                      />
                      {item.description && (
                        <p className="text-center text-gray-600 mt-4">{item.description}</p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Photo Gallery */}
        <section className="mb-16">
          <PhotoGallery
            photos={samplePhotos}
            title="Фото наших работ"
          />
        </section>

        {/* Contact Info */}
        {userCity && (
          <section className="bg-gray-50 rounded-lg p-8">
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
                    <div className="text-gray-600">Пн-Вс: 8:00-20:00</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* City Modal */}
      <CityModal />

      {/* CMS Button */}
      <Button
        onClick={() => window.location.href = '/cms'}
        className="fixed bottom-4 right-4 z-50 bg-purple-600 hover:bg-purple-700 text-white rounded-full w-12 h-12 p-0 shadow-lg"
        title="Открыть CMS"
      >
        <Icon name="Settings" size={20} />
      </Button>
    </div>
  )
}

export default HomePage