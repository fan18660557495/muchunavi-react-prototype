import { useEffect, useRef, useState } from 'react';

function MU_HSlider({ items = [], renderItem, itemWidth = 110, gap = 12, padX = 20, autoPlay = false, autoPlayInterval = 2600, showDots = true }) {
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    const node = trackRef.current;
    if (!node) return;
    const step = itemWidth + gap;
    const nextIndex = Math.round(node.scrollLeft / step);
    setActiveIndex(Math.max(0, Math.min(items.length - 1, nextIndex)));
  };

  const scrollToIndex = (index) => {
    const node = trackRef.current;
    if (!node) return;
    const step = itemWidth + gap;
    node.scrollTo({ left: index * step, behavior: 'smooth' });
    setActiveIndex(index);
  };

  useEffect(() => {
    if (!autoPlay || items.length <= 1) return undefined;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => {
        const next = (current + 1) % items.length;
        const node = trackRef.current;
        if (node) {
          const step = itemWidth + gap;
          node.scrollTo({ left: next * step, behavior: 'smooth' });
        }
        return next;
      });
    }, autoPlayInterval);

    return () => window.clearInterval(timer);
  }, [autoPlay, autoPlayInterval, gap, itemWidth, items.length]);

  return (
    <div>
      <div style={{ margin: `0 ${padX}px` }}>
        <div
          ref={trackRef}
          className="mu-hide-scrollbar"
          onScroll={handleScroll}
          style={{
            overflowX: 'auto',
            overflowY: 'hidden',
            display: 'flex',
            gap,
            padding: '0 0 16px',
            WebkitOverflowScrolling: 'touch',
            scrollSnapType: 'x mandatory',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              style={{
                width: itemWidth,
                flexShrink: 0,
                scrollSnapAlign: 'start',
              }}
            >
              {renderItem(item, index)}
            </div>
          ))}
        </div>
      </div>

      {showDots ? (
        <div style={{ display: 'flex', justifyContent: 'center', gap: 6, paddingBottom: 4 }}>
          {items.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => scrollToIndex(index)}
              aria-label={`slide-${index + 1}`}
              style={{
                width: index === activeIndex ? 18 : 6,
                height: 6,
                borderRadius: 999,
                border: 'none',
                padding: 0,
                background: index === activeIndex ? '#A49673' : 'rgba(164, 150, 115, 0.28)',
                transition: 'all 180ms ease',
              }}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

window.MU_HSlider = MU_HSlider;
