import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { useCityStore } from '@/stores/cityStore';
import { CITIES } from '@/data/cities';

interface CMSEditorProps {
  isOpen: boolean;
  onClose: () => void;
}

const CMSEditor = ({ isOpen, onClose }: CMSEditorProps) => {
  const { currentCity } = useCityStore();
  const [selectedCityId, setSelectedCityId] = useState(currentCity?.id || 'yaroslavl');
  const [activeTab, setActiveTab] = useState('content');
  
  const [contentData, setContentData] = useState({
    heroTitle: 'Профессиональные услуги гидропневматическая промывка системы отопления',
    heroSubtitle: 'Быстро, качественно, с гарантией',
    metaTitle: 'Промывка отопления в [ГОРОД] от 800₽',
    metaDescription: 'Профессиональная промывка отопления',
    services: [
      {
        title: 'Промывка радиаторов',
        description: 'Очистка батарей от накипи и ржавчины',
        price: 800,
        features: ['Увеличение теплоотдачи', 'Снижение расходов на отопление']
      }
    ]
  });

  const [contactData, setContactData] = useState({
    phone: '+7 (4852) 58-76-43',
    email: 'info@промывка-отопления76.ru',
    address: 'г. Ярославль, ул. Первомайская, 61',
    workingHours: 'Круглосуточно'
  });

  const [mediaData, setMediaData] = useState({
    galleryImages: [] as File[],
    rutubeVideos: [
      {
        title: 'Процесс промывки отопления',
        rutubeId: 'example123',
        description: 'Демонстрация работы наших специалистов'
      }
    ]
  });

  if (!isOpen) return null;

  const handleSaveContent = () => {
    const cityData = {
      cityId: selectedCityId,
      content: contentData,
      contacts: contactData,
      media: mediaData,
      updatedAt: new Date().toISOString()
    };
    
    localStorage.setItem(`cms-${selectedCityId}`, JSON.stringify(cityData));
    alert('Данные сохранены для города!');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setMediaData(prev => ({
      ...prev,
      galleryImages: [...prev.galleryImages, ...files]
    }));
  };

  const addRutubeVideo = () => {
    setMediaData(prev => ({
      ...prev,
      rutubeVideos: [
        ...prev.rutubeVideos,
        {
          title: '',
          rutubeId: '',
          description: ''
        }
      ]
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Icon name="Settings" size={24} />
            <span>CMS - Управление контентом</span>
          </CardTitle>
          <Button variant="ghost" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium">Выберите город:</label>
            <Select value={selectedCityId} onValueChange={setSelectedCityId}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CITIES.map(city => (
                  <SelectItem key={city.id} value={city.id}>
                    {city.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="content">Контент</TabsTrigger>
              <TabsTrigger value="contacts">Контакты</TabsTrigger>
              <TabsTrigger value="media">Медиа</TabsTrigger>
              <TabsTrigger value="settings">Настройки</TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="text-sm font-medium">Заголовок Hero секции</label>
                  <Input
                    value={contentData.heroTitle}
                    onChange={(e) => setContentData(prev => ({ ...prev, heroTitle: e.target.value }))}
                    placeholder="Основной заголовок сайта"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Подзаголовок Hero секции</label>
                  <Input
                    value={contentData.heroSubtitle}
                    onChange={(e) => setContentData(prev => ({ ...prev, heroSubtitle: e.target.value }))}
                    placeholder="Описание под заголовком"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Meta Title</label>
                  <Input
                    value={contentData.metaTitle}
                    onChange={(e) => setContentData(prev => ({ ...prev, metaTitle: e.target.value }))}
                    placeholder="SEO заголовок страницы"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Meta Description</label>
                  <Textarea
                    value={contentData.metaDescription}
                    onChange={(e) => setContentData(prev => ({ ...prev, metaDescription: e.target.value }))}
                    placeholder="SEO описание страницы"
                    rows={3}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="contacts" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Телефон</label>
                  <Input
                    value={contactData.phone}
                    onChange={(e) => setContactData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+7 (XXX) XXX-XX-XX"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <Input
                    value={contactData.email}
                    onChange={(e) => setContactData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="email@domain.ru"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Адрес</label>
                  <Input
                    value={contactData.address}
                    onChange={(e) => setContactData(prev => ({ ...prev, address: e.target.value }))}
                    placeholder="г. Город, ул. Улица, д. 1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Часы работы</label>
                  <Input
                    value={contactData.workingHours}
                    onChange={(e) => setContactData(prev => ({ ...prev, workingHours: e.target.value }))}
                    placeholder="9:00 - 18:00"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="media" className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Галерея фотографий</h3>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <Icon name="Upload" size={32} className="mx-auto text-gray-400 mb-2" />
                    <p className="text-gray-600">Загрузите фотографии работ</p>
                    <p className="text-sm text-gray-400">PNG, JPG до 5MB</p>
                  </label>
                </div>
                {mediaData.galleryImages.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600">
                      Загружено файлов: {mediaData.galleryImages.length}
                    </p>
                  </div>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Rutube видео</h3>
                  <Button onClick={addRutubeVideo} size="sm">
                    <Icon name="Plus" size={16} className="mr-2" />
                    Добавить видео
                  </Button>
                </div>
                <div className="space-y-4">
                  {mediaData.rutubeVideos.map((video, index) => (
                    <Card key={index}>
                      <CardContent className="pt-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="text-sm font-medium">Название</label>
                            <Input
                              value={video.title}
                              onChange={(e) => {
                                const newVideos = [...mediaData.rutubeVideos];
                                newVideos[index].title = e.target.value;
                                setMediaData(prev => ({ ...prev, rutubeVideos: newVideos }));
                              }}
                              placeholder="Название видео"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium">Rutube ID</label>
                            <Input
                              value={video.rutubeId}
                              onChange={(e) => {
                                const newVideos = [...mediaData.rutubeVideos];
                                newVideos[index].rutubeId = e.target.value;
                                setMediaData(prev => ({ ...prev, rutubeVideos: newVideos }));
                              }}
                              placeholder="abc123def456"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium">Описание</label>
                            <Input
                              value={video.description}
                              onChange={(e) => {
                                const newVideos = [...mediaData.rutubeVideos];
                                newVideos[index].description = e.target.value;
                                setMediaData(prev => ({ ...prev, rutubeVideos: newVideos }));
                              }}
                              placeholder="Краткое описание"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Экспорт/Импорт данных</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex space-x-2">
                      <Button variant="outline" className="flex-1">
                        <Icon name="Download" size={16} className="mr-2" />
                        Экспорт в JSON
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Icon name="Upload" size={16} className="mr-2" />
                        Импорт из JSON
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Отмена
            </Button>
            <Button onClick={handleSaveContent}>
              <Icon name="Save" size={16} className="mr-2" />
              Сохранить изменения
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CMSEditor;