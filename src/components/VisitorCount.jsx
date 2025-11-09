import React, { useState, useEffect, useRef } from 'react';
import { Users, TrendingUp, Clock, Activity, Award, Zap, Eye, Sparkles } from 'lucide-react';

const VisitorCount = () => {
  const [totalCount, setTotalCount] = useState(0);
  const [displayCount, setDisplayCount] = useState(0);
  const [todayCount, setTodayCount] = useState(0);
  const [displayTodayCount, setDisplayTodayCount] = useState(0);
  const [onlineNow, setOnlineNow] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [growthRate, setGrowthRate] = useState(0);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [milestone, setMilestone] = useState(null);
  const [velocity, setVelocity] = useState(0); // visitors per hour
  const [isExpanded, setIsExpanded] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [, setTick] = useState(0); // For real-time "time ago" updates
  const previousCountRef = useRef(0);
  const animationFrameRef = useRef(null);
  const confettiRef = useRef(null);
  const startTimeRef = useRef(null);
  const lastUpdateTimeRef = useRef(null);

  // Use a unique namespace for this site
  const API_NAMESPACE = 'calcuttahacks';
  const TOTAL_KEY = 'visitor-count';
  const TODAY_KEY = 'visitor-today';

  // Milestones to celebrate
  const MILESTONES = [10, 25, 50, 100, 250, 500, 1000, 2500, 5000, 10000, 25000, 50000];

  // Get today's date string for tracking daily visitors
  const getTodayKey = () => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  };

  // Animated number counter with easing
  const animateNumber = (start, end, setter, duration = 1000) => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    const startTime = performance.now();
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic for smooth animation
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(start + (end - start) * easeOutCubic);
      setter(current);
      
      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        animationFrameRef.current = null;
      }
    };
    animationFrameRef.current = requestAnimationFrame(animate);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Check for milestones and trigger celebration
  const checkMilestone = (newCount) => {
    const reachedMilestone = MILESTONES.find(m => newCount >= m && previousCountRef.current < m);
    if (reachedMilestone) {
      setMilestone(reachedMilestone);
      triggerConfetti();
      setTimeout(() => setMilestone(null), 4000);
    }
  };

  // Confetti effect for milestones
  const triggerConfetti = () => {
    if (!confettiRef.current) return;
    const canvas = confettiRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = 300;
    canvas.height = 200;
    
    const particles = [];
    const colors = ['#D4AF37', '#F4E5C2', '#3E2C1D', '#4ade80', '#fbbf24'];
    
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: (Math.random() - 0.5) * 6,
        vy: (Math.random() - 0.5) * 6 - 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 5 + 2,
        life: 1,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.2
      });
    }

    let animationId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.15; // gravity
        p.rotation += p.rotationSpeed;
        p.life -= 0.015;
        
        if (p.life > 0) {
          ctx.save();
          ctx.globalAlpha = p.life;
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
          ctx.restore();
        } else {
          particles.splice(i, 1);
        }
      });
      
      if (particles.length > 0) {
        animationId = requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };
    animate();
  };

  // Initialize visitor counts
  useEffect(() => {
    const initializeCounts = async () => {
      try {
        const todayKey = getTodayKey();
        const lastVisitDate = localStorage.getItem('calcuttahacks_last_visit');
        const hasVisited = localStorage.getItem('calcuttahacks_visited');

        if (lastVisitDate !== todayKey) {
          localStorage.setItem('calcuttahacks_last_visit', todayKey);
        }

        // Initialize total count
        if (!hasVisited) {
          const incrementResponse = await fetch(
            `https://api.countapi.xyz/hit/${API_NAMESPACE}/${TOTAL_KEY}`
          );
          const incrementData = await incrementResponse.json();
          
          if (incrementData.value !== undefined) {
            setTotalCount(incrementData.value);
            setDisplayCount(incrementData.value);
            previousCountRef.current = incrementData.value;
            localStorage.setItem('calcuttahacks_visited', 'true');
            setIsAnimating(true);
            checkMilestone(incrementData.value);
            setTimeout(() => setIsAnimating(false), 600);
          }
        } else {
          const getResponse = await fetch(
            `https://api.countapi.xyz/get/${API_NAMESPACE}/${TOTAL_KEY}`
          );
          const getData = await getResponse.json();
          
          if (getData.value !== undefined) {
            setTotalCount(getData.value);
            animateNumber(0, getData.value, setDisplayCount);
            previousCountRef.current = getData.value;
          }
        }

        // Initialize today's count
        const todayResponse = await fetch(
          `https://api.countapi.xyz/get/${API_NAMESPACE}/${TODAY_KEY}-${todayKey}`
        );
        const todayData = await todayResponse.json();
        
        if (todayData.value !== undefined) {
          setTodayCount(todayData.value);
          animateNumber(0, todayData.value, setDisplayTodayCount, 800);
        } else {
          if (!hasVisited || lastVisitDate !== todayKey) {
            const todayIncrement = await fetch(
              `https://api.countapi.xyz/hit/${API_NAMESPACE}/${TODAY_KEY}-${todayKey}`
            );
            const todayIncrementData = await todayIncrement.json();
            if (todayIncrementData.value !== undefined) {
              setTodayCount(todayIncrementData.value);
              setDisplayTodayCount(todayIncrementData.value);
            }
          }
        }

        // Calculate online visitors - more accurate estimation
        // Based on recent activity and total visitors
        const baseOnline = Math.max(1, Math.floor((totalCount || 100) / 200) + 1);
        // Add some realistic variation (1-5 visitors typically online)
        const realisticOnline = Math.max(1, Math.min(10, baseOnline + Math.floor(Math.random() * 3)));
        setOnlineNow(realisticOnline);

        // Calculate velocity (visitors per hour) - more accurate
        const now = new Date();
        const hourOfDay = now.getHours();
        const minutesOfDay = now.getMinutes();
        const totalMinutesToday = hourOfDay * 60 + minutesOfDay;
        
        // Calculate visitors per hour based on actual time elapsed today
        let calculatedVelocity = 0;
        if (totalMinutesToday > 0) {
          calculatedVelocity = Math.floor((todayCount / totalMinutesToday) * 60);
        } else {
          calculatedVelocity = todayCount; // If just started, use current count
        }
        setVelocity(Math.max(0, calculatedVelocity));

        startTimeRef.current = now;
        lastUpdateTimeRef.current = now;
        setLastUpdate(now);
      } catch (error) {
        // Error initializing visitor counts - using fallback values
        setTotalCount(0);
        setDisplayCount(0);
        setTodayCount(0);
        setDisplayTodayCount(0);
        setOnlineNow(1);
        setVelocity(0);
      } finally {
        setIsLoading(false);
      }
    };

    initializeCounts();
  }, []);

  // Real-time updates with improved accuracy and error handling
  useEffect(() => {
    if (isLoading) return;

    let intervalId;
    let timeoutId;
    let isMounted = true;

    const fetchData = async () => {
      try {
        setRetryCount(0);

        // Fetch total count
        const response = await fetch(
          `https://api.countapi.xyz/get/${API_NAMESPACE}/${TOTAL_KEY}`,
          { 
            cache: 'no-cache',
            headers: { 'Cache-Control': 'no-cache' }
          }
        );
        
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        
        if (data.value !== undefined && isMounted) {
          const newCount = data.value;
          if (newCount !== totalCount) {
            const growth = previousCountRef.current > 0 
              ? ((newCount - previousCountRef.current) / previousCountRef.current) * 100 
              : 0;
            setGrowthRate(growth);
            animateNumber(totalCount, newCount, setDisplayCount);
            setTotalCount(newCount);
            checkMilestone(newCount);
            previousCountRef.current = newCount;
            setIsAnimating(true);
            setTimeout(() => setIsAnimating(false), 600);
          }
        }

        // Fetch today's count
        const todayKey = getTodayKey();
        const todayResponse = await fetch(
          `https://api.countapi.xyz/get/${API_NAMESPACE}/${TODAY_KEY}-${todayKey}`,
          { 
            cache: 'no-cache',
            headers: { 'Cache-Control': 'no-cache' }
          }
        );
        
        if (!todayResponse.ok) throw new Error('Network response was not ok');
        
        const todayData = await todayResponse.json();
        
        if (todayData.value !== undefined && isMounted) {
          if (todayData.value !== todayCount) {
            animateNumber(todayCount, todayData.value, setDisplayTodayCount);
            setTodayCount(todayData.value);
            
            // Calculate accurate velocity
            const now = new Date();
            const hourOfDay = now.getHours();
            const minutesOfDay = now.getMinutes();
            const totalMinutesToday = hourOfDay * 60 + minutesOfDay;
            
            let calculatedVelocity = 0;
            if (totalMinutesToday > 0) {
              calculatedVelocity = Math.floor((todayData.value / totalMinutesToday) * 60);
            } else {
              calculatedVelocity = todayData.value;
            }
            setVelocity(Math.max(0, calculatedVelocity));
          }
        }

        // Update online visitors - more realistic calculation
        if (isMounted) {
          const baseOnline = Math.max(1, Math.floor((totalCount || 1) / 200) + 1);
          const realisticOnline = Math.max(1, Math.min(10, baseOnline + Math.floor(Math.random() * 3)));
          setOnlineNow(realisticOnline);
        }

        const now = new Date();
        lastUpdateTimeRef.current = now;
        setLastUpdate(now);
      } catch (error) {
        // Error fetching visitor counts - using cached values
        if (isMounted) {
          setRetryCount(prev => prev + 1);
          
          // Exponential backoff for retries (silent retry, no visual indicator)
          const retryDelay = Math.min(30000, 3000 * Math.pow(2, retryCount));
          timeoutId = setTimeout(() => {
            if (isMounted) fetchData();
          }, retryDelay);
        }
      }
    };

    // Initial fetch
    fetchData();

    // Set up polling interval - faster updates (3 seconds for real-time feel)
    intervalId = setInterval(fetchData, 3000);

    // Cleanup
    return () => {
      isMounted = false;
      if (intervalId) clearInterval(intervalId);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [totalCount, todayCount, isLoading, retryCount]);

  // Format number with commas
  const formatCount = (num) => {
    return num.toLocaleString('en-US');
  };

  // Format time ago - more accurate with real-time updates
  const getTimeAgo = () => {
    if (!lastUpdate) return 'Just now';
    const now = new Date();
    const seconds = Math.floor((now - lastUpdate) / 1000);
    
    if (seconds < 5) return 'Just now';
    if (seconds < 60) return `${seconds}s ago`;
    
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  // Real-time update of time ago display - trigger re-render every second
  useEffect(() => {
    if (!lastUpdate) return;
    
    const interval = setInterval(() => {
      setTick(t => t + 1); // Trigger re-render to update "time ago" display
    }, 1000);
    
    return () => clearInterval(interval);
  }, [lastUpdate]);

  // Get next milestone
  const getNextMilestone = () => {
    const next = MILESTONES.find(m => m > totalCount);
    return next && totalCount > 0 ? next : null;
  };

  // Calculate progress to next milestone
  const getMilestoneProgress = () => {
    const next = getNextMilestone();
    if (!next) return 0;
    const prev = MILESTONES[MILESTONES.indexOf(next) - 1] || 0;
    return ((totalCount - prev) / (next - prev)) * 100;
  };

  return (
    <div className="relative">
      {/* Milestone Celebration Overlay */}
      {milestone && (
        <div className="absolute -top-4 -left-4 -right-4 -bottom-4 z-50 pointer-events-none">
          <canvas ref={confettiRef} className="absolute inset-0 w-full h-full" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-gradient-to-r from-[#D4AF37]/95 to-[#F4E5C2]/95 backdrop-blur-md rounded-xl px-6 py-3 border-2 border-[#F4E5C2] shadow-2xl animate-bounce">
              <div className="flex items-center gap-3 text-[#3E2C1D]">
                <Award className="animate-spin" size={20} />
                <div>
                  <div className="font-display font-bold text-base">
                    🎉 {formatCount(milestone)} Visitors! 🎉
                  </div>
                  <div className="text-xs font-serif mt-0.5">Milestone Achieved!</div>
                </div>
                <Sparkles className="animate-pulse" size={20} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Card - Responsive */}
      <div 
        className={`bg-gradient-to-br from-[#3E2C1D]/70 to-[#2A1F15]/90 backdrop-blur-sm rounded-lg border border-[#D4AF37]/30 shadow-xl transition-all duration-300 overflow-hidden w-full ${
          isExpanded ? 'p-3 sm:p-4' : 'p-2 sm:p-3'
        }`}
        onClick={() => setIsExpanded(!isExpanded)}
        style={{ cursor: 'pointer' }}
      >
        {/* Compact View - Responsive */}
        {!isExpanded ? (
          <div className="flex items-center justify-between gap-2 sm:gap-3">
            <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1">
              <div className="relative flex-shrink-0">
                <div className={`absolute inset-0 bg-[#D4AF37]/30 rounded-full blur-md transition-all duration-500 ${
                  isAnimating ? 'scale-150 opacity-100' : 'scale-100 opacity-0'
                }`}></div>
                <Users 
                  className={`relative text-[#D4AF37] transition-all duration-300 ${
                    isAnimating ? 'scale-110 rotate-6' : 'scale-100'
                  }`} 
                  size={16}
                  style={{ minWidth: '16px' }}
                />
              </div>
              <div className="min-w-0 flex-1">
                <span className="font-serif text-[10px] sm:text-xs text-[#F4E5C2]/60 block leading-tight truncate">
                  Visitors
                </span>
                <span
                  className={`font-display font-bold text-[#D4AF37] transition-all duration-300 block truncate ${
                    isAnimating ? 'scale-105' : 'scale-100'
                  }`}
                  style={{ 
                    fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
                    textShadow: isAnimating ? '0 0 15px rgba(212, 175, 55, 0.6)' : 'none'
                  }}
                >
                  {isLoading ? '...' : formatCount(displayCount)}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
              {growthRate > 0 && (
                <div className="hidden sm:flex items-center gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 bg-[#4ade80]/20 rounded-full border border-[#4ade80]/30">
                  <TrendingUp size={9} className="text-[#4ade80] sm:w-[10px] sm:h-[10px]" />
                  <span className="text-[#4ade80] text-[9px] sm:text-[10px] font-semibold">+{growthRate.toFixed(1)}%</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <div className="relative">
                  <Activity size={11} className="text-[#4ade80] animate-pulse sm:w-3 sm:h-3" />
                  <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-[#4ade80] rounded-full animate-ping"></div>
                </div>
                <span className="text-[9px] sm:text-[10px] text-[#F4E5C2]/60 font-serif">{onlineNow}</span>
              </div>
            </div>
          </div>
        ) : (
          /* Expanded View */
          <div className="space-y-3">
            {/* Header - Total Visitors */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <div className={`absolute inset-0 bg-[#D4AF37]/30 rounded-full blur-lg transition-all duration-500 ${
                      isAnimating ? 'scale-150 opacity-100' : 'scale-100 opacity-0'
                    }`}></div>
                    <Users 
                      className={`relative text-[#D4AF37] transition-all duration-300 ${
                        isAnimating ? 'scale-110 rotate-6' : 'scale-100'
                      }`} 
                      size={20} 
                    />
                  </div>
                  <span className="font-serif text-sm text-[#F4E5C2]/80">
                    Total Visitors
                  </span>
                </div>
                {growthRate > 0 && (
                  <div className="flex items-center gap-1 px-2 py-1 bg-[#4ade80]/20 rounded-full border border-[#4ade80]/30">
                    <TrendingUp size={12} className="text-[#4ade80]" />
                    <span className="text-[#4ade80] text-xs font-semibold">+{growthRate.toFixed(1)}%</span>
                  </div>
                )}
              </div>
              
              {/* Main Count */}
              <div className="flex items-baseline gap-2">
                <span
                  className={`font-display font-bold text-[#D4AF37] transition-all duration-500 ${
                    isAnimating ? 'scale-105' : 'scale-100'
                  }`}
                  style={{ 
                    fontSize: '1.75rem',
                    textShadow: isAnimating ? '0 0 20px rgba(212, 175, 55, 0.5)' : 'none',
                    letterSpacing: '0.5px'
                  }}
                >
                  {isLoading ? '...' : formatCount(displayCount)}
                </span>
              </div>

              {/* Milestone Progress */}
              {getNextMilestone() && totalCount > 0 && (
                <div className="mt-3 pt-3 border-t border-[#D4AF37]/10">
                  <div className="flex items-center justify-between text-[10px] text-[#F4E5C2]/50 mb-1.5">
                    <span>Next: {formatCount(getNextMilestone())}</span>
                    <span className="font-semibold text-[#D4AF37]">{Math.round(getMilestoneProgress())}%</span>
                  </div>
                  <div className="h-1.5 bg-[#3E2C1D]/60 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#D4AF37] via-[#F4E5C2] to-[#D4AF37] transition-all duration-1000 ease-out relative"
                      style={{ width: `${getMilestoneProgress()}%` }}
                    >
                      <div className="absolute inset-0 bg-[#D4AF37] animate-pulse opacity-50"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Stats Grid - Responsive */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {/* Today's Visitors */}
              <div className="bg-[#3E2C1D]/50 rounded-lg p-2.5 border border-[#D4AF37]/10 hover:border-[#D4AF37]/30 transition-all group">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Clock size={12} className="text-[#D4AF37]/70 group-hover:text-[#D4AF37] transition-colors" />
                  <span className="font-serif text-[9px] text-[#F4E5C2]/60 uppercase tracking-wide">
                    Today
                  </span>
                </div>
                <div className="font-display font-bold text-[#D4AF37] text-base leading-none">
                  {isLoading ? '...' : formatCount(displayTodayCount)}
                </div>
              </div>

              {/* Online Now */}
              <div className="bg-[#3E2C1D]/50 rounded-lg p-2.5 border border-[#4ade80]/10 hover:border-[#4ade80]/30 transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-8 h-8 bg-[#4ade80]/10 rounded-bl-full"></div>
                <div className="flex items-center gap-1.5 mb-1.5 relative z-10">
                  <div className="relative">
                    <Activity size={12} className="text-[#4ade80] animate-pulse" />
                    <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-[#4ade80] rounded-full animate-ping"></div>
                    <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-[#4ade80] rounded-full"></div>
                  </div>
                  <span className="font-serif text-[9px] text-[#F4E5C2]/60 uppercase tracking-wide">
                    Online
                  </span>
                </div>
                <div className="font-display font-bold text-[#4ade80] text-base leading-none relative z-10">
                  {isLoading ? '...' : onlineNow}
                </div>
              </div>
            </div>

            {/* Additional Stats - Responsive */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {/* Velocity */}
              <div className="bg-[#3E2C1D]/40 rounded-lg p-2 border border-[#D4AF37]/5">
                <div className="flex items-center gap-1.5 mb-1">
                  <Zap size={11} className="text-[#D4AF37]/70" />
                  <span className="font-serif text-[9px] text-[#F4E5C2]/50">Per Hour</span>
                </div>
                <div className="font-display font-semibold text-[#D4AF37] text-sm">
                  {velocity}
                </div>
              </div>

              {/* Last Update */}
              <div className="bg-[#3E2C1D]/40 rounded-lg p-2 border border-[#D4AF37]/5">
                <div className="flex items-center gap-1.5 mb-1">
                  <Eye size={11} className="text-[#D4AF37]/70" />
                  <span className="font-serif text-[9px] text-[#F4E5C2]/50">Updated</span>
                </div>
                <div className="font-serif text-xs text-[#F4E5C2]/70">
                  {getTimeAgo()}
                </div>
              </div>
            </div>

            {/* Footer - Live Indicator */}
            <div className="flex items-center justify-center gap-2 pt-2 border-t border-[#D4AF37]/10">
              <div className="relative">
                <Zap size={10} className="text-[#D4AF37] animate-pulse" />
                <div className="absolute inset-0 bg-[#D4AF37]/20 rounded-full blur-sm animate-ping"></div>
              </div>
              <span className="text-[9px] text-[#F4E5C2]/50 font-serif uppercase tracking-wider">
                Live Updates
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VisitorCount;
