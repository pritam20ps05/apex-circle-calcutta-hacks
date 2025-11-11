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

        {/* Date Display */}
        <div className="flex justify-center items-center mb-8">
          <div className="flex items-center space-x-4">
            <FaCalendarAlt className="text-2xl text-[#3E2C1D]" />
            <div className="font-serif text-lg font-bold text-[#3E2C1D] uppercase tracking-wide">
              {activeTab === 0 ? 'December 27, 2025' : 'December 28, 2025'}
            </div>
          </div>
        </div>

        {/* Day Selector Buttons */}
        <div className="flex justify-center mb-16">
          <div className="flex rounded-lg overflow-hidden shadow-md">
            {/* DAY 1 Button */}
            <button
              className={`px-12 py-3 font-serif font-bold text-base uppercase tracking-wide transition-all duration-300 rounded-l-lg ${
                activeTab === 0
                  ? 'bg-[#3E2C1D] text-[#F4E5C2]'
                  : 'bg-[#F4E5C2] text-[#3E2C1D] hover:bg-[#EBDBB9]'
              }`}
              onClick={() => {
                setActiveTab(0);
                setActiveEvent(null);
              }}
            >
              DAY 1
            </button>

            {/* DAY 2 Button */}
            <button
              className={`px-12 py-3 font-serif font-bold text-base uppercase tracking-wide transition-all duration-300 rounded-r-lg ${
                activeTab === 1
                  ? 'bg-[#3E2C1D] text-[#F4E5C2]'
                  : 'bg-[#F4E5C2] text-[#3E2C1D] hover:bg-[#EBDBB9]'
              }`}
              onClick={() => {
                setActiveTab(1);
                setActiveEvent(null);
              }}
            >
              DAY 2
            </button>
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
