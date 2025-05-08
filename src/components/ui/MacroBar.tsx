type MacroBarProps = {
  value: number; // from 0 to 100
  color?: string;
};

const MacroBar: React.FC<MacroBarProps> = ({ value, color = 'green' }) => {
  return (
    <div
      style={{
        backgroundColor: '#e0e0e0',
        width: '100%',
        height: '8px',
        borderRadius: '4px',
        overflow: 'hidden',
      }}>
      <div
        style={{
          width: `${Math.min(value, 100)}%`,
          height: '100%',
          backgroundColor: color,
          transition: 'width 0.3s ease',
        }}
      />
    </div>
  );
};

export default MacroBar;
