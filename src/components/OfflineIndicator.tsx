import React from 'react';
import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div 
      id="pwa-offline-indicator"
      className="fixed bottom-4 left-4 z-50 flex items-center gap-2 rounded-2xl bg-amber-500/95 border border-amber-600 px-4 py-3 text-sm font-medium text-white shadow-xl backdrop-blur-md animate-bounce"
    >
      <WifiOff className="w-4 h-4 animate-pulse" />
      <span>Offline Mode — Using cached curriculum & templates.</span>
    </div>
  );
};
