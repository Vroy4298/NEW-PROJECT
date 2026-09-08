import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState('');
  const [cursorVariant, setCursorVariant] = useState<'default' | 'hover' | 'text'>('default');
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Detect touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const clickable = target.closest('[data-cursor]');
      if (clickable) {
        const text = clickable.getAttribute('data-cursor') || '';
        setCursorText(text);
        setCursorVariant('hover');
      } else {
        const interactive = target.closest('button, a, input, select, textarea');
        if (interactive) {
          setCursorText('');
          setCursorVariant('hover');
        } else {
          setCursorText('');
          setCursorVariant('default');
        }
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  if (isTouch || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Outer subtle follower */}
      <motion.div
        className="fixed top-0 left-0 flex items-center justify-center rounded-full pointer-events-none transition-transform"
        animate={{
          x: mousePosition.x - (cursorText ? 44 : cursorVariant === 'hover' ? 24 : 16),
          y: mousePosition.y - (cursorText ? 44 : cursorVariant === 'hover' ? 24 : 16),
          width: cursorText ? 88 : cursorVariant === 'hover' ? 48 : 32,
          height: cursorText ? 88 : cursorVariant === 'hover' ? 48 : 32,
          backgroundColor: cursorText ? 'rgba(200, 146, 85, 0.95)' : cursorVariant === 'hover' ? 'rgba(200, 146, 85, 0.25)' : 'transparent',
          borderColor: cursorText ? '#c89255' : 'rgba(244, 239, 232, 0.35)',
        }}
        transition={{
          type: 'spring',
          damping: 28,
          stiffness: 300,
          mass: 0.5,
        }}
        style={{
          borderWidth: cursorText ? '0px' : '1px',
          backdropFilter: cursorText ? 'blur(4px)' : 'none',
        }}
      >
        {cursorText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[11px] font-semibold tracking-widest text-[#0d0a08] uppercase select-none font-sans"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>

      {/* Tiny inner center dot */}
      {!cursorText && (
        <motion.div
          className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-[#c89255] pointer-events-none"
          animate={{
            x: mousePosition.x - 3,
            y: mousePosition.y - 3,
            scale: cursorVariant === 'hover' ? 0.5 : 1,
          }}
          transition={{
            type: 'spring',
            damping: 35,
            stiffness: 450,
          }}
        />
      )}
    </div>
  );
}
