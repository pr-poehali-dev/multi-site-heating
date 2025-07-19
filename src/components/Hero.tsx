import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface HeroProps {
  currentCity: string;
  onOrderClick: () => void;
  onCalculatorClick: () => void;
}

const Hero = ({ currentCity, onOrderClick, onCalculatorClick }: HeroProps) => {
  return (
    <section className="bg-gradient-to-r from-gray-900 to-black text-primary py-20">
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
            <Button size="lg" onClick={onOrderClick} className="bg-primary hover:bg-accent text-primary-foreground">
              <Icon name="Phone" size={20} className="mr-2" />
              Вызвать мастера
            </Button>
            <Button size="lg" variant="outline" onClick={onCalculatorClick} className="text-primary border-primary hover:bg-primary hover:text-primary-foreground">
              <Icon name="Calculator" size={20} className="mr-2" />
              Рассчитать стоимость
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;