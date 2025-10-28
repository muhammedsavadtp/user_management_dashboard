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

      if (!trigger || !popover) return; // Ensure popover is also available

      const triggerRect = trigger.getBoundingClientRect();
      const popoverRect = popover.getBoundingClientRect(); // Get popover dimensions
      const popoverHeight = popoverRect.height;
      const popoverWidth = popoverRect.width;
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;

      const spaceBelow = viewportHeight - triggerRect.bottom;
      const spaceAbove = triggerRect.top;

      const shouldPlaceAbove = spaceBelow < popoverHeight && spaceAbove > spaceBelow;

      let newTop: number | undefined;
      let newBottom: number | undefined;
      let newLeft: number;
      let newPlacement: 'top' | 'bottom';

      // Calculate left position, ensuring it doesn't go off-screen horizontally
      newLeft = triggerRect.left;
      if (newLeft + popoverWidth > viewportWidth) {
        newLeft = viewportWidth - popoverWidth - 10; // 10px padding from right
      }
      if (newLeft < 10) {
        newLeft = 10; // 10px padding from left
      }


      if (shouldPlaceAbove) {
        newBottom = viewportHeight - triggerRect.top + 8;
        newPlacement = 'top';
        // Ensure it doesn't go off-screen above
        if (newBottom + popoverHeight > viewportHeight) {
          newBottom = viewportHeight - popoverHeight - 10; // Clamp to top with padding
        }
      } else {
        newTop = triggerRect.bottom + 8;
        newPlacement = 'bottom';
        // Ensure it doesn't go off-screen below
        if (newTop + popoverHeight > viewportHeight) {
          newTop = viewportHeight - popoverHeight - 10; // Clamp to bottom with padding
        }
      }

      setPosition({
        top: newTop,
        bottom: newBottom,
        left: newLeft,
        placement: newPlacement,
      });
    };

    // Calculate on mount and when scrolling/resizing
    calculatePosition();

    // Recalculate position on scroll and resize events
    window.addEventListener('scroll', calculatePosition);
    window.addEventListener('resize', calculatePosition);

    return () => {
      window.removeEventListener('scroll', calculatePosition);
      window.removeEventListener('resize', calculatePosition);
    };
  }, [isOpen, triggerRef, popoverRef]);

  return position;
}