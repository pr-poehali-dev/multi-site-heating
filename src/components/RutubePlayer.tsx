import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface RutubePlayerProps {
  videoId: string;
  title: string;
  description?: string;
  thumbnail?: string;
  autoplay?: boolean;
  className?: string;
}

const RutubePlayer = ({ 
  videoId, 
  title, 
  description, 
  thumbnail, 
  autoplay = false,
  className = ""
}: RutubePlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const rutubeEmbedUrl = `https://rutube.ru/play/embed/${videoId}`;
  const rutubeThumbUrl = thumbnail || `https://pic.rutube.ru/video/${videoId}/snapshot/720x405.jpg`;

  const handlePlay = () => {
    setIsLoading(true);
    setIsPlaying(true);
  };

  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  if (!videoId) {
    return (
      <div className={`bg-gray-100 rounded-lg flex items-center justify-center min-h-[300px] ${className}`}>
        <div className="text-center text-gray-500">
          <Icon name="VideoOff" size={48} className="mx-auto mb-2" />
          <p>Видео недоступно</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative bg-black rounded-lg overflow-hidden ${className}`}>
      {!isPlaying ? (
        <div className="relative group cursor-pointer" onClick={handlePlay}>
          <img
            src={rutubeThumbUrl}
            alt={title}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/img/video-placeholder.jpg'; // fallback изображение
            }}
          />
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors flex items-center justify-center">
            <Button 
              size="lg" 
              className="bg-red-600 hover:bg-red-700 text-white rounded-full w-16 h-16 p-0"
            >
              <Icon name="Play" size={24} />
            </Button>
          </div>
          {title && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <h3 className="text-white font-semibold text-lg">{title}</h3>
              {description && (
                <p className="text-white/80 text-sm mt-1">{description}</p>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="relative">
          {isLoading && (
            <div className="absolute inset-0 bg-black flex items-center justify-center z-10">
              <div className="text-white text-center">
                <Icon name="Loader2" size={48} className="animate-spin mx-auto mb-2" />
                <p>Загрузка видео...</p>
              </div>
            </div>
          )}
          <iframe
            src={`${rutubeEmbedUrl}${autoplay ? '?autoStart=true' : ''}`}
            width="100%"
            height="400"
            frameBorder="0"
            allow="clipboard-write; autoplay"
            allowFullScreen
            onLoad={handleLoadComplete}
            className="w-full min-h-[300px] md:min-h-[400px]"
          />
        </div>
      )}
    </div>
  );
};

export default RutubePlayer;