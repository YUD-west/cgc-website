import React, { useState } from 'react';
import { SectionHeader } from '../components/SectionHeader';
import { EventCard } from '../components/EventCard';
import { EVENTS } from '../data/events';
import { ClubEvent } from '../types';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  CheckCircle, 
  Sparkles, 
  Users, 
  Filter,
  Info
} from 'lucide-react';

interface EventsPageProps {
  onRsvp: (event: ClubEvent) => void;
  onNavigate: (tab: string) => void;
}

export const EventsPage: React.FC<EventsPageProps> = ({ onRsvp, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const upcomingEvents = EVENTS.filter((e) => e.status === 'Upcoming');
  const pastEvents = EVENTS.filter((e) => e.status === 'Past');

  const currentList = activeTab === 'upcoming' ? upcomingEvents : pastEvents;

  const filteredList = currentList.filter((e) => {
    return selectedCategory === 'all' || e.category === selectedCategory;
  });

  const categories = ['all', 'Workshop', 'Hackathon', 'Project Build', 'Tech Talk', 'Competition'];

  return (
    <div className="space-y-12 sm:space-y-16 pb-20 pt-12 sm:pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeader
          badge="Learning & Gatherings"
          badgeColor="green"
          title="Events & Practical Activities"
          description="Hands-on technical workshops, algorithmic hackathons, and cross-department innovation mixers at Ambo University Woliso Campus."
        />

        {/* Realistic Placeholder Notice */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 flex items-start sm:items-center gap-3 mb-8">
          <Info className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5 sm:mt-0" />
          <div>
            <strong className="text-white">Campus Calendar Notice:</strong> Schedule dates and locations reflect realistic Woliso Campus lab sessions. RSVPs are completely free and reserve a workstation in Computer Lab 02.
          </div>
        </div>

        {/* Tab Controls: Upcoming vs Past */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-900 border border-slate-800 w-fit">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'upcoming'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Upcoming Activities ({upcomingEvents.length})
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'past'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Past Event Recaps ({pastEvents.length})
            </button>
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-slate-800 text-white border border-slate-700'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat === 'all' ? 'All Formats' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Event List */}
        <div className="mt-8 space-y-4">
          {filteredList.length > 0 ? (
            filteredList.map((event) => (
              <EventCard key={event.id} event={event} onRsvp={onRsvp} />
            ))
          ) : (
            <div className="p-12 rounded-3xl bg-[#111A2E] border border-slate-800 text-center space-y-3">
              <Calendar className="w-10 h-10 text-slate-500 mx-auto" />
              <h3 className="text-lg font-bold text-white">No Events in this Category</h3>
              <p className="text-xs text-slate-400">
                Check back soon or select "All Formats" to view upcoming activities.
              </p>
            </div>
          )}
        </div>

        {/* Suggest a Workshop / Speaker Box */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-slate-900 to-[#111A2E] border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-bold text-white">Want to host or facilitate a technical session?</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">
              Are you a senior student, alumni, or faculty member with expertise in a tool, paper, or technology? CGC provides lab resources, projection, and student audiences.
            </p>
          </div>
          <button
            onClick={() => onNavigate('contact')}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 whitespace-nowrap transition-colors"
          >
            Get In Touch With Event Organizers
          </button>
        </div>

      </div>
    </div>
  );
};
