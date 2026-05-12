import { platforms } from '../data/platforms';
interface PlatformBadgeProps {
  platformId: string;
  size?: 'sm' | 'md' | 'lg';
  showName?: boolean;
}
export function PlatformBadge({
  platformId,
  size = 'sm',
  showName = false
}: PlatformBadgeProps) {
  const platform = platforms[platformId];
  if (!platform) return null;
  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
    lg: 'text-sm px-4 py-2 font-medium'
  };
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full whitespace-nowrap shadow-sm ${sizeClasses[size]}`}
      style={{
        backgroundColor: platform.color,
        color: platform.textColor
      }}
      title={platform.name}>

      {showName ? platform.name : platform.name.substring(0, 1)}
    </span>);

}