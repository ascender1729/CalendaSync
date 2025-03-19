import React from 'react';
import { TestimonialCard } from './TestimonialCard';
import type { Testimonial } from '../../data/testimonials';

interface InfiniteCarouselProps {
  items: Testimonial[];
  direction?: 'left' | 'right';
  speed?: number;
}

export function InfiniteCarousel({ items, direction = 'left', speed = 25 }: InfiniteCarouselProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [duplicatedItems] = React.useState([...items, ...items]);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scrollWidth = container.scrollWidth;
    const viewWidth = container.offsetWidth;
    
    if (direction === 'left') {
      container.scrollLeft = 0;
    } else {
      container.scrollLeft = scrollWidth / 2;
    }

    const scroll = () => {
      if (direction === 'left') {
        if (container.scrollLeft >= scrollWidth / 2) {
          container.scrollLeft = 0;
        } else {
          container.scrollLeft += 1;
        }
      } else {
        if (container.scrollLeft <= 0) {
          container.scrollLeft = scrollWidth / 2;
        } else {
          container.scrollLeft -= 1;
        }
      }
    };

    const animation = setInterval(scroll, speed);
    return () => clearInterval(animation);
  }, [direction, speed, duplicatedItems]);

  return (
    <div
      ref={containerRef}
      className="flex overflow-hidden"
      style={{
        maskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)',
      }}
    >
      <div className="flex">
        {duplicatedItems.map((item, index) => (
          <TestimonialCard key={`${item.id}-${index}`} {...item} direction={direction} />
        ))}
      </div>
    </div>
  );
}