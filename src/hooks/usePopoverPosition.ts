import { useState, useEffect } from 'react';
import type { PopoverPosition } from '../components/shared/statusDropdown/types';

const ARROW_SIZE = 8;
const ARROW_OFFSET = 12; // Minimum distance from popover edge
const GAP = 8; // Gap between trigger and popover
const VIEWPORT_PADDING = 10;

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

      if (!trigger || !popover) return;

      const triggerRect = trigger.getBoundingClientRect();
      const popoverRect = popover.getBoundingClientRect();
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
      let arrowLeft: number | undefined;

      // Calculate left position, ensuring it doesn't go off-screen horizontally
      newLeft = triggerRect.left;
      if (newLeft + popoverWidth > viewportWidth) {
        newLeft = viewportWidth - popoverWidth - VIEWPORT_PADDING;
      }
      if (newLeft < VIEWPORT_PADDING) {
        newLeft = VIEWPORT_PADDING;
      }

      // Calculate arrow position (horizontally centered on trigger)
      const triggerCenter = triggerRect.left + triggerRect.width / 2;
      arrowLeft = triggerCenter - newLeft;

      // Constrain arrow within popover bounds
      arrowLeft = Math.max(
        ARROW_OFFSET,
        Math.min(arrowLeft, popoverWidth - ARROW_OFFSET)
      );

      if (shouldPlaceAbove) {
        newBottom = viewportHeight - triggerRect.top + GAP;
        newPlacement = 'top';
        // Ensure it doesn't go off-screen above
        if (newBottom + popoverHeight > viewportHeight) {
          newBottom = viewportHeight - popoverHeight - VIEWPORT_PADDING;
        }
      } else {
        newTop = triggerRect.bottom + GAP;
        newPlacement = 'bottom';
        // Ensure it doesn't go off-screen below
        if (newTop + popoverHeight > viewportHeight) {
          newTop = viewportHeight - popoverHeight - VIEWPORT_PADDING;
        }
      }

      setPosition({
        top: newTop,
        bottom: newBottom,
        left: newLeft,
        placement: newPlacement,
        arrowLeft,
      });
    };

    // Calculate on mount and when scrolling/resizing
    calculatePosition();

    // Recalculate position on scroll and resize events
    window.addEventListener('scroll', calculatePosition, true); // Use capture phase
    window.addEventListener('resize', calculatePosition);

    return () => {
      window.removeEventListener('scroll', calculatePosition, true);
      window.removeEventListener('resize', calculatePosition);
    };
  }, [isOpen, triggerRef, popoverRef]);

  return position;
}