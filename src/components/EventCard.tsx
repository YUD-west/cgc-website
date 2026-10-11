import React from 'react';
import { ClubEvent } from '../types';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Video, 
  Users, 
  BookOpen, 
  CheckCircle, 
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

interface EventCardProps {
  event: ClubEvent;
  onRsvp?: (event: ClubEvent) => void;
  onViewRecap?: (event: ClubEvent) => void;
}

export const EventCard: React.FC<EventCardProps> = ({
  event,
  onRsvp,
  onViewRecap,
}) => {
  // Parse date
  const eventDate = new Date(event.date);
  const monthStr = eventDate.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
  const dayStr = eventDate.getDate();

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Workshop':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      case 'Hackathon':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'Project Build':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'Competition':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      case 'Tech Talk':
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
      default:
        return 'bg-slate-700 text-slate-300 border-slate-600';
    }
  };

  return (
    <div className="bg-[#111A2E] hover:bg-[#142038] border border-slate-800 hover:border-slate-700 rounded-xl p-6 transition-all duration-300 flex flex-col md:flex-row gap-6 shadow-card">
      {/* Date badge */}
      <div className="flex md:flex-col items-center justify-center p-3 md:w-24 md:h-28 bg-slate-900 rounded-xl border border-slate-800 text-center flex-shrink-0">
        <span className="text-xs font-bold text-blue-400 tracking-wider">
          {monthStr}
        </span>
        <span className="text-2xl md:text-3xl font-extrabold text-white ml-2 md:ml-0">
          {dayStr}
        </span>
        <span className="text-[10px] text-slate-500 hidden md:block">
          {eventDate.getFullYear()}
        </span>
      </div>

      {/* Main Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span
              className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${getCategoryColor(
                event.category
              )}`}
            >
              {event.category}
            </span>

            {event.isVirtual ? (
              <span className="inline-flex items-center gap-1 text-xs text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                <Video className="w-3 h-3 text-emerald-400" />
                Virtual Stream
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-xs text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                <MapPin className="w-3 h-3 text-blue-400" />
                In-Person Lab
              </span>
            )}

            {event.status === 'Past' && (
              <span className="text-xs text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                Concluded
              </span>
            )}
          </div>

          <h3 className="text-xl font-bold text-white hover:text-blue-300 transition-colors">
            {event.title}
          </h3>

          <p className="mt-2 text-sm text-slate-300 leading-relaxed">
            {event.description}
          </p>

          {/* Time & Venue */}
          <div className="mt-3 flex flex-wrap gap-y-1.5 gap-x-4 text-xs text-slate-400">
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>{event.venue}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-slate-400" />
              <span>Facilitator: {event.facilitator}</span>
            </div>
          </div>

          {/* Past Event Highlight if applicable */}
          {event.recapNotes && (
            <div className="mt-3 p-3 bg-slate-900/90 rounded-lg border border-slate-800 text-xs">
              <span className="text-emerald-400 font-semibold block mb-0.5">Event Outcome & Recap:</span>
              <span className="text-slate-300">{event.recapNotes}</span>
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            Target: <span className="text-slate-300">{event.targetAudience}</span>
          </span>

          {event.status === 'Upcoming' ? (
            onRsvp && (
              <button
                onClick={() => onRsvp(event)}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-sm flex items-center gap-1.5"
              >
                <span>Reserve Seat (Free)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )
          ) : (
            <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
              {event.attendeesCount || 40}+ Students Attended
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
