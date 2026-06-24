declare module 'react-pageflip' {
  import * as React from 'react';

  export interface FlipBookProps {
    width: number;
    height: number;
    size?: 'fixed' | 'stretch';
    minWidth?: number;
    maxWidth?: number;
    minHeight?: number;
    maxHeight?: number;
    drawShadow?: boolean;
    flippingTime?: number;
    useMouseEvents?: boolean;
    swipeDistance?: number;
    showCover?: boolean;
    usePortrait?: boolean;
    startOnOnPage?: number;
    onFlip?: (e: { data: number }) => void;
    onChangeOrientation?: (e: { data: string }) => void;
    onChangeState?: (e: { data: string }) => void;
    style?: React.CSSProperties;
    className?: string;
    children: React.ReactNode;
    maxShadowOpacity?: number;
    mobileScrollSupport?: boolean;
    clickEventForward?: boolean;
  }

  const HTMLFlipBook: React.ForwardRefExoticComponent<
    FlipBookProps & React.RefAttributes<any>
  >;

  export default HTMLFlipBook;
}
