import React, { useState } from 'react'
import { useGeolocation } from '@/contexts/GeolocationContext'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import Icon from '@/components/ui/icon'

export const CityModal: React.FC = () => {
  const { showCityModal, setShowCityModal, cities, setUserCity } = useGeolocation()
  const [searchQuery, setSearchQuery] = useState('')
  const [isComboboxOpen, setIsComboboxOpen] = useState(false)

  const filteredCities = cities.filter(city =>
    city.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleCitySelect = (city: any) => {
    setUserCity(city)
    setSearchQuery('')
    setIsComboboxOpen(false)
  }

  return (
    <Dialog open={showCityModal} onOpenChange={setShowCityModal}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon name="MapPin" size={20} />
            Выберите ваш город
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Выберите город для отображения актуальных цен и контактов
          </p>
          
          <Popover open={isComboboxOpen} onOpenChange={setIsComboboxOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={isComboboxOpen}
                className="w-full justify-between"
              >
                {searchQuery || "Поиск города..."}
                <Icon name="ChevronsUpDown" size={16} />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput 
                  placeholder="Введите название города..." 
                  value={searchQuery}
                  onValueChange={setSearchQuery}
                />
                <CommandEmpty>Город не найден</CommandEmpty>
                <CommandGroup className="max-h-48 overflow-y-auto">
                  {filteredCities.map((city) => (
                    <CommandItem
                      key={city.name}
                      value={city.name}
                      onSelect={() => handleCitySelect(city)}
                      className="flex items-center gap-2"
                    >
                      <Icon name="MapPin" size={14} />
                      <div>
                        <div className="font-medium">{city.name}</div>
                        <div className="text-xs text-muted-foreground">{city.region}</div>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>

          <div className="grid grid-cols-2 gap-2">
            {cities.slice(0, 6).map((city) => (
              <Button
                key={city.name}
                variant="outline"
                size="sm"
                onClick={() => handleCitySelect(city)}
                className="text-left justify-start"
              >
                {city.name}
              </Button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CityModal