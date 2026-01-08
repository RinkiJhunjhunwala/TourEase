import React, { useMemo, useState, useRef } from 'react';
import { MapPin, Star, Heart, Clock, TrendingUp, Search } from 'lucide-react';

// Mock destinations data
const destinations = [
    {
        id: 1,
        name: 'Paris, France',
        image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800',
        rating: 4.9,
        reviews: 2847,
        bestFor: 'Culture, Art & History',
        season: 'Spring & Fall',
        cost: 'Moderate to Luxury'
    },
    {
        id: 2,
        name: 'Tokyo, Japan',
        image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800',
        rating: 4.8,
        reviews: 3214,
        bestFor: 'Culture, Food & Technology',
        season: 'Spring & Autumn',
        cost: 'Moderate'
    },
    {
        id: 3,
        name: 'Bali, Indonesia',
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800',
        rating: 4.7,
        reviews: 1923,
        bestFor: 'Beach & Relaxation',
        season: 'April - October',
        cost: 'Budget Friendly'
    },
    {
        id: 4,
        name: 'New York, USA',
        image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800',
        rating: 4.8,
        reviews: 4521,
        bestFor: 'City Life & Culture',
        season: 'Fall & Spring',
        cost: 'Moderate to Luxury'
    },
    {
        id: 5,
        name: 'Santorini, Greece',
        image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800',
        rating: 4.9,
        reviews: 2156,
        bestFor: 'Beach & Romance',
        season: 'May - September',
        cost: 'Luxury'
    },
    {
        id: 6,
        name: 'Dubai, UAE',
        image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800',
        rating: 4.7,
        reviews: 3892,
        bestFor: 'Luxury & Shopping',
        season: 'November - March',
        cost: 'Luxury'
    },
    {
        id: 7,
        name: 'Swiss Alps, Switzerland',
        image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800',
        rating: 4.9,
        reviews: 1654,
        bestFor: 'Mountain & Adventure',
        season: 'Winter & Summer',
        cost: 'Luxury'
    },
    {
        id: 8,
        name: 'Maldives',
        image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800',
        rating: 5.0,
        reviews: 1789,
        bestFor: 'Beach & Luxury Resort',
        season: 'November - April',
        cost: 'Luxury'
    },
    {
        id: 9,
        name: 'Barcelona, Spain',
        image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800',
        rating: 4.8,
        reviews: 3421,
        bestFor: 'Culture, Beach & Architecture',
        season: 'May - October',
        cost: 'Moderate'
    },
    {
        id: 10,
        name: 'Iceland',
        image: 'https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=800',
        rating: 4.9,
        reviews: 2341,
        bestFor: 'Nature & Adventure',
        season: 'Summer',
        cost: 'Moderate to Luxury'
    },
    {
        id: 11,
        name: 'Bangkok, Thailand',
        image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800',
        rating: 4.6,
        reviews: 4123,
        bestFor: 'Culture, Food & Budget Travel',
        season: 'November - February',
        cost: 'Budget Friendly'
    },
    {
        id: 12,
        name: 'Rome, Italy',
        image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800',
        rating: 4.8,
        reviews: 3876,
        bestFor: 'History, Culture & Food',
        season: 'Spring & Fall',
        cost: 'Moderate'
    }
];

// Custom hook for favorites
function useFavorites() {
    const [favorites, setFavorites] = useState([]);

    const toggleFavorite = (id) => {
        setFavorites(prev => 
            prev.includes(id) 
                ? prev.filter(fid => fid !== id)
                : [...prev, id]
        );
    };

    const isFavorite = (id) => favorites.includes(id);

    return { toggleFavorite, isFavorite };
}

export default function Destinations() {
    const { toggleFavorite, isFavorite } = useFavorites();
    const [activeFilter, setActiveFilter] = useState('All Destinations');
    const [searchQuery, setSearchQuery] = useState('');
    const destinationRefs = useRef({});

    const filters = [
        { label: 'All Destinations', keywords: [] },
        { label: 'Budget Friendly', keywords: ['budget'] },
        { label: 'Luxury', keywords: ['luxury'] },
        { label: 'Beach', keywords: ['beach'] },
        { label: 'Mountains', keywords: ['mountain'] },
        { label: 'Cultural', keywords: ['culture', 'history', 'art', 'museum'] },
    ];

    const filtered = useMemo(() => {
        let result = destinations;
        
        // Apply category filter
        if (activeFilter !== 'All Destinations') {
            const f = filters.find((x) => x.label === activeFilter);
            if (f && f.keywords.length) {
                result = result.filter((d) => {
                    const bestFor = (d.bestFor || '').toLowerCase();
                    return f.keywords.some((kw) => bestFor.includes(kw));
                });
            }
        }
        
        // Apply search filter
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            result = result.filter((d) => 
                d.name.toLowerCase().includes(query) ||
                d.bestFor.toLowerCase().includes(query) ||
                d.season.toLowerCase().includes(query)
            );
        }
        
        return result;
    }, [activeFilter, searchQuery]);

    const scrollToDestination = (id) => {
        if (destinationRefs.current[id]) {
            destinationRefs.current[id].scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
        }
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-teal-400 via-teal-500 to-cyan-600 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">Explore Destinations</h1>
                    <p className="text-xl md:text-2xl opacity-90 max-w-3xl">
                        Discover amazing places around the world, carefully curated for every type of traveler.
                    </p>
                </div>
            </div>

            {/* Filter Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Search Bar */}
                <div className="mb-8">
                    <div className="relative max-w-2xl mx-auto">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search destinations by name, type, or season..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 rounded-full border-2 border-gray-200 focus:border-teal-500 focus:outline-none text-lg"
                        />
                    </div>
                </div>

                <div className="flex flex-wrap gap-4 mb-12">
                    {filters.map((f) => (
                        <FilterButton
                            key={f.label}
                            label={f.label}
                            active={activeFilter === f.label}
                            onClick={() => setActiveFilter(f.label)}
                        />
                    ))}
                </div>
            </div>

            {/* Destinations Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                {filtered.length === 0 ? (
                    <div className="text-center py-16">
                        <p className="text-xl text-gray-500">No destinations found matching your search.</p>
                        <button 
                            onClick={() => { setSearchQuery(''); setActiveFilter('All Destinations'); }}
                            className="mt-4 text-teal-500 hover:text-teal-600 font-semibold"
                        >
                            Clear filters
                        </button>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {filtered.map((destination) => (
                            <div 
                                key={destination.id}
                                ref={(el) => destinationRefs.current[destination.id] = el}
                            >
                                <DestinationCard
                                    destination={destination}
                                    isFavorite={isFavorite(destination.id)}
                                    onToggleFavorite={() => toggleFavorite(destination.id)}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-br from-teal-400 via-teal-500 to-cyan-600 text-white py-20">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Ready to Explore?
                    </h2>
                    <p className="text-xl mb-10 opacity-90">
                        Start planning your next adventure with TourEase
                    </p>
                    <button className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-lg font-semibold transition text-lg">
                        Plan Your Trip
                    </button>
                </div>
            </div>
        </div>
    );
}

function FilterButton({ label, active, onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`px-6 py-2 rounded-full font-semibold transition ${
                active
                    ? 'bg-teal-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
        >
            {label}
        </button>
    );
}

function DestinationCard({ destination, isFavorite, onToggleFavorite }) {
    return (
        <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all overflow-hidden group cursor-pointer">
            {/* Image */}
            <div
                className="h-48 relative overflow-hidden bg-cover bg-center"
                style={{ backgroundImage: `url(${destination.image})` }}
            >
                <div className="absolute inset-0 bg-black opacity-20 group-hover:opacity-30 transition" />
                <button
                    onClick={onToggleFavorite}
                    className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100 transition z-10"
                >
                    <Heart
                        className={`w-6 h-6 transition ${
                            isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'
                        }`}
                    />
                </button>
            </div>

            <div className="p-6">
                <h3 className="font-bold text-xl mb-2">{destination.name}</h3>

                <div className="flex items-center mb-4">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <span className="ml-2 font-semibold">{destination.rating}</span>
                    <span className="text-gray-500 text-sm ml-2">({destination.reviews})</span>
                </div>

                <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-teal-600" />
                        Best for: {destination.bestFor}
                    </div>
                    <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-teal-600" />
                        Best season: {destination.season}
                    </div>
                    <div className="flex items-center">
                        <TrendingUp className="w-4 h-4 mr-2 text-teal-600" />
                        Budget: {destination.cost}
                    </div>
                </div>

                <button className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-lg font-semibold transition">
                    Explore
                </button>
            </div>
        </div>
    );
}