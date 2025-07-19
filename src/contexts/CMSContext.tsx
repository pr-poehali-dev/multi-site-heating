import React, { createContext, useContext, useState, ReactNode } from 'react'

interface ContentItem {
  id: string
  type: 'text' | 'image' | 'video' | 'rutube'
  content: string
  title?: string
  description?: string
  citySpecific?: string
}

interface CMSContextType {
  content: ContentItem[]
  updateContent: (id: string, updates: Partial<ContentItem>) => void
  addContent: (item: Omit<ContentItem, 'id'>) => void
  removeContent: (id: string) => void
  getContentForCity: (cityName: string) => ContentItem[]
}

const defaultContent: ContentItem[] = [
  {
    id: '1',
    type: 'text',
    title: 'Профессиональная промывка отопления',
    content: 'Качественная промывка систем отопления в Ярославской области. Используем современное оборудование и проверенные технологии.',
  },
  {
    id: '2',
    type: 'text',
    title: 'Наши услуги',
    content: 'Промывка радиаторов, трубопроводов, котлов. Диагностика системы отопления. Устранение засоров и отложений.',
  },
  {
    id: '3',
    type: 'rutube',
    title: 'Видео о наших работах',
    content: 'https://rutube.ru/video/example-video-id/',
    description: 'Процесс промывки отопительной системы',
  },
  {
    id: '4',
    type: 'image',
    title: 'Наше оборудование',
    content: '/images/equipment.jpg',
    description: 'Современное оборудование для промывки',
  },
  {
    id: '5',
    type: 'text',
    title: 'Почему выбирают нас',
    content: 'Опыт работы более 10 лет. Гарантия на все виды работ. Доступные цены. Выезд в любую точку Ярославской области.',
  }
]

const CMSContext = createContext<CMSContextType | undefined>(undefined)

export const CMSProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<ContentItem[]>(defaultContent)

  const updateContent = (id: string, updates: Partial<ContentItem>) => {
    setContent(prev => 
      prev.map(item => 
        item.id === id ? { ...item, ...updates } : item
      )
    )
  }

  const addContent = (item: Omit<ContentItem, 'id'>) => {
    const newItem: ContentItem = {
      ...item,
      id: Date.now().toString()
    }
    setContent(prev => [...prev, newItem])
  }

  const removeContent = (id: string) => {
    setContent(prev => prev.filter(item => item.id !== id))
  }

  const getContentForCity = (cityName: string) => {
    return content.filter(item => 
      !item.citySpecific || item.citySpecific === cityName
    )
  }

  return (
    <CMSContext.Provider
      value={{
        content,
        updateContent,
        addContent,
        removeContent,
        getContentForCity
      }}
    >
      {children}
    </CMSContext.Provider>
  )
}

export const useCMS = () => {
  const context = useContext(CMSContext)
  if (context === undefined) {
    throw new Error('useCMS must be used within a CMSProvider')
  }
  return context
}