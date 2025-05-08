import clsx from 'clsx';
import styles from './Logo.module.scss';
import LogoIcon from '@/assets/logo.svg?react';

const Logo = (props: ReactProps) => {
  return <LogoIcon className={clsx(styles.logo, props.className)} />;
};

export default Logo;
