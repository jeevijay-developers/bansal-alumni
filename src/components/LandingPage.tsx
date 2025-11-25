import { Users, Award, Calendar, Share2, ArrowRight } from "lucide-react";
import { FaBalanceScale, FaPeopleArrows } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
interface LandingPageProps {
  onNavigateToRegister: () => void;
  onNavigateToConnect: () => void;
}

export default function LandingPage({
  onNavigateToRegister,
  onNavigateToConnect,
}: LandingPageProps) {
  return (
    <div className="min-h-screen ">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src="/logo.png"
                alt="BANSAL CLASSES Logo"
                className="h-14 w-auto object-contain"
              />
            </div>
            <div className="hidden sm:flex items-center space-x-3">
              <button
                onClick={onNavigateToConnect}
                className="inline-flex items-center space-x-2 border-2 border-primary-700 text-primary-700 px-5 py-2.5 rounded-lg hover:bg-primary-50 transition-all duration-300"
              >
                <span className="font-medium">Connect With Alumni</span>
              </button>
              <button
                onClick={onNavigateToRegister}
                className="inline-flex items-center space-x-2 bg-primary-700 text-primary-50 px-6 py-2.5 rounded-lg hover:bg-primary-800 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <span className="font-medium">Register as Alumni</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <section className="relative bg-primary-700 text-primary-50 py-20 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-100 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-200 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block mb-6 px-4 py-2 bg-white/40 backdrop-blur-sm rounded-full border border-primary-900/20">
            <span className="text-sm font-medium">
              Once a BANSALite, Always a BANSALite
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Welcome BANSALites
          </h2>
          <p className="text-xl sm:text-2xl mb-4 text-primary-100 font-light">
            BANSAL Alumni Association
          </p>
          <p className="text-lg max-w-2xl mx-auto mb-10">
            A vibrant community built to celebrate the enduring bond between
            BANSAL CLASSES and its proud alumni. Here, the journey never really
            ends — it simply evolves.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onNavigateToRegister}
              className="inline-flex items-center space-x-3 text-white px-8 py-4 rounded-lg border-2 border-white shadow-2xl hover:shadow-white/50 transition-all duration-300 hover:scale-105 text-lg font-semibold"
            >
              <span>Register as Alumni</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={onNavigateToConnect}
              className="inline-flex items-center space-x-3 text-primary-700 bg-white px-8 py-4 rounded-lg shadow-2xl hover:shadow-white/50 transition-all duration-300 hover:scale-105 text-lg font-semibold"
            >
              <span>Connect With Alumni</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl sm:text-4xl font-bold text-primary-900 mb-4">
              About BANSALites
            </h3>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              What began in the classrooms of BANSAL continues as a lifelong
              connection of shared dreams, growth, and inspiration. Our alumni
              are the living legacy of BANSAL CLASSES — the torchbearers of its
              values and vision.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className=" p-6 rounded-xl border border-primary-200">
                <h4 className="text-2xl font-bold text-primary-900 mb-3">
                  Our Vision
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  To build a vibrant and lifelong community that celebrates the
                  legacy of BANSAL CLASSES. We aim to create a powerful network
                  of alumni who inspire, support, and empower one another —
                  while contributing meaningfully to education, innovation, and
                  society.
                </p>
              </div>

              <div className=" p-6 rounded-xl border border-primary-200">
                <h4 className="text-2xl font-bold text-primary-900 mb-3">
                  Our Mission
                </h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-gray-700 mr-2">●</span>
                    <span>
                      Connect alumni across batches, regions, and professions
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-700 mr-2">●</span>
                    <span>
                      Provide a platform for knowledge-sharing and mentorship
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-700 mr-2">●</span>
                    <span>Celebrate alumni achievements and milestones</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className=" p-6 rounded-xl shadow-lg border-t-4 border-primary-500 hover:shadow-2xl transition-shadow duration-300">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-gray-700" />
                </div>
                <h5 className="text-3xl font-bold text-primary-900 mb-2">
                  26000+
                </h5>
                <p className="text-gray-700">Alumni Members</p>
              </div>

              <div className=" p-6 rounded-xl shadow-lg border-t-4 border-primary-500 hover:shadow-2xl transition-shadow duration-300">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-gray-700" />
                </div>
                <h5 className="text-3xl font-bold text-primary-900 mb-2">
                  56%
                </h5>
                <p className="text-gray-700">Success Rate</p>
              </div>

              <div className=" p-6 rounded-xl shadow-lg border-t-4 border-primary-600 hover:shadow-2xl transition-shadow duration-300">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Calendar className="w-6 h-6 text-gray-700" />
                </div>
                <h5 className="text-3xl font-bold text-primary-900 mb-2">
                  20+
                </h5>
                <p className="text-gray-700">Events Annually</p>
              </div>

              <div className=" p-6 rounded-xl shadow-lg border-t-4 border-primary-700 hover:shadow-2xl transition-shadow duration-300">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Share2 className="w-6 h-6 text-gray-700" />
                </div>
                <h5 className="text-3xl font-bold text-primary-900 mb-2">
                  3500+
                </h5>
                <p className="text-gray-700">Connections Made</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl sm:text-4xl font-bold text-primary-900 mb-4">
              Our Core Values
            </h3>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Values that define who we are and what we stand for — grounded in
              IDEA: Integrity, Diversity, Ethics, and Authenticity
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-20 h-20 bg-primary-700 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-2xl font-bold">
                <FaPeopleGroup />
              </div>
              <h4 className="text-xl font-bold text-primary-900 mb-2 text-center">
                Integrity
              </h4>
              <p className="text-gray-600 text-center leading-relaxed">
                We act with honesty and transparency in all our endeavors,
                staying true to the values that BANSAL CLASSES instilled in us.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-20 h-20 bg-primary-700 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-2xl font-bold">
                <FaPeopleArrows />
              </div>
              <h4 className="text-xl font-bold text-primary-900 mb-2 text-center">
                Diversity
              </h4>
              <p className="text-gray-600 text-center leading-relaxed">
                We embrace people from all backgrounds, experiences, and
                perspectives, celebrating the unique journey of every BANSALite.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-20 h-20 bg-primary-700 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-2xl font-bold">
                <FaBalanceScale />
              </div>
              <h4 className="text-xl font-bold text-primary-900 mb-2 text-center">
                Ethics
              </h4>
              <p className="text-gray-600 text-center leading-relaxed">
                We uphold strong moral principles and professional conduct,
                reflecting the ethical foundation of our education.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-4 py-2 bg-primary-100 rounded-full border border-primary-200">
              <span className="text-sm font-bold text-primary-900">
                LEGACY OF EXCELLENCE
              </span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-bold text-primary-900 mb-4">
              Our All India Rank 1 Achievers
            </h3>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-6">
              BANSAL CLASSES has produced 5 AIR 1 and 6 AIR 2 rankers in IIT
              JEE-Advanced — a testament to dedication, hard work, and the
              transformative power of quality education.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-t-4 border-primary-700">
              <div className="flex items-center justify-center mb-6">
                <div className="relative">
                  <div className="w-24 h-24 bg-gray-100 rounded-full overflow-hidden border-4 border-primary-700">
                    <img
                      src="/Alumnis/nitinsquare.png"
                      alt="Nitin Gupta"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -top-2 -right-2 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-primary-900 font-bold text-sm shadow-lg">
                    #1
                  </div>
                </div>
              </div>
              <h4 className="text-xl font-bold text-primary-900 mb-2 text-center">
                Nitin Gupta
              </h4>
              <p className="text-primary-700 font-semibold text-center mb-3">
                AIR 1 | IIT JEE 2000
              </p>
              <p className="text-gray-600 text-center text-sm leading-relaxed">
                The pioneer who set the benchmark. Nitin's achievement marked
                the beginning of BANSAL's legacy of producing toppers who went
                on to excel globally.
              </p>
            </div>

            <div className="p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-t-4 border-primary-700 lg:col-span-1 md:col-span-2 lg:row-span-2">
              <div className="flex items-center justify-center mb-6">
                <div className="relative">
                  <div className="w-32 h-32 bg-gray-100 rounded-full overflow-hidden border-4 border-primary-700">
                    <img
                      src="/Alumnis/dungsquare.png"
                      alt="Dungra Ram Choudhary"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -top-3 -right-3 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-primary-900 font-bold text-lg shadow-lg">
                    #1
                  </div>
                </div>
              </div>
              <h4 className="text-2xl font-bold text-primary-900 mb-2 text-center">
                Dungra Ram Choudhary
              </h4>
              <p className="text-primary-700 font-semibold text-center mb-4 text-lg">
                AIR 1 | IIT JEE 2002
              </p>
              <div className="bg-white p-4 rounded-lg mb-4">
                <p className="text-sm text-primary-900 font-semibold mb-2 text-center">
                  📖 A Story That Inspires Millions
                </p>
              </div>
              <p className="text-gray-700 text-center text-sm leading-relaxed mb-3">
                Born in a small village in Nagaur district, Rajasthan, Dungra
                Ram was a Hindi medium student from a farmer's family. Growing
                up in a <span className="font-semibold">kachcha house</span>{" "}
                with limited resources, he faced immense hardships.
              </p>
              <p className="text-gray-700 text-center text-sm leading-relaxed mb-3">
                Despite these challenges, his determination and BANSAL's
                guidance helped him achieve the impossible —{" "}
                <span className="font-bold text-primary-900">
                  All India Rank 1
                </span>{" "}
                in IIT JEE.
              </p>
              <p className="text-primary-800 text-center text-sm font-semibold italic">
                "From a village classroom to conquering IIT JEE — Dungra Ram's
                journey proves that dreams know no boundaries."
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-t-4 border-primary-700">
              <div className="flex items-center justify-center mb-6">
                <div className="relative">
                  <div className="w-24 h-24 bg-gray-100 rounded-full overflow-hidden border-4 border-primary-700">
                    <img
                      src="/Alumnis/achinsquare.png"
                      alt="Achin Bansal"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -top-2 -right-2 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-primary-900 font-bold text-sm shadow-lg">
                    #1
                  </div>
                </div>
              </div>
              <h4 className="text-xl font-bold text-primary-900 mb-2 text-center">
                Achin Bansal
              </h4>
              <p className="text-primary-700 font-semibold text-center mb-3">
                AIR 1 | IIT JEE 2007
              </p>
              <p className="text-gray-600 text-center text-sm leading-relaxed">
                A brilliant mind with exceptional analytical skills. Achin's
                dedication to perfection and problem-solving made him stand out
                among thousands of aspirants.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-t-4 border-primary-700">
              <div className="flex items-center justify-center mb-6">
                <div className="relative">
                  <div className="w-24 h-24 bg-gray-100 rounded-full overflow-hidden border-4 border-primary-700">
                    <img
                      src="/Alumnis/shitikantsquare.png"
                      alt="Shitikanth"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -top-2 -right-2 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-primary-900 font-bold text-sm shadow-lg">
                    #1
                  </div>
                </div>
              </div>
              <h4 className="text-xl font-bold text-primary-900 mb-2 text-center">
                Shitikanth
              </h4>
              <p className="text-primary-700 font-semibold text-center mb-3">
                AIR 1 | IIT JEE 2008
              </p>
              <p className="text-gray-600 text-center text-sm leading-relaxed">
                Known for his consistent performance and strategic approach.
                Shitikanth's focus and discipline made him a role model for
                future aspirants.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-t-4 border-primary-700">
              <div className="flex items-center justify-center mb-6">
                <div className="relative">
                  <div className="w-24 h-24 bg-gray-100 rounded-full overflow-hidden border-4 border-primary-700">
                    <img
                      src="/Alumnis/satvatsquare.png"
                      alt="Satvat Jagwani"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -top-2 -right-2 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-primary-900 font-bold text-sm shadow-lg">
                    #1
                  </div>
                </div>
              </div>
              <h4 className="text-xl font-bold text-primary-900 mb-2 text-center">
                Satvat Jagwani
              </h4>
              <p className="text-primary-700 font-semibold text-center mb-3">
                AIR 1 | IIT JEE 2015
              </p>
              <p className="text-gray-600 text-center text-sm leading-relaxed">
                The most recent AIR 1 from BANSAL, Satvat combined modern
                learning techniques with traditional hard work to achieve
                excellence.
              </p>
            </div>
          </div>

          {/* <div className="bg-primary-700 rounded-2xl shadow-2xl p-8 sm:p-12 text-primary-50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-200 rounded-full opacity-10 blur-3xl"></div>
            <div className="relative text-center">
              <h3 className="text-2xl sm:text-3xl font-bold mb-6">
                The BANSAL Legacy
              </h3>
              <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <div className="text-4xl font-bold text-white mb-2">5×</div>
                  <p className="text-primary-100 font-semibold">AIR 1</p>
                  <p className="text-sm text-primary-200 mt-1">
                    All India Rank 1
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <div className="text-4xl font-bold text-white mb-2">6×</div>
                  <p className="text-primary-100 font-semibold">AIR 2</p>
                  <p className="text-sm text-primary-200 mt-1">
                    All India Rank 2
                  </p>
                </div>
              </div>
              <p className="text-white mt-8 text-lg max-w-3xl mx-auto">
                These remarkable achievements reflect BANSAL's commitment to
                nurturing talent, fostering excellence, and transforming dreams
                into reality.
              </p>
            </div>
          </div> */}
        </div>
      </section>

      <section className="py-16 sm:py-24 ">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary-700 rounded-2xl shadow-2xl p-8 sm:p-12 text-primary-50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-200 rounded-full opacity-10 blur-3xl"></div>
            <div className="relative">
              <h3 className="text-3xl sm:text-4xl font-bold mb-4">
                Why Join Bansal Alumni Association?
              </h3>
              <div className="grid sm:grid-cols-2 gap-6 mb-8">
                <div className="flex items-start space-x-3">
                  <div className="w-4 h-4 bg-white rounded-full flex-shrink-0 mt-1"></div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Reconnect</h4>
                    <p className="text-white">
                      Find and reconnect with your batchmates, mentors, and
                      friends
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-4 h-4 bg-white rounded-full flex-shrink-0 mt-1"></div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Network</h4>
                    <p className="text-white">
                      Build professional relationships and discover new
                      collaborations
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-4 h-4 bg-white rounded-full flex-shrink-0 mt-1"></div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Mentor & Inspire</h4>
                    <p className="text-white">
                      Share your knowledge to guide future BANSAL students
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-4 h-4 bg-white rounded-full flex-shrink-0 mt-1"></div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Give Back</h4>
                    <p className="text-white">
                      Contribute to educational initiatives and scholarships
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 ">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block mb-6 px-4 py-2 bg-primary-100 rounded-full border border-primary-200">
            <span className="text-sm font-bold text-primary-900">
              BE A PART OF THE BANSAL LEGACY
            </span>
          </div>
          <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Join the BANSALites Community
          </h3>
          <p className="text-xl text-gray-700 mb-6">
            Stay Connected. Stay Inspired. Stay BANSALite.
          </p>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Every student who walks through the doors of BANSAL CLASSES carries
            forward a legacy of learning, perseverance, and excellence. Register
            today and be part of a thriving community of thinkers, dreamers, and
            achievers.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onNavigateToRegister}
              className="inline-flex items-center space-x-3 bg-primary text-primary-50 px-8 py-4 rounded-lg hover:bg-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl text-lg font-semibold"
            >
              <span>Register Now</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={onNavigateToConnect}
              className="inline-flex items-center space-x-3 border-2 border-primary-700 text-primary-700 px-8 py-4 rounded-lg hover:bg-primary-50 transition-all duration-300 shadow-lg hover:shadow-xl text-lg font-semibold"
            >
              <span>Explore Alumni Network</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      <footer className="bg-primary-900 text-primary-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h4 className="text-2xl font-bold mb-4">Stay Connected</h4>
            <p className="mb-6">
              Follow us on social media for updates and stories
            </p>
            <div className="flex justify-center space-x-6">
              <a
                href="#"
                className="w-12 h-12 bg-primary rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors duration-300"
              >
                <Share2 className="w-5 h-5 text-primary-50" />
              </a>
              <a
                href="#"
                className="w-12 h-12 bg-primary rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors duration-300"
              >
                <Share2 className="w-5 h-5 text-primary-50" />
              </a>
              <a
                href="#"
                className="w-12 h-12 bg-primary rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors duration-300"
              >
                <Share2 className="w-5 h-5 text-primary-50" />
              </a>
            </div>
          </div>
          <div className="border-t border-primary-800 pt-8 text-center">
            <p>
              &copy; 2025 BANSAL CLASSES Alumni Association. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
