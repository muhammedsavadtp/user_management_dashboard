import { useState, useEffect } from 'react';
import type { PopoverPosition } from '../components/shared/statusDropdown/types';

export function usePopoverPosition(
  triggerRef: React.RefObject<HTMLElement>,
  popoverRef: React.RefObject<HTMLElement>,
  isOpen: boolean
): PopoverPosition {
  const [position, setPosition] = useState<PopoverPosition>({
    placement: 'bottom',
  });

  useEffect(() => {
    if (!isOpen || !triggerRef.current) return;

    const calculatePosition = () => {
      const trigger = triggerRef.current;
      const popover = popoverRef.current;

      if (!trigger) return;

      const triggerRect = trigger.getBoundingClientRect();
      const popoverHeight = popover?.offsetHeight || 300; // Default height estimate
      const viewportHeight = window.innerHeight;
      const scrollY = window.scrollY;
      const scrollX = window.scrollX;

      const spaceBelow = viewportHeight - triggerRect.bottom;
      const spaceAbove = triggerRect.top;

      const shouldPlaceAbove = spaceBelow < popoverHeight && spaceAbove > spaceBelow;

      const left = triggerRect.left + scrollX;

      if (shouldPlaceAbove) {
        // Place above trigger
        setPosition({
          bottom: viewportHeight - triggerRect.top - scrollY + 8,
          left,
          placement: 'top',
        });
      } else {
        // Place below trigger (default)
        setPosition({
          top: triggerRect.bottom + scrollY + 8,
          left,
          placement: 'bottom',
        });
      }
    };

    // Calculate on mount and when scrolling/resizing
    calculatePosition();

    window.addEventListener('scroll', calculatePosition);
    window.addEventListener('resize', calculatePosition);

    return () => {
      window.removeEventListener('scroll', calculatePosition);
      window.removeEventListener('resize', calculatePosition);
    };
  }, [isOpen, triggerRef, popoverRef]);

  return position;
}