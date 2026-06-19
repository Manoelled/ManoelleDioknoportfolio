import React, { memo, useMemo } from 'react';
import AppIcon from './AppIcon';
import AppImage from './AppImage';

interface AppLogoProps {
  src?: string;
  iconName?: string;
  size?: number;
  className?: string;
  onClick?: () => void;
}

const AppLogo = memo(({
  src = 'https://img.rocket.new/generatedImages/rocket_gen_img_1f4776655-1777600010085.png',
  iconName = 'SparklesIcon',
  size = 48,
  className = '',
  onClick,
}: AppLogoProps) => {
  const containerClassName = useMemo(() => {
    const classes = ['flex items-center'];
    if (onClick) classes.push('cursor-pointer hover:opacity-80 transition-opacity');
    if (className) classes.push(className);
    return classes.join(' ');
  }, [onClick, className]);

  return (
    <div className={containerClassName} onClick={onClick}>
      {src ? (
        <AppImage
          src={src}
          alt="Logo" 
          width={size}
          height={size}
          className="flex-shrink-0 rounded-full border border-black/5"
          priority={true}
        />
      ) : (
        <AppIcon name={iconName} size={size} className="flex-shrink-0" />
      )}
    </div>
  );
});

export default AppLogo;
