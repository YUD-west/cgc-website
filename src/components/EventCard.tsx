import React from 'react';
import { ClubEvent } from '../types';
import { 
  Calendar, 
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
  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: 'numeric'
  });

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Workshop':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'Hackathon':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'Project Build':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Competition':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="group bg-[#0F172A] hover:bg-[#142038] border border-slate-800 hover:border-slate-700 rounded-2xl p-5 transition-all duration-200 flex flex-col justify-between shadow-sm">
      <div>
        {/* Category & Mode Bar */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${getCategoryColor(event.category)}`}>
            {event.category}
          </span>

          <span className="inline-flex items-center gap-1 text-[11px] text-slate-400">
            {event.isVirtual ? (
              <>
                <Video className="w-3 h-3 text-emerald-400" />
                <span>Virtual</span>
              </>
            ) : (
              <>
                <MapPin className="w-3 h-3 text-blue-400" />
                <span>In-Person</span>
              </>
            )}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-1">
          {event.title}
        </h3>

        {/* Sub-heading under title: Schedule */}
        <p className="text-xs text-blue-400/90 font-medium mt-0.5 flex items-center gap-1.5">
          <Clock className="w-3 h-3 text-blue-400 shrink-0" />
          <span>{formattedDate} • {event.time}</span>
        </p>

        {/* Brief description */}
        <p className="mt-2 text-xs text-slate-400 line-clamp-2 leading-relaxed">
          {event.description}
        </p>
      </div>

      {/* Footer: Venue & Action */}
      <div className="mt-5 pt-3.5 border-t border-slate-800/80 flex items-center justify-between gap-3">
        <div className="text-[11px] text-slate-400 truncate max-w-[60%] flex items-center gap-1">
          <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
          <span className="truncate">{event.venue}</span>
        </div>

        {onRsvp && event.status === 'Upcoming' && (
          <button
            onClick={() => onRsvp(event)}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors flex items-center gap-1 shrink-0"
          >
            <span>RSVP</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        )}
      </div>
    </div>
  );
};
