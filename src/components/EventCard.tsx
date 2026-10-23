import React from 'react';
import { ClubEvent } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { TiltCard } from './Motion/TiltCard';
import { 
  Clock, 
  MapPin, 
  Video, 
  ArrowRight
} from 'lucide-react';

interface EventCardProps {
  event: ClubEvent;
  onRsvp?: (event: ClubEvent) => void;
  onViewRecap?: (event: ClubEvent) => void;
}

export const EventCard: React.FC<EventCardProps> = ({
  event,
  onRsvp,
}) => {
  const { t } = useLanguage();

  const isOfficial = event.id === 'evt-02' || event.title.toLowerCase().includes('building real projects');
  const displayTitle = isOfficial ? t('event.title') : event.title;
  const displayDesc = isOfficial ? t('event.desc') : event.description;
  const displayVenue = isOfficial ? t('brand.venue') : event.venue;

  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });

  return (
    <TiltCard
      maxTilt={6}
      scale={1.015}
      className="group bg-[#080808] hover:bg-[#111111] backdrop-blur-xl border border-[#2A2A2A] hover:border-[#FFC21A]/50 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between shadow-lg relative"
    >
      <div>
        {/* Category & Location */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full border bg-[#FFC21A]/10 text-[#FFC21A] border-[#FFC21A]/30">
            {event.category}
          </span>

          <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#A3A3A3]">
            {event.isVirtual ? (
              <>
                <Video className="w-3.5 h-3.5 text-[#FFC21A]" />
                <span>Virtual Session</span>
              </>
            ) : (
              <>
                <MapPin className="w-3.5 h-3.5 text-[#FFC21A]" />
                <span>IT Lab 01 &amp; 06</span>
              </>
            )}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-white group-hover:text-[#FFC21A] transition-colors line-clamp-2 mb-1.5">
          {displayTitle}
        </h3>

        {/* Schedule */}
        <p className="text-xs text-[#FFC21A] font-medium flex items-center gap-1.5 mb-3">
          <Clock className="w-3.5 h-3.5 text-[#FFC21A] shrink-0" />
          <span>{isOfficial ? t('event.time') : `${formattedDate} • ${event.time}`}</span>
        </p>

        {/* Brief description */}
        <p className="text-xs text-[#A3A3A3] line-clamp-4 leading-relaxed">
          {displayDesc}
        </p>
      </div>

      {/* Footer: Venue & Action */}
      <div className="mt-6 pt-4 border-t border-[#1C1C1C] flex items-center justify-between gap-3">
        <div className="text-[11px] text-[#737373] truncate max-w-[55%] flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-[#A3A3A3] shrink-0" />
          <span className="truncate">{displayVenue}</span>
        </div>

        {onRsvp && event.status === 'Upcoming' && (
          <button
            onClick={() => onRsvp(event)}
            className="px-4 py-2 text-xs font-bold rounded-lg bg-[#FFC21A] hover:bg-[#FFB81C] text-black shadow-sm transition-all flex items-center gap-1.5 shrink-0 active:scale-95 cursor-pointer"
          >
            <span>{t('events.rsvpBtn')}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </TiltCard>
  );
};
