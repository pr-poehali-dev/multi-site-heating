import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import RutubePlayer from '@/components/RutubePlayer';

interface Service {
  icon: string;
  title: string;
  description: string;
  price: string;
  basePrice: number;
}

interface Review {
  id: number;
  name: string;
  rating: number;
  text: string;
  photo: string | null;
  date: string;
}

interface TeamMember {
  name: string;
  role: string;
  experience: string;
  phone: string;
}

interface ServicesProps {
  services: Service[];
  workImages: string[];
  reviews: Review[];
  team: TeamMember[];
  currentCity: string;
  onReviewClick: () => void;
}

const Services = ({ services, workImages, reviews, team, currentCity, onReviewClick }: ServicesProps) => {
  return (
    <>
      {/* Services */}
      <section className="py-16" id="services">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Профессиональные услуги промывки отопления в Ярославле</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <Icon name={service.icon} size={48} className="text-primary mx-auto mb-4" />
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  <Badge variant="secondary" className="bg-primary text-primary-foreground">
                    {service.price}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Price List */}
      <section className="py-16" id="prices">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Цены на промывку отопления в Ярославле</h2>
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="flex justify-between items-center py-4 border-b border-border">
                    <div>
                      <h4 className="font-semibold">Промывка радиатора отопления</h4>
                      <p className="text-muted-foreground">За одну секцию</p>
                    </div>
                    <span className="text-xl font-bold text-primary">от 800 руб</span>
                  </div>
                  <div className="flex justify-between items-center py-4 border-b border-border">
                    <div>
                      <h4 className="font-semibold">Гидродинамическая промывка труб</h4>
                      <p className="text-muted-foreground">За погонный метр</p>
                    </div>
                    <span className="text-xl font-bold text-primary">от 1500 руб</span>
                  </div>
                  <div className="flex justify-between items-center py-4 border-b border-border">
                    <div>
                      <h4 className="font-semibold">Химическая промывка системы</h4>
                      <p className="text-muted-foreground">Комплексная обработка</p>
                    </div>
                    <span className="text-xl font-bold text-primary">от 2000 руб</span>
                  </div>
                  <div className="flex justify-between items-center py-4">
                    <div>
                      <h4 className="font-semibold">Диагностика и выезд мастера</h4>
                      <p className="text-muted-foreground">В пределах города</p>
                    </div>
                    <span className="text-xl font-bold text-primary">БЕСПЛАТНО</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Work Gallery */}
      <section className="py-16" id="gallery">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Результаты промывки отопления - фото и видео работ</h2>
          
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
                <Card className="overflow-hidden">
                  <RutubePlayer
                    videoId="fa5e8db1c6b24c02b9b3e5dbaaf2c0e1"
                    title="Процесс гидродинамической промывки"
                    description="Видео демонстрирует технологию промывки труб отопления"
                    className="h-64"
                  />
                </Card>
                <Card className="overflow-hidden">
                  <RutubePlayer
                    videoId="b8a3f9e2d7c14f05a8c2d3b1e0f9a6b7"
                    title="До и после промывки радиатора"
                    description="Результат нашей работы - увеличение теплоотдачи в 2 раза"
                    className="h-64"
                  />
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-16" id="reviews">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Отзывы о промывке отопления в Ярославле</h2>
            <Button onClick={onReviewClick} className="bg-primary hover:bg-accent">
              <Icon name="MessageSquare" size={20} className="mr-2" />
              Оставить отзыв
            </Button>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {reviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                      <Icon name="User" size={24} className="text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-semibold">{review.name}</h4>
                        <div className="flex">
                          {[...Array(review.rating)].map((_, i) => (
                            <Icon key={i} name="Star" size={16} className="text-primary fill-current" />
                          ))}
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-3">{review.text}</p>
                      {review.photo && (
                        <img src={review.photo} alt="Фото отзыва" className="w-32 h-24 object-cover rounded mb-2" />
                      )}
                      <p className="text-sm text-muted-foreground">{review.date}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16" id="team">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Мастера по промывке отопления - наша команда</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {team.map((member, index) => (
              <Card key={index}>
                <CardContent className="p-6 text-center">
                  <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="User" size={32} className="text-primary-foreground" />
                  </div>
                  <h4 className="font-semibold text-lg mb-2">{member.name}</h4>
                  <p className="text-muted-foreground mb-2">{member.role}</p>
                  <Badge variant="outline" className="mb-4">{member.experience}</Badge>
                  <div className="flex items-center justify-center space-x-2 text-primary">
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
      <section className="py-16 bg-gray-900 text-primary" id="contacts">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Заказать промывку отопления в Ярославле</h2>
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
      <footer className="bg-black text-primary py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Промывка-отопления76.ru. Все права защищены.</p>
        </div>
      </footer>
    </>
  );
};

export default Services;