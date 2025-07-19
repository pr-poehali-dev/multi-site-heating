import { City } from '@/types/city';

export const CITIES: City[] = [
  {
    id: 'yaroslavl',
    name: 'Ярославль',
    slug: 'yaroslavl',
    region: 'Ярославская область',
    coordinates: { lat: 57.6261, lng: 39.8845 },
    phone: '+7 (4852) 58-76-43',
    email: 'info@промывка-отопления76.ru',
    address: 'г. Ярославль, ул. Первомайская, 61',
    workingHours: 'Круглосуточно',
    priceModifier: 1.0,
    isActive: true
  },
  {
    id: 'rostov',
    name: 'Ростов',
    slug: 'rostov',
    region: 'Ярославская область',
    coordinates: { lat: 57.1887, lng: 39.4155 },
    phone: '+7 (48536) 7-89-12',
    email: 'rostov@промывка-отопления76.ru',
    address: 'г. Ростов, ул. Луначарского, 15',
    workingHours: '8:00 - 20:00',
    priceModifier: 0.9,
    isActive: true
  },
  {
    id: 'pereslavl',
    name: 'Переславль-Залесский',
    slug: 'pereslavl',
    region: 'Ярославская область',
    coordinates: { lat: 56.7386, lng: 38.8536 },
    phone: '+7 (48535) 9-45-67',
    email: 'pereslavl@промывка-отопления76.ru',
    address: 'г. Переславль-Залесский, ул. Советская, 23',
    workingHours: '9:00 - 18:00',
    priceModifier: 0.85,
    isActive: true
  },
  {
    id: 'rybinsk',
    name: 'Рыбинск',
    slug: 'rybinsk',
    region: 'Ярославская область',
    coordinates: { lat: 58.0446, lng: 38.8586 },
    phone: '+7 (4855) 29-83-14',
    email: 'rybinsk@промывка-отопления76.ru',
    address: 'г. Рыбинск, ул. Крестовая, 87',
    workingHours: 'Круглосуточно',
    priceModifier: 1.1,
    isActive: true
  },
  {
    id: 'tutaev',
    name: 'Тутаев',
    slug: 'tutaev',
    region: 'Ярославская область',
    coordinates: { lat: 57.8836, lng: 39.5394 },
    phone: '+7 (48533) 5-62-89',
    email: 'tutaev@промывка-отопления76.ru',
    address: 'г. Тутаев, ул. Луначарского, 34А',
    workingHours: '8:00 - 20:00',
    priceModifier: 0.8,
    isActive: true
  },
  {
    id: 'uglich',
    name: 'Углич',
    slug: 'uglich',
    region: 'Ярославская область',
    coordinates: { lat: 57.5264, lng: 38.3286 },
    phone: '+7 (48532) 4-15-73',
    email: 'uglich@промывка-отопления76.ru',
    address: 'г. Углич, ул. Ярославская, 12',
    workingHours: '9:00 - 18:00',
    priceModifier: 0.9,
    isActive: true
  }
];

export const findCityBySlug = (slug: string): City | undefined => {
  return CITIES.find(city => city.slug === slug && city.isActive);
};

export const findCityByName = (name: string): City | undefined => {
  return CITIES.find(city => 
    city.name.toLowerCase().includes(name.toLowerCase()) && city.isActive
  );
};

export const getActiveCities = (): City[] => {
  return CITIES.filter(city => city.isActive);
};