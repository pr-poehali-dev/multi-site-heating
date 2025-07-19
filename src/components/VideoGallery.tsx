import { VideoItem } from '@/types/city';
import { RutubeVideo } from './RutubeVideo';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface VideoGalleryProps {
  videos: VideoItem[];
  title?: string;
  maxDisplay?: number;
  onAddVideo?: () => void;
  canEdit?: boolean;
}

export const VideoGallery = ({ 
  videos, 
  title = 'Видео наших работ',
  maxDisplay = 6,
  onAddVideo,
  canEdit = false
}: VideoGalleryProps) => {
  const displayVideos = videos.slice(0, maxDisplay);
  const hasMoreVideos = videos.length > maxDisplay;

  if (videos.length === 0 && !canEdit) {
    return null;
  }

  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
        {canEdit && (
          <Button onClick={onAddVideo} className="flex items-center gap-2">
            <Icon name="Plus" size={16} />
            Добавить видео
          </Button>
        )}
      </div>

      {videos.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
          <Icon name="Video" size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-600 mb-2">
            Видео пока не добавлены
          </h3>
          <p className="text-gray-500 mb-4">
            Добавьте видео с Rutube, чтобы показать свои работы
          </p>
          {canEdit && (
            <Button onClick={onAddVideo} className="flex items-center gap-2 mx-auto">
              <Icon name="Plus" size={16} />
              Добавить первое видео
            </Button>
          )}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayVideos.map((video) => (
              <RutubeVideo
                key={video.id}
                video={video}
                className="transition-transform hover:scale-105"
              />
            ))}
          </div>

          {hasMoreVideos && (
            <div className="text-center mt-8">
              <Button variant="outline" className="flex items-center gap-2 mx-auto">
                <Icon name="ChevronDown" size={16} />
                Показать ещё ({videos.length - maxDisplay})
              </Button>
            </div>
          )}
        </>
      )}
    </section>
  );
};