import { MessageCircle, Shield, MapPin, Star, Calendar, Briefcase, Heart, Globe } from 'lucide-react';

const AboutHost = ({ hotel }) => {
  const host = hotel?.host;
  
  if (!host) {
    return null;
  }

  const getYearsHosting = () => {
    const hostingSince = new Date(host.hosting_since);
    const now = new Date();
    return now.getFullYear() - hostingSince.getFullYear();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    });
  };

  const getReviewCount = () => {
    return hotel.reviews?.length || 0;
  };

  return (
    <div className="bg-white border-t border-gray-200 py-8">
      <div className="max-w-4xl">
        <h2 className="text-2xl font-semibold text-gray-900 mb-8">Meet your host</h2>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left side - Host card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 lg:w-96 h-fit">
            <div className="flex flex-col items-center text-center">
              {/* Host image with badge */}
              <div className="relative mb-4">
                <img
                  src={host.image || `https://ui-avatars.com/api/?name=${host.name}&background=random`}
                  alt={host.name}
                  className="w-24 h-24 rounded-full object-cover"
                />
                {host.is_superhost && (
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-pink-500 text-white rounded-full p-1">
                    <Shield className="w-4 h-4" />
                  </div>
                )}
              </div>

              {/* Host name and status */}
              <h3 className="text-2xl font-semibold text-gray-900 mb-1">{host.name}</h3>
              {host.is_superhost && (
                <div className="flex items-center gap-1 text-gray-600 mb-6">
                  <Shield className="w-4 h-4" />
                  <span className="text-sm">Superhost</span>
                </div>
              )}

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 w-full mb-6">
                <div className="text-center">
                  <div className="text-2xl font-semibold text-gray-900">{getReviewCount()}</div>
                  <div className="text-sm text-gray-600">Reviews</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-2xl font-semibold text-gray-900">
                    {host.rating}
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                  <div className="text-sm text-gray-600">Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-semibold text-gray-900">{getYearsHosting()}</div>
                  <div className="text-sm text-gray-600">Years hosting</div>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 text-gray-600 mb-6">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Lives in {hotel.location?.address?.split(',').slice(-2).join(',').trim()}</span>
              </div>

              {/* Message button */}
              <button className="w-full bg-gray-900 text-white rounded-lg py-3 font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Message host
              </button>
            </div>
          </div>

          {/* Right side - Host details */}
          <div className="flex-1 space-y-8">
            {/* Superhost info */}
            {host.is_superhost && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{host.name} is a Superhost</h3>
                <p className="text-gray-600 leading-relaxed">
                  Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.
                </p>
              </div>
            )}

            {/* Host details */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Host details</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-900">Response rate: 100%</span>
                </div>
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-900">Responds within an hour</span>
                </div>
                {host.work && (
                  <div className="flex items-center gap-3">
                    <Briefcase className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-900">My work: {host.work}</span>
                  </div>
                )}
                {host.languages && (
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-900">Speaks: {host.languages.join(', ')}</span>
                  </div>
                )}
              </div>
            </div>

            {/* About section */}
            {host.about_me && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">About {host.name}</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {host.about_me}
                </p>
                
                {/* Additional info */}
                <div className="space-y-2">
                  {host.obsession && (
                    <div className="flex items-center gap-3">
                      <Heart className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">Obsessed with: {host.obsession}</span>
                    </div>
                  )}
                  {host.hobbies && host.hobbies.length > 0 && (
                    <div className="flex items-start gap-3">
                      <Star className="w-4 h-4 text-gray-400 mt-1" />
                      <span className="text-gray-600">Hobbies: {host.hobbies.join(', ')}</span>
                    </div>
                  )}
                  {host.hosting_since && (
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">Hosting since {formatDate(host.hosting_since)}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Payment protection notice */}
            <div className="bg-gray-50 rounded-lg p-4 flex items-start gap-3">
              <Shield className="w-5 h-5 text-pink-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-600">
                To help protect your payment, always use Airbnb to send money and communicate with hosts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AboutHost