import { useState } from 'react';
import { VideoItem } from '@/types/city';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

interface RutubeVideoProps {
  video: VideoItem;
  className?: string;
}

export const RutubeVideo = ({ video, className = '' }: RutubeVideoProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const embedUrl = `https://rutube.ru/play/embed/${video.rutubeId}/`;

  const handleThumbnailClick = () => {
    setIsModalOpen(true);
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  return (
    <>
      <div className={`relative cursor-pointer group ${className}`} onClick={handleThumbnailClick}>
        <div className="relative overflow-hidden rounded-lg bg-gray-200 aspect-video">
          {video.thumbnail ? (
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-300">
              <Icon name="Video" size={48} className="text-gray-500" />
            </div>
          )}
          
          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-colors">
            <div className="bg-red-600 hover:bg-red-700 rounded-full p-4 transform group-hover:scale-110 transition-transform">
              <Icon name="Play" size={24} className="text-white ml-1" />
            </div>
          </div>
          
          {/* Duration Badge */}
          {video.duration && (
            <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
              {video.duration}
            </div>
          )}
        </div>
        
        <div className="mt-3">
          <h3 className="font-medium text-sm line-clamp-2 group-hover:text-blue-600 transition-colors">
            {video.title}
          </h3>
          {video.description && (
            <p className="text-xs text-gray-600 mt-1 line-clamp-2">
              {video.description}
            </p>
          )}
        </div>
      </div>

      {/* Video Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl w-full p-0">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="flex items-center gap-2">
              <Icon name="Video" size={20} className="text-red-600" />
              {video.title}
            </DialogTitle>
          </DialogHeader>
          
          <div className="relative p-6 pt-4">
            <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                  <div className="text-white text-center">
                    <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                    <div className="text-sm">Загрузка видео...</div>
                  </div>
                </div>
              )}
              
              <iframe
                src={embedUrl}
                title={video.title}
                className="w-full h-full"
                frameBorder="0"
                allow="clipboard-write; autoplay"
                allowFullScreen
                onLoad={handleIframeLoad}
              />
            </div>
            
            {video.description && (
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h4 className="font-medium mb-2">Описание:</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {video.description}
                </p>
              </div>
            )}
            
            <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center gap-4">
                {video.duration && (
                  <span className="flex items-center gap-1">
                    <Icon name="Clock" size={14} />
                    {video.duration}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Icon name="Calendar" size={14} />
                  {new Date(video.uploadedAt).toLocaleDateString('ru-RU')}
                </span>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(video.rutubeUrl, '_blank')}
                className="flex items-center gap-1"
              >
                <Icon name="ExternalLink" size={14} />
                Смотреть на Rutube
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};