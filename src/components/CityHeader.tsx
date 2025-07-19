import { City } from '@/types/city';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface CityHeaderProps {
  city: City | null;
  isLoading: boolean;
  onCityClick: () => void;
}

export const CityHeader = ({ city, isLoading, onCityClick }: CityHeaderProps) => {
  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-900 border-b shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="MapPin" size={20} className="text-gray-400 animate-pulse" />
              <span className="text-gray-500">Определяем местоположение...</span>
            </div>
            <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        </div>
      </div>
    );
  }

  if (!city) {
    return (
      <div className="bg-white dark:bg-gray-900 border-b shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <Button
            variant="outline"
            onClick={onCityClick}
            className="flex items-center gap-2"
          >
            <Icon name="MapPin" size={16} />
            Выберите город
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 border-b shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={onCityClick}
              className="flex items-center gap-2 text-left p-2"
            >
              <Icon name="MapPin" size={16} className="text-blue-600" />
              <div>
                <div className="font-medium">{city.name}</div>
                <div className="text-xs text-gray-500">{city.region}</div>
              </div>
              <Icon name="ChevronDown" size={16} className="text-gray-400" />
            </Button>
          </div>
          
          <div className="flex items-center gap-4 text-sm">
            <a href={`tel:${city.phone}`} className="flex items-center gap-1 text-blue-600 hover:text-blue-700">
              <Icon name="Phone" size={14} />
              {city.phone}
            </a>
            <div className="flex items-center gap-1 text-gray-600">
              <Icon name="Clock" size={14} />
              {city.workingHours}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};