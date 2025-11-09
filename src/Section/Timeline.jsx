import React, { useState, useEffect, useRef } from 'react';

import { FaCalendarAlt } from 'react-icons/fa';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TimelineEvent from '../components/TimelineEvent';
import { day1Events, day2Events } from '../Constant/TimeLine.constant';

gsap.registerPlugin(ScrollTrigger);

const Timeline = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [activeEvent, setActiveEvent] = useState(null);
  const timelineRef = useRef(null);

  const handleEventClick = index => {
    setActiveEvent(activeEvent === index ? null : index);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const timelineEvents = gsap.utils.toArray('.timeline-event');

      timelineEvents.forEach(event => {
        gsap.to(event, {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'circ.in',
          stagger: 0.05,
          scrollTrigger: {
            trigger: event,
            start: 'top bottom-=100',
            end: 'bottom center',
            toggleActions: 'play none none reverse',
            // markers: true,
          },
        });
      });
    }, timelineRef);

    return () => ctx.revert();
  }, [activeTab]);

  return (
    <div id="timeline" className="w-full min-h-screen py-20 bg-[#ebdbb9]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h1 className="font-display text-[5.5vw] lg:text-6xl font-bold text-[#3E2C1D] mb-4">Event Timeline</h1>
          <div className="w-32 h-1 bg-[#D4AF37] mx-auto mb-4"></div>
          <p className="font-serif text-xl text-[#6B4423] max-w-2xl mx-auto">
            Your guide to all activities during Calcutta &lt;Hacks/&gt;
          </p>
        </div>

        <div className="flex justify-center items-center mb-12">
          <div className="flex items-center space-x-4">
            <FaCalendarAlt className="text-2xl text-[#3E2C1D]" />
            <div className="font-serif text-lg font-bold text-[#3E2C1D]">
              {activeTab === 0 ? 'December 27, 2025' : 'December 28, 2025'}
            </div>
          </div>
        </div>

        <div className="flex justify-center mb-16">
          <div className="relative flex items-center gap-0 shadow-2xl">
            {/* Heritage Ornate Container */}
            <div className="relative">
              {/* 4-Corner Border Decoration - Top Left */}
              <div className="absolute -top-2 -left-2 w-8 h-8 border-t-4 border-l-4 border-[#3E2C1D] z-10"></div>
              {/* 4-Corner Border Decoration - Top Right */}
              <div className="absolute -top-2 -right-2 w-8 h-8 border-t-4 border-r-4 border-[#3E2C1D] z-10"></div>
              {/* 4-Corner Border Decoration - Bottom Left */}
              <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-4 border-l-4 border-[#3E2C1D] z-10"></div>
              {/* 4-Corner Border Decoration - Bottom Right */}
              <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-4 border-r-4 border-[#3E2C1D] z-10"></div>

              {/* Main Container with Aged Paper Effect - Rounded */}
              <div className="flex relative overflow-hidden rounded-xl">
                {/* Day 1 Button */}
                <button
                  className={`relative py-4 px-12 font-display font-bold text-lg uppercase tracking-wider transition-all duration-500 overflow-hidden rounded-l-xl
                    ${
                      activeTab === 0
                        ? 'bg-[#3E2C1D] text-[#D4AF37] shadow-2xl scale-105 z-20'
                        : 'bg-[#F4E5C2] text-[#3E2C1D] hover:bg-[#EBDBB9] z-10'
                    }`}
                  onClick={() => {
                    setActiveTab(0);
                    setActiveEvent(null);
                  }}
                  style={{
                    background: activeTab === 0 
                      ? 'linear-gradient(135deg, #3E2C1D 0%, #2A1F15 100%)'
                      : 'linear-gradient(135deg, #F4E5C2 0%, #EBDBB9 100%)',
                    textShadow: activeTab === 0 ? '0 0 10px rgba(212, 175, 55, 0.5)' : 'none',
                  }}
                >
                  {/* Aged Paper Texture Overlay */}
                  <div 
                    className={`absolute inset-0 opacity-30 ${
                      activeTab === 0 ? 'aged-paper' : ''
                    }`}
                    style={{
                      background: activeTab === 0
                        ? 'repeating-linear-gradient(90deg, rgba(212, 175, 55, 0.03) 0px, transparent 1px, transparent 2px)'
                        : 'repeating-linear-gradient(90deg, rgba(62, 44, 29, 0.02) 0px, transparent 1px, transparent 2px)'
                    }}
                  ></div>
                  
                  {/* Decorative Pattern - Left Side */}
                  <div className="absolute left-2 top-1/2 -translate-y-1/2 opacity-20">
                    <div className="w-1 h-8 bg-[#D4AF37]"></div>
                    <div className="w-1 h-8 bg-[#D4AF37] mt-1"></div>
                  </div>
                  
                  {/* Decorative Pattern - Right Side */}
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-20">
                    <div className="w-1 h-8 bg-[#D4AF37]"></div>
                    <div className="w-1 h-8 bg-[#D4AF37] mt-1"></div>
                  </div>

                  {/* Shine Effect on Active */}
                  {activeTab === 0 && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent animate-shimmer"></div>
                  )}

                  {/* Text */}
                  <span className="relative z-10">Day 1</span>
                  
                  {/* Gold Accent Line */}
                  {activeTab === 0 && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"></div>
                  )}
                </button>

                {/* Divider with Heritage Pattern */}
                <div className="relative w-px bg-[#3E2C1D] z-30">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-[#F4E5C2] border-2 border-[#3E2C1D] rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-[#D4AF37] rounded-full"></div>
                  </div>
                </div>

                {/* Day 2 Button */}
                <button
                  className={`relative py-4 px-12 font-display font-bold text-lg uppercase tracking-wider transition-all duration-500 overflow-hidden rounded-r-xl
                    ${
                      activeTab === 1
                        ? 'bg-[#3E2C1D] text-[#D4AF37] shadow-2xl scale-105 z-20'
                        : 'bg-[#F4E5C2] text-[#3E2C1D] hover:bg-[#EBDBB9] z-10'
                    }`}
                  onClick={() => {
                    setActiveTab(1);
                    setActiveEvent(null);
                  }}
                  style={{
                    background: activeTab === 1 
                      ? 'linear-gradient(135deg, #3E2C1D 0%, #2A1F15 100%)'
                      : 'linear-gradient(135deg, #F4E5C2 0%, #EBDBB9 100%)',
                    textShadow: activeTab === 1 ? '0 0 10px rgba(212, 175, 55, 0.5)' : 'none',
                  }}
                >
                  {/* Aged Paper Texture Overlay */}
                  <div 
                    className={`absolute inset-0 opacity-30 ${
                      activeTab === 1 ? 'aged-paper' : ''
                    }`}
                    style={{
                      background: activeTab === 1
                        ? 'repeating-linear-gradient(90deg, rgba(212, 175, 55, 0.03) 0px, transparent 1px, transparent 2px)'
                        : 'repeating-linear-gradient(90deg, rgba(62, 44, 29, 0.02) 0px, transparent 1px, transparent 2px)'
                    }}
                  ></div>
                  
                  {/* Decorative Pattern - Left Side */}
                  <div className="absolute left-2 top-1/2 -translate-y-1/2 opacity-20">
                    <div className="w-1 h-8 bg-[#D4AF37]"></div>
                    <div className="w-1 h-8 bg-[#D4AF37] mt-1"></div>
                  </div>
                  
                  {/* Decorative Pattern - Right Side */}
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-20">
                    <div className="w-1 h-8 bg-[#D4AF37]"></div>
                    <div className="w-1 h-8 bg-[#D4AF37] mt-1"></div>
                  </div>

                  {/* Shine Effect on Active */}
                  {activeTab === 1 && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent animate-shimmer"></div>
                  )}

                  {/* Text */}
                  <span className="relative z-10">Day 2</span>
                  
                  {/* Gold Accent Line */}
                  {activeTab === 1 && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"></div>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div ref={timelineRef} className="max-w-4xl mx-auto pl-4 relative">
          {activeTab === 0 &&
            day1Events.map((event, index) => (
              <TimelineEvent
                key={index}
                time={event.time}
                title={event.title}
                description={event.description}
                icon={event.icon}
                isActive={activeEvent === index}
                onClick={() => handleEventClick(index)}
                isLast={index === day1Events.length - 1}
                activeTab={activeTab}
              />
            ))}

          {activeTab === 1 &&
            day2Events.map((event, index) => (
              <TimelineEvent
                key={index}
                time={event.time}
                title={event.title}
                description={event.description}
                icon={event.icon}
                isActive={activeEvent === index}
                onClick={() => handleEventClick(index)}
                isLast={index === day2Events.length - 1}
                activeTab={activeTab}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
