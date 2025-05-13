'use client';
import { Button } from '@/components/ui/button';

export const CleanThemeStorageButton = () => {
  function cleanStorage() {
    localStorage.removeItem('theme');
    localStorage.removeItem('theme-pc');
  }

  return (<Button onClick={cleanStorage} className="bg-red-500">Clean localStorage</Button>
  );
};
