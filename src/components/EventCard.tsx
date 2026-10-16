import React from 'react';
import { ClubEvent } from '../types';
import { TiltCard } from './Motion/TiltCard';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Video, 
  ArrowRight,
  Sparkles
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
  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: 'numeric'
  });

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Workshop':
        return 'bg-blue-500/10 text-blue-300 border-blue-500/30';
      case 'Hackathon':
        return 'bg-amber-500/10 text-amber-300 border-amber-500/30';
      case 'Project Build':
        return 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30';
      case 'Competition':
        return 'bg-purple-500/10 text-purple-300 border-purple-500/30';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <TiltCard
      maxTilt={6}
      scale={1.015}
      className="group bg-[#0D1527]/95 hover:bg-[#121D35] backdrop-blur-xl border border-slate-700/70 hover:border-emerald-500/60 rounded-2xl p-5 transition-all duration-300 flex flex-col justify-between shadow-lg hover:shadow-glow-green relative"
    >
      <div>
        {/* Category & Mode Bar */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${getCategoryColor(event.category)}`}>
            {event.category}
          </span>

          <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-400">
            {event.isVirtual ? (
              <>
                <Video className="w-3.5 h-3.5 text-emerald-400" />
                <span>Virtual Session</span>
              </>
            ) : (
              <>
                <MapPin className="w-3.5 h-3.5 text-blue-400" />
                <span>Computer Lab 02</span>
              </>
            )}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors line-clamp-1">
          {event.title}
        </h3>

        {/* Sub-heading under title: Schedule */}
        <p className="text-xs text-blue-400 font-medium mt-1 flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-blue-400 shrink-0" />
          <span>{formattedDate} • {event.time}</span>
        </p>

        {/* Brief description */}
        <p className="mt-2.5 text-xs text-slate-300 line-clamp-2 leading-relaxed">
          {event.description}
        </p>
      </div>

      {/* Footer: Venue & Action */}
      <div className="mt-5 pt-3.5 border-t border-slate-800 flex items-center justify-between gap-3">
        <div className="text-[11px] text-slate-400 truncate max-w-[60%] flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="truncate">{event.venue}</span>
        </div>

        {onRsvp && event.status === 'Upcoming' && (
          <button
            onClick={() => onRsvp(event)}
            className="px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm transition-all flex items-center gap-1.5 shrink-0 active:scale-95"
          >
            <span>Reserve Seat</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </TiltCard>
  );
};
