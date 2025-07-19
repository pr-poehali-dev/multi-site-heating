import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

interface Service {
  icon: string;
  title: string;
  description: string;
  price: string;
  basePrice: number;
}

interface ModalState {
  showLocationModal: boolean;
  showOrderModal: boolean;
  showCalculatorModal: boolean;
  showReviewModal: boolean;
}

interface OrderForm {
  name: string;
  phone: string;
  address: string;
  service: string;
  comment: string;
}

interface ReviewForm {
  name: string;
  rating: number;
  text: string;
  photo: any;
  video: any;
}

interface CalculatorData {
  serviceType: string;
  apartmentSize: string;
  radiatorCount: string;
  pipeLength: string;
}

interface ModalsProps {
  cities: string[];
  currentCity: string;
  services: Service[];
  modalState: ModalState;
  orderForm: OrderForm;
  reviewForm: ReviewForm;
  calculatorData: CalculatorData;
  calculatedPrice: number;
  onCityChange: (city: string) => void;
  onModalStateChange: (key: keyof ModalState, value: boolean) => void;
  onOrderFormChange: (key: keyof OrderForm, value: string) => void;
  onReviewFormChange: (key: keyof ReviewForm, value: any) => void;
  onCalculatorDataChange: (key: keyof CalculatorData, value: string) => void;
  onOrderSubmit: (e: any) => void;
  onReviewSubmit: (e: any) => void;
  onCalculatePrice: () => void;
  onFileUpload: (e: any, type: string) => void;
}

const Modals = ({
  cities,
  currentCity,
  services,
  modalState,
  orderForm,
  reviewForm,
  calculatorData,
  calculatedPrice,
  onCityChange,
  onModalStateChange,
  onOrderFormChange,
  onReviewFormChange,
  onCalculatorDataChange,
  onOrderSubmit,
  onReviewSubmit,
  onCalculatePrice,
  onFileUpload
}: ModalsProps) => {
  return (
    <>
      {/* Location Modal */}
      <Dialog open={modalState.showLocationModal} onOpenChange={(value) => onModalStateChange('showLocationModal', value)}>
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
                  onCityChange(city);
                  onModalStateChange('showLocationModal', false);
                }}
                className="justify-start"
              >
                {city}
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Order Modal */}
      <Dialog open={modalState.showOrderModal} onOpenChange={(value) => onModalStateChange('showOrderModal', value)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Оставить заявку</DialogTitle>
          </DialogHeader>
          <form onSubmit={onOrderSubmit} className="space-y-4">
            <Input
              placeholder="Ваше имя"
              value={orderForm.name}
              onChange={(e) => onOrderFormChange('name', e.target.value)}
              required
            />
            <Input
              placeholder="Телефон"
              value={orderForm.phone}
              onChange={(e) => onOrderFormChange('phone', e.target.value)}
              required
            />
            <Input
              placeholder="Адрес"
              value={orderForm.address}
              onChange={(e) => onOrderFormChange('address', e.target.value)}
              required
            />
            <Select onValueChange={(value) => onOrderFormChange('service', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите услугу" />
              </SelectTrigger>
              <SelectContent>
                {services.map((service) => (
                  <SelectItem key={service.title} value={service.title}>{service.title}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Textarea
              placeholder="Комментарий"
              value={orderForm.comment}
              onChange={(e) => onOrderFormChange('comment', e.target.value)}
            />
            <Button type="submit" className="w-full">Отправить заявку</Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Calculator Modal */}
      <Dialog open={modalState.showCalculatorModal} onOpenChange={(value) => onModalStateChange('showCalculatorModal', value)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Калькулятор стоимости</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Select onValueChange={(value) => {
              onCalculatorDataChange('serviceType', value);
            }}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите услугу" />
              </SelectTrigger>
              <SelectContent>
                {services.map((service) => (
                  <SelectItem key={service.title} value={service.title}>{service.title}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {calculatorData.serviceType === 'Промывка радиаторов' && (
              <Input
                type="number"
                placeholder="Количество секций"
                value={calculatorData.radiatorCount}
                onChange={(e) => onCalculatorDataChange('radiatorCount', e.target.value)}
              />
            )}
            
            {calculatorData.serviceType === 'Гидродинамическая промывка' && (
              <Input
                type="number"
                placeholder="Длина труб (метры)"
                value={calculatorData.pipeLength}
                onChange={(e) => onCalculatorDataChange('pipeLength', e.target.value)}
              />
            )}
            
            <Button onClick={onCalculatePrice} className="w-full">Рассчитать</Button>
            
            {calculatedPrice > 0 && (
              <div className="text-center p-4 bg-primary/10 rounded">
                <p className="text-lg font-bold">Примерная стоимость: {calculatedPrice} руб</p>
                <p className="text-sm text-muted-foreground">Точная стоимость определяется после осмотра</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Review Modal */}
      <Dialog open={modalState.showReviewModal} onOpenChange={(value) => onModalStateChange('showReviewModal', value)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Оставить отзыв</DialogTitle>
          </DialogHeader>
          <form onSubmit={onReviewSubmit} className="space-y-4">
            <Input
              placeholder="Ваше имя"
              value={reviewForm.name}
              onChange={(e) => onReviewFormChange('name', e.target.value)}
              required
            />
            <div>
              <label className="block text-sm font-medium mb-2">Оценка</label>
              <Select onValueChange={(value) => onReviewFormChange('rating', parseInt(value))}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите оценку" />
                </SelectTrigger>
                <SelectContent>
                  {[1,2,3,4,5].map((rating) => (
                    <SelectItem key={rating} value={rating.toString()}>
                      {rating} звезд{rating > 1 && rating < 5 ? 'ы' : rating === 1 ? 'а' : ''}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Textarea
              placeholder="Ваш отзыв"
              value={reviewForm.text}
              onChange={(e) => onReviewFormChange('text', e.target.value)}
              required
            />
            <div>
              <label className="block text-sm font-medium mb-2">Фото (необязательно)</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => onFileUpload(e, 'photo')}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Видео (необязательно)</label>
              <input
                type="file"
                accept="video/*"
                onChange={(e) => onFileUpload(e, 'video')}
                className="w-full"
              />
            </div>
            <Button type="submit" className="w-full">Отправить отзыв</Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Modals;