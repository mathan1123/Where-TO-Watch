import { platformList } from '../data/platforms';
interface FilterChipsProps {
  selectedPlatform: string | null;
  onSelectPlatform: (id: string | null) => void;
}
export function FilterChips({
  selectedPlatform,
  onSelectPlatform
}: FilterChipsProps) {
  return (
    <div className="w-full overflow-x-auto hide-scrollbar py-4">
      <div className="flex items-center gap-2 px-4 md:px-8 min-w-max">
        <button
          onClick={() => onSelectPlatform(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${selectedPlatform === null ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'}`}>
          
          All Platforms
        </button>

        {platformList.map((platform) => {
          const isSelected = selectedPlatform === platform.id;
          return (
            <button
              key={platform.id}
              onClick={() => onSelectPlatform(platform.id)}
              className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 overflow-hidden ${isSelected ? 'text-white' : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'}`}
              style={
              isSelected ?
              {
                backgroundColor: platform.color,
                color: platform.textColor,
                boxShadow: `0 0 15px ${platform.color}60`
              } :
              {}
              }>
              
              {platform.name}
            </button>);

        })}
      </div>
    </div>);

}