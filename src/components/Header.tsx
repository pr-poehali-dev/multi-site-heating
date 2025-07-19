import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Icon from '@/components/ui/icon';
import { useCityStore } from '@/stores/cityStore';
import { CITIES } from '@/data/cities';

interface HeaderProps {
  currentCity: string;
  onLocationClick: () => void;
}

const Header = ({ currentCity, onLocationClick }: HeaderProps) => {
  const { getSuggestedCities, setCurrentCity } = useCityStore();
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
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
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  className="flex items-center space-x-2 min-w-[200px] justify-between"
                >
                  <div className="flex items-center space-x-2">
                    <Icon name="MapPin" size={16} />
                    <span>{currentCity || 'Выберите город'}</span>
                  </div>
                  <Icon name="ChevronDown" size={16} />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[300px] p-0" align="end">
                <Command>
                  <CommandInput 
                    placeholder="Поиск города..." 
                    value={searchValue}
                    onValueChange={setSearchValue}
                  />
                  <CommandList>
                    <CommandEmpty>Город не найден</CommandEmpty>
                    <CommandGroup>
                      {getSuggestedCities(searchValue).map((city) => (
                        <CommandItem
                          key={city.id}
                          value={city.name}
                          onSelect={() => {
                            setCurrentCity(city);
                            setOpen(false);
                            setSearchValue('');
                          }}
                          className="flex items-center justify-between"
                        >
                          <div>
                            <div className="font-medium">{city.name}</div>
                            <div className="text-sm text-muted-foreground">{city.region}</div>
                          </div>
                          <div className="text-xs text-muted-foreground">{city.phone}</div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <div className="text-right">
              <div className="text-lg font-semibold text-primary">
                {currentCity && CITIES.find(c => c.name === currentCity)?.phone || '+7 (4852) 58-76-43'}
              </div>
              <div className="text-sm text-muted-foreground">
                {currentCity && CITIES.find(c => c.name === currentCity)?.workingHours || 'Звоните с 8:00 до 20:00'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;