import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface HeaderProps {
  currentCity: string;
  onLocationClick: () => void;
}

const Header = ({ currentCity, onLocationClick }: HeaderProps) => {
  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name="Thermometer" size={32} className="text-primary" />
            <div>
              <h1 className="text-2xl font-bold">Промывка-отопления76.ru</h1>
              <p className="text-sm text-muted-foreground">Профессиональная промывка отопительных систем</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              onClick={onLocationClick}
              className="flex items-center space-x-2"
            >
              <Icon name="MapPin" size={16} />
              <span>{currentCity || 'Выберите город'}</span>
            </Button>
            <div className="text-right">
              <div className="text-lg font-semibold text-primary">+7 (4852) 58-76-43</div>
              <div className="text-sm text-muted-foreground">Звоните с 8:00 до 20:00</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;