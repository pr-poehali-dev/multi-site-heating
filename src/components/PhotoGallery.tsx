import React, { useState } from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import Icon from '@/components/ui/icon'

interface Photo {
  id: string
  src: string
  alt: string
  description?: string
}

interface PhotoGalleryProps {
  photos: Photo[]
  title?: string
  className?: string
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({ 
  photos, 
  title = 'Галерея работ',
  className = '' 
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const openModal = (photo: Photo, index: number) => {
    setSelectedPhoto(photo)
    setCurrentIndex(index)
  }

  const closeModal = () => {
    setSelectedPhoto(null)
  }

  const nextPhoto = () => {
    const nextIndex = (currentIndex + 1) % photos.length
    setCurrentIndex(nextIndex)
    setSelectedPhoto(photos[nextIndex])
  }

  const prevPhoto = () => {
    const prevIndex = currentIndex === 0 ? photos.length - 1 : currentIndex - 1
    setCurrentIndex(prevIndex)
    setSelectedPhoto(photos[prevIndex])
  }

  return (
    <div className={className}>
      {title && (
        <h3 className="text-2xl font-bold mb-6 text-center">{title}</h3>
      )}
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((photo, index) => (
          <div
            key={photo.id}
            className="relative group cursor-pointer overflow-hidden rounded-lg bg-gray-100 aspect-square"
            onClick={() => openModal(photo, index)}
          >
            <img
              src={photo.src}
              alt={photo.alt}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <Icon name="ZoomIn" size={24} className="text-white" />
            </div>
            {photo.description && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-xs truncate">{photo.description}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <Dialog open={!!selectedPhoto} onOpenChange={closeModal}>
        <DialogContent className="max-w-4xl p-0 bg-black">
          {selectedPhoto && (
            <div className="relative">
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.alt}
                className="w-full max-h-[80vh] object-contain"
              />
              
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 text-white hover:bg-white/20"
                onClick={closeModal}
              >
                <Icon name="X" size={20} />
              </Button>

              {photos.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
                    onClick={prevPhoto}
                  >
                    <Icon name="ChevronLeft" size={24} />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
                    onClick={nextPhoto}
                  >
                    <Icon name="ChevronRight" size={24} />
                  </Button>
                </>
              )}

              {selectedPhoto.description && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <p className="text-white text-center">{selectedPhoto.description}</p>
                  <p className="text-white/60 text-sm text-center mt-1">
                    {currentIndex + 1} из {photos.length}
                  </p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default PhotoGallery