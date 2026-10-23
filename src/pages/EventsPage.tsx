import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { EventCard } from '../components/EventCard';
import { EVENTS } from '../data/events';
import { ClubEvent } from '../types';
import { Calendar } from 'lucide-react';

interface EventsPageProps {
  onRsvp: (event: ClubEvent) => void;
  onNavigate: (tab: string) => void;
}

export const EventsPage: React.FC<EventsPageProps> = ({ onRsvp }) => {
  const { t } = useLanguage();

  // Only keep "Building Real Projects: From Idea to Working MVP"
  const singleEventList = EVENTS.filter((e) =>
    e.title.toLowerCase().includes('building real projects')
  );

  return (
    <div className="py-12 bg-black min-h-screen text-[#F2F2F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="pb-6 border-b border-[#2A2A2A] mb-8">
          <p className="text-xs uppercase font-semibold tracking-[0.2em] text-[#FFC21A] mb-1">
            {t('events.badge')}
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t('events.title')}
          </h1>
          <p className="text-xs sm:text-sm text-[#A3A3A3] mt-1 max-w-2xl leading-relaxed">
            {t('events.desc')}
          </p>
        </div>

        {/* Event Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {singleEventList.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onRsvp={onRsvp}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
