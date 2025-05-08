import clsx from 'clsx';
import styles from './Logo.module.scss';
import LogoIcon from '@/assets/logo.svg?react';
import LogoIconMini from '@/assets/logo-mini.svg?react';
import { LogoProps } from '@/lib/types/LogoProps';

const Logo = (props: LogoProps) => {
  return props.isFull ? <LogoIcon className={clsx(styles.logo, props.className)} style={{color: props.fill || 'black'}} /> : <LogoIconMini className={clsx(styles.logo, props.className)} style={{color: props.fill || 'black'}} />
};

export default Logo;
