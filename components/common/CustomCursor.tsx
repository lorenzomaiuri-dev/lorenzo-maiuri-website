'use client';
import { useEffect } from 'react';
import fluidCursor from '@lib/hooks/useFluidCursor';

const FluidCursor = () => {
  useEffect(() => {
    fluidCursor();
  }, []);

  return (
    <div className='fixed top-0 left-0 w-screen h-screen z-2 pointer-events-none'>
      <canvas id='fluid' className='w-full h-full' style={{ pointerEvents: 'none' }} />
    </div>
  );
};
export default FluidCursor;