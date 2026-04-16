export interface Athlete {
  id: string;
  name: string;
  sport: 'Football' | 'Basketball' | 'Soccer';
  position: string;
  age: number;
  stats: {
    speed: number;
    stamina: number;
    accuracy: number;
    strength?: number;
    agility?: number;
  };
}

export type RootStackParamList = {
  DiscoverFeed: undefined;
  Profile: { athlete: Athlete };
  ShortlistTab: undefined;
};