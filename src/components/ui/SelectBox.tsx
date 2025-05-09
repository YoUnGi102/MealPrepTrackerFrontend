import React, { useState, useRef, useEffect } from 'react';
import styles from './SelectBox.module.scss';

export type Option = {
  label: string;
  value: string | number;
};

type SelectBoxProps = {
  options: Option[];
  selected: Option;
  onChange: (option: Option) => void;
  label?: string;
};

const SelectBox: React.FC<SelectBoxProps> = ({ options, selected, onChange, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = (option: Option) => {
    onChange(option);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={styles.selectBox} ref={containerRef}>
      {label && <label className={styles.label}>{label}</label>}

      <div className={styles.selected} onClick={() => setIsOpen(!isOpen)}>
        {selected.label}
        <span className={styles.arrow}>{isOpen ? '▲' : '▼'}</span>
      </div>

      {isOpen && (
        <ul className={styles.options}>
          {options.map((option) => (
            <li
              key={option.value}
              className={`${styles.option} ${option.value === selected.value ? styles.selectedOption : ''}`}
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectBox;
