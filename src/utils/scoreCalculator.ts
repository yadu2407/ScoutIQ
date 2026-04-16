export const calculateScore = (stats: any): number => {
  let total = stats.speed + stats.stamina + stats.accuracy;
  let count = 3;
  
  if (stats.strength) {
    total += stats.strength;
    count++;
  }
  if (stats.agility) {
    total += stats.agility;
    count++;
  }
  
  return Math.round(total / count);
};

export const calculateReadiness = (stats: any): number => {
  return Math.round((stats.speed * 0.3) + (stats.stamina * 0.35) + (stats.accuracy * 0.35));
};