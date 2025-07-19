import React, { useState } from 'react'
import { useCMS } from '@/contexts/CMSContext'
import { useGeolocation } from '@/contexts/GeolocationContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import Icon from '@/components/ui/icon'

const CMSPage: React.FC = () => {
  const { content, updateContent, addContent, removeContent } = useCMS()
  const { cities } = useGeolocation()
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)
  
  const [newItem, setNewItem] = useState({
    type: 'text' as const,
    title: '',
    content: '',
    description: '',
    citySpecific: ''
  })

  const handleAddContent = () => {
    if (newItem.title && newItem.content) {
      addContent({
        ...newItem,
        citySpecific: newItem.citySpecific || undefined
      })
      setNewItem({
        type: 'text',
        title: '',
        content: '',
        description: '',
        citySpecific: ''
      })
      setIsAddModalOpen(false)
    }
  }

  const handleEditContent = (item: any) => {
    setEditingItem({ ...item })
  }

  const handleSaveEdit = () => {
    if (editingItem) {
      updateContent(editingItem.id, editingItem)
      setEditingItem(null)
    }
  }

  const handleDeleteContent = (id: string) => {
    if (confirm('Удалить этот элемент?')) {
      removeContent(id)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold">CMS - Управление контентом</h1>
            </div>
            <div className="flex items-center gap-4">
              <Button onClick={() => window.location.href = '/'}>
                <Icon name="ArrowLeft" size={16} className="mr-2" />
                На главную
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Add Content Button */}
        <div className="mb-8">
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
              <Button>
                <Icon name="Plus" size={16} className="mr-2" />
                Добавить контент
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Добавить новый контент</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Тип контента</label>
                  <Select
                    value={newItem.type}
                    onValueChange={(value: any) => setNewItem({ ...newItem, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text">Текст</SelectItem>
                      <SelectItem value="image">Изображение</SelectItem>
                      <SelectItem value="video">Видео</SelectItem>
                      <SelectItem value="rutube">Rutube</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Заголовок</label>
                  <Input
                    value={newItem.title}
                    onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                    placeholder="Введите заголовок"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {newItem.type === 'text' ? 'Текст' : 
                     newItem.type === 'rutube' ? 'Ссылка на Rutube' : 
                     'URL контента'}
                  </label>
                  {newItem.type === 'text' ? (
                    <Textarea
                      value={newItem.content}
                      onChange={(e) => setNewItem({ ...newItem, content: e.target.value })}
                      placeholder="Введите текст"
                      rows={4}
                    />
                  ) : (
                    <Input
                      value={newItem.content}
                      onChange={(e) => setNewItem({ ...newItem, content: e.target.value })}
                      placeholder={
                        newItem.type === 'rutube' 
                          ? 'https://rutube.ru/video/example-id/' 
                          : 'URL контента'
                      }
                    />
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Описание</label>
                  <Input
                    value={newItem.description}
                    onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                    placeholder="Краткое описание (необязательно)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Город (необязательно)</label>
                  <Select
                    value={newItem.citySpecific}
                    onValueChange={(value) => setNewItem({ ...newItem, citySpecific: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Для всех городов" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Для всех городов</SelectItem>
                      {cities.map((city) => (
                        <SelectItem key={city.name} value={city.name}>
                          {city.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button onClick={handleAddContent}>Добавить</Button>
                  <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                    Отмена
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Content List */}
        <div className="grid gap-6">
          {content.map((item) => (
            <Card key={item.id}>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    {item.type === 'text' && <Icon name="Type" size={20} />}
                    {item.type === 'image' && <Icon name="Image" size={20} />}
                    {item.type === 'video' && <Icon name="Video" size={20} />}
                    {item.type === 'rutube' && <Icon name="Play" size={20} />}
                    <span>{item.title || 'Без заголовка'}</span>
                    {item.citySpecific && (
                      <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {item.citySpecific}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleEditContent(item)}>
                      <Icon name="Edit" size={16} />
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDeleteContent(item.id)}>
                      <Icon name="Trash" size={16} />
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {item.type === 'text' && (
                  <p className="text-gray-600">{item.content}</p>
                )}
                {item.type === 'image' && (
                  <div className="flex items-center gap-4">
                    <img src={item.content} alt={item.title} className="w-24 h-24 object-cover rounded" />
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  </div>
                )}
                {(item.type === 'video' || item.type === 'rutube') && (
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-24 bg-gray-100 rounded flex items-center justify-center">
                      <Icon name="Play" size={24} className="text-gray-400" />
                    </div>
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-gray-600">{item.description}</p>
                      <p className="text-xs text-blue-600 break-all">{item.content}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Edit Modal */}
        {editingItem && (
          <Dialog open={!!editingItem} onOpenChange={() => setEditingItem(null)}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Редактировать контент</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Заголовок</label>
                  <Input
                    value={editingItem.title || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Контент</label>
                  {editingItem.type === 'text' ? (
                    <Textarea
                      value={editingItem.content}
                      onChange={(e) => setEditingItem({ ...editingItem, content: e.target.value })}
                      rows={4}
                    />
                  ) : (
                    <Input
                      value={editingItem.content}
                      onChange={(e) => setEditingItem({ ...editingItem, content: e.target.value })}
                    />
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Описание</label>
                  <Input
                    value={editingItem.description || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  />
                </div>

                <div className="flex gap-2 pt-4">
                  <Button onClick={handleSaveEdit}>Сохранить</Button>
                  <Button variant="outline" onClick={() => setEditingItem(null)}>
                    Отмена
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </main>
    </div>
  )
}

export default CMSPage