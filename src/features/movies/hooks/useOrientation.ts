import { useState, useEffect } from 'react';
import { Dimensions, ScaledSize } from 'react-native';

const useOrientation = (): boolean => {
  const [isLandscape, setIsLandscape] = useState<boolean>(() => {
    const { width, height } = Dimensions.get('window');
    return width > height;
  });

  useEffect(() => {
    const handleOrientationChange = ({ window }: { window: ScaledSize }) => {
      const { width, height } = window;
      setIsLandscape(width > height);
    };

    const subscription = Dimensions.addEventListener(
      'change',
      handleOrientationChange,
    );

    return () => {
      subscription?.remove();
    };
  }, []);

  return isLandscape;
};

export default useOrientation;
