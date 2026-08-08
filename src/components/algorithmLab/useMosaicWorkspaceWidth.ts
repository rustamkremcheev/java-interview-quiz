import { useCallback, useEffect, useRef, useState, type MouseEvent, type PointerEvent } from 'react';

const STORAGE_KEY = 'interview-prep:alg-mosaic-workspace-width';
const DESKTOP_MQ = '(min-width: 1025px)';
export const MOSAIC_DEFAULT_WIDTH = 1100;
export const MOSAIC_MIN_WIDTH = 850;
const SAFE_RIGHT_MARGIN = 16;

function readStoredWidth(): number | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw == null) return null;
    const value = Number(raw);
    return Number.isFinite(value) && value > 0 ? value : null;
  } catch {
    return null;
  }
}

function persistWidth(width: number): void {
  try {
    localStorage.setItem(STORAGE_KEY, String(Math.round(width)));
  } catch {
    // Quota / private mode — ignore
  }
}

function clampWidth(width: number, maxWidth: number): number {
  return Math.round(Math.min(Math.max(width, MOSAIC_MIN_WIDTH), Math.max(MOSAIC_MIN_WIDTH, maxWidth)));
}

export function useMosaicWorkspaceWidth(enabled: boolean) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef<{ startX: number; startWidth: number } | null>(null);
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(DESKTOP_MQ).matches : false
  );
  const [width, setWidth] = useState(() => readStoredWidth() ?? MOSAIC_DEFAULT_WIDTH);
  const [isResizing, setIsResizing] = useState(false);

  const measureMaxWidth = useCallback((): number => {
    const el = containerRef.current;
    if (!el) {
      return typeof window !== 'undefined' ? window.innerWidth - SAFE_RIGHT_MARGIN : MOSAIC_DEFAULT_WIDTH;
    }
    const left = el.getBoundingClientRect().left;
    return Math.floor(window.innerWidth - left - SAFE_RIGHT_MARGIN);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_MQ);
    const sync = () => setIsDesktop(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (!enabled || !isDesktop) return;

    const clampToViewport = () => {
      const maxWidth = measureMaxWidth();
      setWidth((prev) => clampWidth(prev, maxWidth));
    };

    clampToViewport();
    window.addEventListener('resize', clampToViewport);
    return () => window.removeEventListener('resize', clampToViewport);
  }, [enabled, isDesktop, measureMaxWidth]);

  const onHandlePointerDown = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (!enabled || !isDesktop) return;
      event.preventDefault();
      event.stopPropagation();
      const el = containerRef.current;
      if (!el) return;
      const currentWidth = el.getBoundingClientRect().width;
      dragRef.current = { startX: event.clientX, startWidth: currentWidth };
      setIsResizing(true);
      event.currentTarget.setPointerCapture(event.pointerId);
    },
    [enabled, isDesktop]
  );

  const onHandlePointerMove = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      const drag = dragRef.current;
      if (!drag) return;
      event.preventDefault();
      const delta = event.clientX - drag.startX;
      const maxWidth = measureMaxWidth();
      setWidth(clampWidth(drag.startWidth + delta, maxWidth));
    },
    [measureMaxWidth]
  );

  const endDrag = useCallback((event: PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current) return;
    dragRef.current = null;
    setIsResizing(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    const el = containerRef.current;
    const finalWidth = el ? el.getBoundingClientRect().width : undefined;
    if (finalWidth != null) {
      const clamped = clampWidth(finalWidth, measureMaxWidth());
      setWidth(clamped);
      persistWidth(clamped);
    }
  }, [measureMaxWidth]);

  const onHandleDoubleClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (!enabled || !isDesktop) return;
      event.preventDefault();
      event.stopPropagation();
      const clamped = clampWidth(MOSAIC_DEFAULT_WIDTH, measureMaxWidth());
      setWidth(clamped);
      persistWidth(clamped);
    },
    [enabled, isDesktop, measureMaxWidth]
  );

  const active = enabled && isDesktop;

  return {
    containerRef,
    width,
    isDesktop: active,
    isResizing,
    style: active ? ({ width: `${width}px`, maxWidth: 'none' } as const) : undefined,
    handleProps: active
      ? {
          onPointerDown: onHandlePointerDown,
          onPointerMove: onHandlePointerMove,
          onPointerUp: endDrag,
          onPointerCancel: endDrag,
          onDoubleClick: onHandleDoubleClick
        }
      : undefined
  };
}
