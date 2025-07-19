import { CityContent } from '@/types/city';

export const defaultCityContent: Record<string, CityContent> = {
  yaroslavl: {
    cityId: 'yaroslavl',
    heroTitle: 'Промывка отопления в Ярославле',
    heroSubtitle: 'Профессиональная очистка систем отопления. Качество гарантируем!',
    metaTitle: 'Промывка отопления Ярославль - быстро и качественно',
    metaDescription: 'Промывка систем отопления в Ярославле. Опытные специалисты, современное оборудование. Звоните: +7 (4852) 58-76-43',
    services: [
      {
        id: 'cleaning',
        title: 'Промывка системы отопления',
        description: 'Комплексная очистка радиаторов, труб и котла от накипи и загрязнений',
        price: 3500,
        features: ['Диагностика системы', 'Химическая промывка', 'Гидропневматическая промывка', 'Опрессовка системы'],
        image: '/images/cleaning-service.jpg'
      },
      {
        id: 'maintenance',
        title: 'Техническое обслуживание',
        description: 'Регулярное обслуживание для поддержания эффективности отопления',
        price: 2500,
        features: ['Проверка состояния', 'Настройка параметров', 'Замена фильтров', 'Консультации'],
        image: '/images/maintenance-service.jpg'
      }
    ],
    gallery: [
      {
        id: 'before-after-1',
        url: '/images/gallery/before-after-1.jpg',
        title: 'До и после промывки радиатора',
        description: 'Результат работы наших специалистов',
        category: 'before-after',
        uploadedAt: new Date().toISOString()
      }
    ],
    videos: [
      {
        id: 'process-video-1',
        title: 'Процесс промывки отопления',
        description: 'Как проходит процедура очистки системы отопления',
        rutubeId: 'sample_rutube_id_1',
        rutubeUrl: 'https://rutube.ru/video/sample_id_1/',
        thumbnail: '/images/video-thumbnails/process-1.jpg',
        duration: '5:30',
        uploadedAt: new Date().toISOString()
      }
    ],
    reviews: [
      {
        id: 'review-1',
        name: 'Александр Петров',
        rating: 5,
        text: 'Отличная работа! Быстро, качественно, по разумной цене. Рекомендую!',
        date: '2024-01-15',
        verified: true
      }
    ],
    updatedAt: new Date().toISOString()
  },
  
  rybinsk: {
    cityId: 'rybinsk',
    heroTitle: 'Промывка отопления в Рыбинске',
    heroSubtitle: 'Надежная очистка отопительных систем с гарантией качества',
    metaTitle: 'Промывка отопления Рыбинск - профессиональные услуги',
    metaDescription: 'Качественная промывка систем отопления в Рыбинске. Опытные мастера, доступные цены. Телефон: +7 (4855) 29-83-14',
    services: [
      {
        id: 'cleaning',
        title: 'Промывка системы отопления',
        description: 'Комплексная очистка радиаторов, труб и котла от накипи и загрязнений',
        price: 3850, // 10% выше базовой цены для Рыбинска
        features: ['Диагностика системы', 'Химическая промывка', 'Гидропневматическая промывка', 'Опрессовка системы'],
        image: '/images/cleaning-service.jpg'
      }
    ],
    gallery: [],
    videos: [],
    reviews: [],
    updatedAt: new Date().toISOString()
  },

  rostov: {
    cityId: 'rostov',
    heroTitle: 'Промывка отопления в Ростове',
    heroSubtitle: 'Эффективная очистка систем отопления в Ростове Великом',
    metaTitle: 'Промывка отопления Ростов - качественные услуги',
    metaDescription: 'Промывка отопительных систем в Ростове. Быстро, качественно, недорого. Звоните: +7 (48536) 7-89-12',
    services: [
      {
        id: 'cleaning',
        title: 'Промывка системы отопления',
        description: 'Комплексная очистка радиаторов, труб и котла от накипи и загрязнений',
        price: 3150, // 10% ниже базовой цены
        features: ['Диагностика системы', 'Химическая промывка', 'Гидропневматическая промывка', 'Опрессовка системы'],
        image: '/images/cleaning-service.jpg'
      }
    ],
    gallery: [],
    videos: [],
    reviews: [],
    updatedAt: new Date().toISOString()
  }
};

export const getCityContent = (cityId: string): CityContent | null => {
  return defaultCityContent[cityId] || null;
};

export const updateCityContent = (cityId: string, content: Partial<CityContent>): void => {
  if (defaultCityContent[cityId]) {
    defaultCityContent[cityId] = {
      ...defaultCityContent[cityId],
      ...content,
      updatedAt: new Date().toISOString()
    };
  }
};

export const addServiceToCity = (cityId: string, service: CityContent['services'][0]): void => {
  if (defaultCityContent[cityId]) {
    defaultCityContent[cityId].services.push(service);
    defaultCityContent[cityId].updatedAt = new Date().toISOString();
  }
};

export const addGalleryItemToCity = (cityId: string, item: CityContent['gallery'][0]): void => {
  if (defaultCityContent[cityId]) {
    defaultCityContent[cityId].gallery.push(item);
    defaultCityContent[cityId].updatedAt = new Date().toISOString();
  }
};

export const addVideoToCity = (cityId: string, video: CityContent['videos'][0]): void => {
  if (defaultCityContent[cityId]) {
    defaultCityContent[cityId].videos.push(video);
    defaultCityContent[cityId].updatedAt = new Date().toISOString();
  }
};