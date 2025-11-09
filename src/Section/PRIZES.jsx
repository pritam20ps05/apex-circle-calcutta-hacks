import React from 'react';
import { Award, Sparkles, Trophy, Star, Gift } from 'lucide-react';
import { VintageCard } from './Tracks';
import SpotlightCard from '../components/ui/SpotlightCard';
import first from '../../src/assets/Icon/firstPlace.png';
import second from '../../src/assets/Icon/secondPlace.png';
import third from '../../src/assets/Icon/thirdPlace.png';

const PRIZES = () => {
  const prizes = [
    {
      place: '1st',
      amount: 'To be declared ...',
      perks: 'Trophy + Medals + Mentorship',
      icon: first,
    },
    {
      place: '2nd',
      amount: 'To be declared ...',
      perks: 'Trophy + Medals + Goodies',
      icon: second,
    },
    {
      place: '3rd',
      amount: 'To be declared ...',
      perks: 'Trophy + Medals + Goodies',
      icon: third,
    },
  ];

  return (
    <section id="prizes" className="py-20 bg-[#ebdbb9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-[6.7vw] lg:text-6xl font-bold text-[#3E2C1D] mb-4">
            PRIZES & PERKS
          </h2>
          <div className="w-32 h-1 text-[2vw] bg-[#D4AF37] mx-auto mb-6"></div>
          <p className="font-serif lg:text-xl text-[#6B4423]">
            Total Prize Pool: <span className="font-bold">To be declared ...</span>
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {prizes.map((prize, idx) => {
            return (
              <div
                key={idx}
                className="relative group transform transition-transform duration-500 hover:scale-105 py-[4.8vh]"
              >
                {idx === 0 && (
                  <div className="absolute top-18 -right-2 bg-[#D4AF37] text-[#3E2C1D] px-4 py-1 font-display font-bold text-sm transform rotate-45 shadow-md z-15">
                    GRAND PRIZE
                  </div>
                )}

                <VintageCard
                  className={`text-center relative overflow-hidden ${idx === 0 ? 'md:scale-110 border-[#D4AF37]' : ''}`}
                >
                  <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <circle cx="50" cy="50" r="40" stroke="#D4AF37" strokeWidth="2" fill="none" />
                      <circle cx="50" cy="50" r="30" stroke="#D4AF37" strokeWidth="2" fill="none" />
                      <circle cx="50" cy="50" r="20" stroke="#D4AF37" strokeWidth="2" fill="none" />
                    </svg>
                  </div>

                  <div className="relative z-10 flex flex-col items-center px-6 py-8">
                    <div className="relative w-32 h-32 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent transition-transform duration-1500 ease-in-out"></div>
                      <img
                        src={prize.icon}
                        alt={`${prize.place} Place`}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <div className="font-display text-[3.8vw] lg:text-3xl font-bold text-[#3E2C1D] mb-2 relative">
                      {prize.place}
                      <div className="absolute h-1 w-0 bg-[#D4AF37] left-1/2 -bottom-1 transform -translate-x-1/2 group-hover:w-16 transition-all duration-300"></div>
                    </div>

                    <div className="font-display text-[2.5vw] lg:text-2xl font-bold text-[#6B4423] mb-4">
                      {prize.amount}
                    </div>

                    <div className="font-serif text-[#6B4423] transition-all duration-300">
                      {prize.perks}
                    </div>
                  </div>
                </VintageCard>
              </div>
            );
          })}
        </div>

        {/* Additional Prizes Section - Enhanced */}
        <div className="relative mt-16">
          {/* Decorative Background Elements */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 left-0 w-32 h-32 border-4 border-[#D4AF37] rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 border-4 border-[#D4AF37] rounded-full blur-2xl"></div>
          </div>

          <VintageCard className="text-center relative overflow-hidden border-4 border-[#D4AF37]/30 bg-gradient-to-br from-[#F4E5C2] via-[#EBDBB9] to-[#F4E5C2]">
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none">
              <div
                className="w-full h-full animate-pulse"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D4AF37' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 60L60 0H30L0 30M60 60V30L30 60'/%3E%3C/g%3E%3C/svg%3E\")",
                }}
              ></div>
            </div>

            {/* Shimmer Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37]/10 to-transparent animate-shimmer pointer-events-none"></div>

            {/* Heritage Border Decoration */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-[#D4AF37] opacity-50">
              <div className="absolute -top-1 -left-1 w-3 h-3 bg-[#D4AF37] rounded-full"></div>
            </div>
            <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-[#D4AF37] opacity-50">
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#D4AF37] rounded-full"></div>
            </div>
            <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-[#D4AF37] opacity-50">
              <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-[#D4AF37] rounded-full"></div>
            </div>
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-[#D4AF37] opacity-50">
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#D4AF37] rounded-full"></div>
            </div>

            <div className="relative z-10 py-8 px-6">
              {/* Enhanced Header */}
              <div className="mb-8">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-[#D4AF37]/30 rounded-full blur-lg animate-pulse"></div>
                    <Award className="relative text-[#D4AF37] animate-bounce" size={40} />
                    <Sparkles className="absolute -top-1 -right-1 text-[#D4AF37] animate-pulse" size={16} />
                  </div>
                  <h3 className="font-display text-4xl md:text-5xl font-bold text-[#3E2C1D] relative">
                    <span className="relative z-10">Additional Prizes</span>
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"></div>
                  </h3>
                  <div className="relative">
                    <div className="absolute inset-0 bg-[#D4AF37]/30 rounded-full blur-lg animate-pulse"></div>
                    <Trophy className="relative text-[#D4AF37] animate-bounce" size={40} style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
                <p className="font-serif text-lg text-[#6B4423]/80 italic">
                  Exciting rewards await the winners!
                </p>
              </div>

              {/* Enhanced Prize Cards */}
              <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                {[1, 2, 3].map((index) => (
                  <div
                    key={index}
                    className="group relative transform transition-all duration-500 hover:scale-105"
                  >
                    {/* Card Glow Effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#D4AF37] via-[#F4E5C2] to-[#D4AF37] rounded-xl opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-500"></div>
                    
                    {/* Main Card */}
                    <div className="relative bg-gradient-to-br from-[#3E2C1D]/5 via-[#F4E5C2] to-[#EBDBB9] border-2 border-[#D4AF37]/40 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:border-[#D4AF37] overflow-hidden">
                      {/* Animated Background Pattern */}
                      <div className="absolute inset-0 opacity-5">
                        <div className="w-full h-full" style={{
                          backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(212, 175, 55, 0.1) 10px, rgba(212, 175, 55, 0.1) 20px)"
                        }}></div>
                      </div>

                      {/* Floating Particles Effect */}
                      <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className="absolute w-2 h-2 bg-[#D4AF37] rounded-full opacity-20 animate-float"
                            style={{
                              left: `${20 + i * 15}%`,
                              top: `${10 + i * 20}%`,
                              animationDelay: `${i * 0.3}s`,
                              animationDuration: `${3 + i * 0.5}s`,
                            }}
                          ></div>
                        ))}
                      </div>

                      {/* Content */}
                      <div className="relative z-10 flex flex-col items-center">
                        {/* Trophy Icon with Animation */}
                        <div className="relative mb-4">
                          <div className="absolute inset-0 bg-[#D4AF37]/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                          <div className="relative bg-gradient-to-br from-[#D4AF37] to-[#F4E5C2] p-4 rounded-full border-2 border-[#D4AF37] group-hover:rotate-12 transition-transform duration-500">
                            <Trophy 
                              className="text-[#3E2C1D] group-hover:scale-110 transition-transform duration-300" 
                              size={32} 
                            />
                          </div>
                          {/* Sparkle Effects */}
                          <Star className="absolute -top-1 -right-1 text-[#D4AF37] animate-ping" size={12} />
                          <Star className="absolute -bottom-1 -left-1 text-[#D4AF37] animate-pulse" size={10} style={{ animationDelay: '0.5s' }} />
                        </div>

                        {/* Prize Text */}
                        <div className="text-center">
                          <div className="font-display text-xl md:text-2xl font-bold text-[#3E2C1D] mb-2 group-hover:text-[#D4AF37] transition-colors duration-300">
                            Prize {index}
                          </div>
                          <div className="font-serif text-lg text-[#6B4423] font-semibold flex items-center justify-center gap-2">
                            <Gift className="text-[#D4AF37] animate-bounce" size={18} style={{ animationDelay: `${index * 0.2}s` }} />
                            <span className="relative">
                              To Be Declared
                              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D4AF37] scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                            </span>
                          </div>
                        </div>

                        {/* Decorative Bottom Accent */}
                        <div className="mt-4 w-16 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>

                      {/* Hover Shine Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Decorative Element */}
              <div className="mt-8 flex items-center justify-center gap-4">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#D4AF37]"></div>
                <Sparkles className="text-[#D4AF37] animate-pulse" size={20} />
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#D4AF37]"></div>
              </div>
            </div>
          </VintageCard>
        </div>
      </div>
    </section>
  );
};

export default PRIZES;
