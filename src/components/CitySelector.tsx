import { useState } from 'react';
import { City } from '@/types/city';
import { getActiveCities } from '@/data/cities';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';

interface CitySelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onCitySelect: (city: City) => void;
  currentCity: City | null;
  detectedCity?: City | null;
}

export const CitySelector = ({ 
  isOpen, 
  onClose, 
  onCitySelect, 
  currentCity,
  detectedCity 
}: CitySelectorProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const allCities = getActiveCities();
  
  const filteredCities = allCities.filter(city =>
    city.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCitySelect = (city: City) => {
    onCitySelect(city);
    onClose();
  };

  const groupedCities = filteredCities.reduce((acc, city) => {
    const region = city.region;
    if (!acc[region]) {
      acc[region] = [];
    }
    acc[region].push(city);
    return acc;
  }, {} as Record<string, City[]>);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon name="MapPin" size={20} />
            Выберите ваш город
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {detectedCity && (
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="Navigation" size={16} className="text-blue-600" />
                <span className="text-sm font-medium text-blue-600">Определили ваш город</span>
              </div>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => handleCitySelect(detectedCity)}
              >
                <Icon name="MapPin" size={16} className="mr-2" />
                {detectedCity.name}
              </Button>
            </div>
          )}
          
          <div className="relative">
            <Icon name="Search" size={16} className="absolute left-3 top-3 text-gray-400" />
            <Input
              placeholder="Поиск города..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <ScrollArea className="h-64">
            <div className="space-y-4">
              {Object.entries(groupedCities).map(([region, cities]) => (
                <div key={region}>
                  <h4 className="text-sm font-medium text-gray-500 mb-2 px-2">
                    {region}
                  </h4>
                  <div className="space-y-1">
                    {cities.map((city) => (
                      <Button
                        key={city.id}
                        variant={currentCity?.id === city.id ? "default" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => handleCitySelect(city)}
                      >
                        <Icon name="MapPin" size={16} className="mr-2" />
                        <div className="text-left">
                          <div>{city.name}</div>
                          {city.workingHours && (
                            <div className="text-xs text-gray-500">
                              {city.workingHours}
                            </div>
                          )}
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          
          {filteredCities.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Icon name="Search" size={32} className="mx-auto mb-2 opacity-50" />
              <p>Город не найден</p>
              <p className="text-sm">Попробуйте изменить запрос</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};