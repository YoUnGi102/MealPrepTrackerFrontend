import React from 'react';

type MacroSpinnerProps = {
  label: string;
  total?: number; // 0–100 (percentage)
  amount: number;
  color?: string; // foreground color
  size?: number; // diameter
  unit?: string; // g, kcal ...
};

const MacroSpinner: React.FC<MacroSpinnerProps> = ({
  label,
  total = 100,
  amount,
  color = '#4ade80',
  size = 80,
  unit = '',
}) => {
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (amount / total) * circumference;

  return (
    <div
      style={{
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
      {/* Label above the spinner */}
      <span
        style={{
          fontSize: '0.85rem',
          fontWeight: 'bold',
          marginBottom: '4px',
        }}>
        {label}
      </span>

      {/* Circular SVG Spinner */}
      <svg width={size} height={size} className="macro-spinner">
        {/* Background Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#ccc"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Foreground Progress Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={amount > 0 ? color : '#000'}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.4s ease' }}
        />
        {/* Amount inside circle */}
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="central"
          fill="#333"
          fontSize="12"
          fontWeight="bold">
          {`${amount}${unit && ' ' + unit}`}
        </text>
      </svg>
    </div>
  );
};

export default MacroSpinner;
