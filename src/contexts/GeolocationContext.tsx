import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useToast } from '@/hooks/use-toast'

interface City {
  name: string
  region: string
  priceModifier: number
  phone: string
  email: string
  address: string
}

interface GeolocationContextType {
  userCity: City | null
  isLoading: boolean
  showCityModal: boolean
  setShowCityModal: (show: boolean) => void
  setUserCity: (city: City) => void
  cities: City[]
}

const cities: City[] = [
  {
    name: 'Ярославль',
    region: 'Ярославская область',
    priceModifier: 1.0,
    phone: '+7 (4852) 123-456',
    email: 'yaroslavl@промывка-отопления76.ru',
    address: 'ул. Советская, 1, Ярославль'
  },
  {
    name: 'Рыбинск',
    region: 'Ярославская область',
    priceModifier: 0.9,
    phone: '+7 (4855) 123-456',
    email: 'rybinsk@промывка-отопления76.ru',
    address: 'ул. Крестовая, 1, Рыбинск'
  },
  {
    name: 'Переславль-Залесский',
    region: 'Ярославская область',
    priceModifier: 0.95,
    phone: '+7 (48535) 12-345',
    email: 'pereslavl@промывка-отопления76.ru',
    address: 'ул. Советская, 10, Переславль-Залесский'
  },
  {
    name: 'Ростов',
    region: 'Ярославская область',
    priceModifier: 0.85,
    phone: '+7 (48536) 12-345',
    email: 'rostov@промывка-отопления76.ru',
    address: 'ул. Московская, 5, Ростов'
  },
  {
    name: 'Тутаев',
    region: 'Ярославская область',
    priceModifier: 0.8,
    phone: '+7 (48533) 12-345',
    email: 'tutaev@промывка-отопления76.ru',
    address: 'ул. Ленина, 12, Тутаев'
  },
  {
    name: 'Углич',
    region: 'Ярославская область',
    priceModifier: 0.9,
    phone: '+7 (48532) 12-345',
    email: 'uglich@промывка-отопления76.ru',
    address: 'ул. Ярославская, 8, Углич'
  },
  {
    name: 'Гаврилов-Ям',
    region: 'Ярoslavская область',
    priceModifier: 0.75,
    phone: '+7 (48534) 12-345',
    email: 'gavrilov@промывка-отопления76.ru',
    address: 'ул. Советская, 3, Гаврилов-Ям'
  },
  {
    name: 'Данилов',
    region: 'Ярославская область',
    priceModifier: 0.7,
    phone: '+7 (48538) 12-345',
    email: 'danilov@промывка-отопления76.ru',
    address: 'ул. Ленина, 15, Данилов'
  },
  {
    name: 'Любим',
    region: 'Ярославская область',
    priceModifier: 0.7,
    phone: '+7 (48543) 12-345',
    email: 'lubim@промывка-отопления76.ru',
    address: 'ул. Советская, 7, Любим'
  },
  {
    name: 'Мышкин',
    region: 'Ярославская область',
    priceModifier: 0.8,
    phone: '+7 (48544) 12-345',
    email: 'myshkin@промывка-отопления76.ru',
    address: 'ул. Угличская, 2, Мышкин'
  },
  {
    name: 'Пошехонье',
    region: 'Ярославская область',
    priceModifier: 0.75,
    phone: '+7 (48546) 12-345',
    email: 'poshekhonye@промывка-отопления76.ru',
    address: 'ул. Советская, 11, Пошехонье'
  }
]

const GeolocationContext = createContext<GeolocationContextType | undefined>(undefined)

export const GeolocationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userCity, setUserCity] = useState<City | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showCityModal, setShowCityModal] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const savedCity = localStorage.getItem('userCity')
    if (savedCity) {
      try {
        setUserCity(JSON.parse(savedCity))
        setIsLoading(false)
      } catch {
        localStorage.removeItem('userCity')
        detectUserLocation()
      }
    } else {
      detectUserLocation()
    }
  }, [])

  const detectUserLocation = async () => {
    try {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            try {
              const response = await fetch(
                `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=ru`
              )
              const data = await response.json()
              
              const detectedCity = findCityByName(data.city || data.locality)
              if (detectedCity) {
                setUserCity(detectedCity)
                localStorage.setItem('userCity', JSON.stringify(detectedCity))
              } else {
                setShowCityModal(true)
              }
            } catch {
              setShowCityModal(true)
            }
            setIsLoading(false)
          },
          () => {
            setShowCityModal(true)
            setIsLoading(false)
          }
        )
      } else {
        setShowCityModal(true)
        setIsLoading(false)
      }
    } catch {
      setShowCityModal(true)
      setIsLoading(false)
    }
  }

  const findCityByName = (cityName: string): City | null => {
    return cities.find(city => 
      city.name.toLowerCase().includes(cityName.toLowerCase()) ||
      cityName.toLowerCase().includes(city.name.toLowerCase())
    ) || null
  }

  const handleSetUserCity = (city: City) => {
    setUserCity(city)
    localStorage.setItem('userCity', JSON.stringify(city))
    setShowCityModal(false)
    toast({
      title: 'Город выбран',
      description: `Вы выбрали ${city.name}`,
    })
  }

  return (
    <GeolocationContext.Provider
      value={{
        userCity,
        isLoading,
        showCityModal,
        setShowCityModal,
        setUserCity: handleSetUserCity,
        cities
      }}
    >
      {children}
    </GeolocationContext.Provider>
  )
}

export const useGeolocation = () => {
  const context = useContext(GeolocationContext)
  if (context === undefined) {
    throw new Error('useGeolocation must be used within a GeolocationProvider')
  }
  return context
}