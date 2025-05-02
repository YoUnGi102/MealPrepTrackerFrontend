import * as SliderPrimitive from '@radix-ui/react-slider';
import React from 'react';

type SliderProps = React.ComponentProps<typeof SliderPrimitive.Root>;

const Slider: React.FC<SliderProps> = (props) => {
  return (
    <SliderPrimitive.Root {...props}>
      <SliderPrimitive.Track>
        <SliderPrimitive.Range />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb />
    </SliderPrimitive.Root>
  );
};

type ReadonlySliderProps = {
  value: number[]; // e.g., [60]
};

const ReadonlySlider: React.FC<ReadonlySliderProps> = ({ value }) => {
  return (
    <SliderPrimitive.Root
      value={value}
      max={100}
      style={{
        width: '100px',
        height: '1rem',
        position: 'relative',
        pointerEvents: 'none',
      }}
    >
      <SliderPrimitive.Track
        style={{
          backgroundColor: '#ddd',
          height: '0.5rem',
          borderRadius: '999px',
          width: '100%',
          position: 'relative',
        }}
      >
        <SliderPrimitive.Range
          style={{
            backgroundColor: '#4caf50',
            height: '100%',
            borderRadius: '999px',
            position: 'absolute',
            left: 0,
            width: `${value[0]}%`, // 👈 key part
          }}
        />
      </SliderPrimitive.Track>
    </SliderPrimitive.Root>
  );
};

export {Slider, ReadonlySlider}
