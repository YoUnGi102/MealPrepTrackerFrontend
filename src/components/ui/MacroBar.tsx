type MacroBarProps = {
    value: number; // from 0 to 100
    color?: string;
  };
  
  const MacroBar: React.FC<MacroBarProps> = ({ value, color = 'green' }) => {
    console.log(value, color)
    return (
      <div style={{
        margin: '0 auto',
        backgroundColor: '#e0e0e0',
        width: '200px',
        height: '8px',
        borderRadius: '4px',
        overflow: 'hidden'
      }}>
        <div style={{
          width: `${Math.min(value, 100)}%`,
          height: '100%',
          backgroundColor: color,
          transition: 'width 0.3s ease'
        }} />
      </div>
    );
  };
  
  export default MacroBar;
  