import { useEffect, useState } from 'react';
import { debounce } from '../../helpers/client/debounce';

export const useScrollEvent = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  const handleScroll = debounce(() => {
    const currentScrollPos = window.scrollY;

    setIsVisible(prevScrollPos > currentScrollPos);

    setPrevScrollPos(currentScrollPos);
  }, 100);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos, isVisible, handleScroll]);

  return isVisible;
};
