import { Users, Award, Calendar, Share2, ArrowRight, GraduationCap } from 'lucide-react';

interface LandingPageProps {
  onNavigateToRegister: () => void;
}

export default function LandingPage({ onNavigateToRegister }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Excellence Academy</h1>
                <p className="text-xs text-gray-600">Alumni Network</p>
              </div>
            </div>
            <button
              onClick={onNavigateToRegister}
              className="hidden sm:flex items-center space-x-2 bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <span className="font-medium">Register as Alumni</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white py-20 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-300 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block mb-6 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <span className="text-sm font-medium">Building Bridges, Shaping Futures</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Reconnect. Inspire. Grow.
          </h2>
          <p className="text-xl sm:text-2xl mb-4 text-blue-100 font-light">
            Join Our Alumni Network
          </p>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-10">
            Be part of a thriving community of achievers who once dreamed the same dreams you did
          </p>

          <button
            onClick={onNavigateToRegister}
            className="inline-flex items-center space-x-3 bg-white text-blue-700 px-8 py-4 rounded-lg hover:bg-yellow-400 hover:text-blue-900 transition-all duration-300 shadow-2xl hover:shadow-yellow-400/50 hover:scale-105 text-lg font-semibold"
          >
            <span>Register as Alumni</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">About Our Alumni Community</h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our alumni network is a testament to excellence, dedication, and the pursuit of knowledge.
              We are proud of every student who has walked through our doors and achieved their dreams.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
                <h4 className="text-2xl font-bold text-blue-900 mb-3">Our Vision</h4>
                <p className="text-gray-700 leading-relaxed">
                  To create a lasting bond between alumni and foster a culture of mentorship,
                  collaboration, and continuous growth. We believe in giving back and lifting each other higher.
                </p>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-xl border border-yellow-200">
                <h4 className="text-2xl font-bold text-yellow-900 mb-3">Our Achievements</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-yellow-600 mr-2">●</span>
                    <span>Over 5,000+ successful alumni across IITs, NITs, and premier medical colleges</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-600 mr-2">●</span>
                    <span>200+ alumni working in Fortune 500 companies globally</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-600 mr-2">●</span>
                    <span>Annual alumni meet with 1000+ attendees from around the world</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-blue-600 hover:shadow-2xl transition-shadow duration-300">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <h5 className="text-3xl font-bold text-gray-900 mb-2">5000+</h5>
                <p className="text-gray-600">Alumni Members</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-yellow-500 hover:shadow-2xl transition-shadow duration-300">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-yellow-600" />
                </div>
                <h5 className="text-3xl font-bold text-gray-900 mb-2">95%</h5>
                <p className="text-gray-600">Success Rate</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-green-600 hover:shadow-2xl transition-shadow duration-300">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Calendar className="w-6 h-6 text-green-600" />
                </div>
                <h5 className="text-3xl font-bold text-gray-900 mb-2">50+</h5>
                <p className="text-gray-600">Events Annually</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-red-600 hover:shadow-2xl transition-shadow duration-300">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Share2 className="w-6 h-6 text-red-600" />
                </div>
                <h5 className="text-3xl font-bold text-gray-900 mb-2">1000+</h5>
                <p className="text-gray-600">Connections Made</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Success Stories</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our alumni continue to make us proud with their remarkable achievements
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-2xl font-bold">
                DR
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2 text-center">Dr. Rajesh Kumar</h4>
              <p className="text-blue-600 font-medium text-center mb-4">AIR 47 - NEET 2018</p>
              <p className="text-gray-600 text-center leading-relaxed">
                Currently practicing as a cardiologist at AIIMS Delhi. Active mentor for aspiring medical students.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-yellow-700 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-2xl font-bold">
                PS
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2 text-center">Priya Sharma</h4>
              <p className="text-blue-600 font-medium text-center mb-4">AIR 124 - JEE Advanced 2019</p>
              <p className="text-gray-600 text-center leading-relaxed">
                Software Engineer at Google, IIT Bombay graduate. Regularly conducts coding workshops for students.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-green-800 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-2xl font-bold">
                AM
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2 text-center">Arjun Mehta</h4>
              <p className="text-blue-600 font-medium text-center mb-4">AIR 89 - JEE Advanced 2017</p>
              <p className="text-gray-600 text-center leading-relaxed">
                Mechanical Engineer at Tesla, IIT Delhi alumnus. Passionate about renewable energy innovation.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-blue-600 to-blue-900 rounded-2xl shadow-2xl p-8 sm:p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400 rounded-full opacity-10 blur-3xl"></div>
            <div className="relative">
              <h3 className="text-3xl sm:text-4xl font-bold mb-4">Benefits of Joining</h3>
              <div className="grid sm:grid-cols-2 gap-6 mb-8">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-yellow-400 rounded-full flex-shrink-0 mt-1"></div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Mentorship Programs</h4>
                    <p className="text-blue-100">Guide and be guided by fellow alumni</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-yellow-400 rounded-full flex-shrink-0 mt-1"></div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Networking Events</h4>
                    <p className="text-blue-100">Connect with professionals across industries</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-yellow-400 rounded-full flex-shrink-0 mt-1"></div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Career Opportunities</h4>
                    <p className="text-blue-100">Exclusive job postings and referrals</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-yellow-400 rounded-full flex-shrink-0 mt-1"></div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Annual Alumni Meets</h4>
                    <p className="text-blue-100">Reunite, reminisce, and celebrate success</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-gradient-to-br from-yellow-50 to-yellow-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block mb-6 px-4 py-2 bg-yellow-200 rounded-full">
            <span className="text-sm font-bold text-yellow-900">UPCOMING EVENT</span>
          </div>
          <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Annual Alumni Meet 2025</h3>
          <p className="text-xl text-gray-700 mb-6">December 15, 2025 | Grand Ballroom, Hotel Meridien</p>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join us for an evening of celebration, networking, and inspiration. Meet old friends,
            make new connections, and share your journey.
          </p>
          <button
            onClick={onNavigateToRegister}
            className="inline-flex items-center space-x-3 bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl text-lg font-semibold"
          >
            <span>Register Now</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h4 className="text-2xl font-bold mb-4">Stay Connected</h4>
            <p className="text-gray-400 mb-6">Follow us on social media for updates and stories</p>
            <div className="flex justify-center space-x-6">
              <a href="#" className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors duration-300">
                <Share2 className="w-5 h-5" />
              </a>
              <a href="#" className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors duration-300">
                <Share2 className="w-5 h-5" />
              </a>
              <a href="#" className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors duration-300">
                <Share2 className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Excellence Academy Alumni Network. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
