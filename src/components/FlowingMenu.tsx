import React from 'react';
import { gsap } from 'gsap';
import { useTheme } from '../contexts/ThemeContext';

export interface FlowingMenuItem {
  link?: string;
  text: string;
  image: string;
}

interface FlowingMenuProps {
  items?: FlowingMenuItem[];
  onCategorySelect?: (category: string) => void;
}

function FlowingMenu({ items = [], onCategorySelect }: FlowingMenuProps) {
  const { theme } = useTheme();
  return (
    <div className="w-full h-full overflow-hidden">
      <nav className="flex flex-col h-full m-0 p-0">
        {items.map((item, idx) => (
          <MenuItem key={idx} {...item} onClick={() => onCategorySelect?.(item.text)} theme={theme} />
        ))}
      </nav>
    </div>
  );
}

function MenuItem({ text, image, onClick, theme }: FlowingMenuItem & { onClick?: () => void; theme: 'light' | 'dark' }) {
  const itemRef = React.useRef<HTMLDivElement>(null);
  const marqueeRef = React.useRef<HTMLDivElement>(null);
  const marqueeInnerRef = React.useRef<HTMLDivElement>(null);

  const animationDefaults = { duration: 0.6, ease: 'expo' };

  const findClosestEdge = (mouseX: number, mouseY: number, width: number, height: number) => {
    const topEdgeDist = (mouseX - width / 2) ** 2 + mouseY ** 2;
    const bottomEdgeDist = (mouseX - width / 2) ** 2 + (mouseY - height) ** 2;
    return topEdgeDist < bottomEdgeDist ? 'top' : 'bottom';
  };

  const handleMouseEnter = (ev: React.MouseEvent) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(
      ev.clientX - rect.left,
      ev.clientY - rect.top,
      rect.width,
      rect.height
    );

    gsap.timeline({ defaults: animationDefaults })
      .set(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' })
      .set(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' })
      .to([marqueeRef.current, marqueeInnerRef.current], { y: '0%' });
  };

  const handleMouseLeave = (ev: React.MouseEvent) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(
      ev.clientX - rect.left,
      ev.clientY - rect.top,
      rect.width,
      rect.height
    );

    gsap.timeline({ defaults: animationDefaults })
      .to(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' })
      .to(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' });
  };

  const textColor = theme === 'dark' ? 'text-white' : 'text-[#060010]';
  const hoverTextColor = theme === 'dark' ? 'hover:text-emerald-400' : 'hover:text-emerald-700';
  const marqueeBg = theme === 'dark' ? 'bg-gray-900' : 'bg-white';

  const repeatedMarqueeContent = Array.from({ length: 4 }).map((_, idx) => (
    <React.Fragment key={idx}>
      <span className={`${textColor} uppercase font-normal text-[4vh] leading-[1.2] p-[1vh_1vw_0]`}>
        {text}
      </span>
      <div
        className="w-[200px] h-[7vh] my-[2em] mx-[2vw] p-[1em_0] rounded-[50px] bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      />
    </React.Fragment>
  ));

  return (
    <div>
      <div className="flex-1 relative overflow-hidden text-center shadow-[0_-1px_0_0_#fff]" ref={itemRef}>
        <a
          className={`flex items-center justify-center h-full relative cursor-pointer uppercase no-underline font-semibold text-[4vh] focus:outline-none ${textColor} ${hoverTextColor}`}
          onClick={onClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          tabIndex={0}
          role="button"
        >
          {text}
        </a>
        <div
          className={`absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none translate-y-[101%] ${marqueeBg}`}
          ref={marqueeRef}
        >
          <div className="h-full w-[200%] flex" ref={marqueeInnerRef}>
            <div className="flex items-center relative h-full w-[200%] will-change-transform animate-marquee">
              {repeatedMarqueeContent}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlowingMenu; 