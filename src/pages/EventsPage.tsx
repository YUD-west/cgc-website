import React, { useState } from 'react';
import { SectionHeader } from '../components/SectionHeader';
import { EventCard } from '../components/EventCard';
import { EVENTS } from '../data/events';
import { CAMPUS_EVENT_PHOTOS, CampusEventPhoto } from '../data/team';
import { ClubEvent } from '../types';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Maximize2,
  X,
  Sparkles,
  Award,
  ExternalLink
} from 'lucide-react';

interface EventsPageProps {
  onRsvp: (event: ClubEvent) => void;
  onNavigate: (tab: string) => void;
}

export const EventsPage: React.FC<EventsPageProps> = ({ onRsvp, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'gallery'>('upcoming');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<CampusEventPhoto | null>(null);

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
          title="Campus Events & Hackathons"
          description="Hands-on technical workshops, competitive hackathons, and laboratory sessions at Ambo University, Woliso Campus."
        />

        {/* Tab Controls: Upcoming vs Past vs Gallery */}
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
              Upcoming ({upcomingEvents.length})
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'past'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Past Recaps ({pastEvents.length})
            </button>
            <button
              onClick={() => setActiveTab('gallery')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'gallery'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-emerald-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Event Photo Archive ({CAMPUS_EVENT_PHOTOS.length})</span>
            </button>
          </div>

          {/* Category Filter Chips (when in upcoming or past) */}
          {activeTab !== 'gallery' && (
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
          )}
        </div>

        {/* 
          =======================================================
          GALLERY VIEW (AUTHENTIC EVENT PHOTOS)
          =======================================================
        */}
        {activeTab === 'gallery' ? (
          <div className="space-y-6 animate-fade-in">
            <div className="p-4 rounded-2xl bg-blue-950/40 border border-blue-500/30 text-xs text-blue-200">
              <strong>Official Photo Archive:</strong> Authentic captures from the Cursor Hackathon Ambo, IT Orientation & Welcome Ceremony, and practical coding labs at Ambo University Woliso Campus.
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CAMPUS_EVENT_PHOTOS.map((photo) => (
                <div
                  key={photo.id}
                  onClick={() => setSelectedPhoto(photo)}
                  className="group cursor-pointer rounded-2xl overflow-hidden bg-[#111A2E] border border-slate-800 hover:border-blue-500/50 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="relative h-60 w-full overflow-hidden bg-slate-950">
                    <img
                      src={photo.imageUrl}
                      alt={photo.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111A2E] via-transparent to-transparent opacity-80" />
                    <span className="absolute top-3 right-3 bg-slate-900/90 backdrop-blur-md px-2 py-1 rounded-md text-[10px] font-mono text-emerald-400 border border-slate-700 flex items-center gap-1">
                      <Maximize2 className="w-3 h-3" />
                      <span>Expand</span>
                    </span>
                  </div>

                  <div className="p-5 space-y-2">
                    <div className="flex items-center gap-1.5 text-xs text-blue-400 font-semibold">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{photo.event}</span>
                    </div>
                    <h4 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                      {photo.title}
                    </h4>
                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                      {photo.description}
                    </p>
                    <div className="pt-2 flex flex-wrap gap-1">
                      {photo.tags.map((t, i) => (
                        <span key={i} className="text-[10px] font-mono bg-slate-900 text-slate-400 px-2 py-0.5 rounded border border-slate-800">
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Event List (Upcoming or Past) */
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
        )}

        {/* Suggest a Workshop / Speaker Box */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-slate-900 to-[#111A2E] border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-bold text-white">Want to organize or facilitate a tech event?</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">
              CGC provides lab computers, projector screening, and student audiences in the Main ICT Building. Contact Lead Admin Yesuf Dergu.
            </p>
          </div>
          <button
            onClick={() => onNavigate('contact')}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold whitespace-nowrap transition-colors"
          >
            Get In Touch With Event Organizers
          </button>
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in" onClick={() => setSelectedPhoto(null)}>
          <div className="relative max-w-4xl w-full bg-[#111A2E] rounded-2xl overflow-hidden border border-slate-700 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors"
              aria-label="Close photo preview"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={selectedPhoto.imageUrl}
              alt={selectedPhoto.title}
              className="w-full max-h-[75vh] object-contain bg-black"
            />
            <div className="p-5 bg-slate-900 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div>
                <span className="text-[11px] font-mono text-blue-400 font-semibold uppercase block">{selectedPhoto.event} • {selectedPhoto.location}</span>
                <span className="font-bold text-white text-base mt-0.5 block">{selectedPhoto.title}</span>
                <p className="text-slate-300 mt-1 max-w-2xl">{selectedPhoto.description}</p>
              </div>
              <span className="text-emerald-400 font-mono font-semibold bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20 whitespace-nowrap">
                Ambo University
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
