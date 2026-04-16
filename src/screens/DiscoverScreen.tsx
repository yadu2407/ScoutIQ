import React, { useState, useMemo } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AthleteCard } from '../components/AthleteCard';
import { FilterChips } from '../components/FilterChips';
import { SearchBar } from '../components/SearchBar';
import { useDebounce } from '../hooks/useDebounce';
import athletesData from '../assets/athletes.json';
import { RootStackParamList, Athlete } from '../types';

type DiscoverScreenNavigationProp = StackNavigationProp<RootStackParamList, 'DiscoverFeed'>;

export const DiscoverScreen = () => {
  const navigation = useNavigation<DiscoverScreenNavigationProp>();
  const [sport, setSport] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search);

  const athletes = athletesData as Athlete[];
  const sports = ['Football', 'Basketball', 'Soccer'];

  const filtered = useMemo(() => {
    let result = athletes;
    if (sport) result = result.filter(a => a.sport === sport);
    if (debouncedSearch) result = result.filter(a => a.name.toLowerCase().includes(debouncedSearch.toLowerCase()));
    return result;
  }, [sport, debouncedSearch]);

  const resultCount = filtered.length;

  if (filtered.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <SearchBar value={search} onChangeText={setSearch} />
        <FilterChips options={sports} selected={sport} onSelect={setSport} />
        <View style={styles.empty}>
          <Text style={styles.emptyEmoji}>🔍</Text>
          <Text style={styles.emptyTitle}>No athletes found</Text>
          <Text style={styles.emptySubtitle}>Try changing your search or filter</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar value={search} onChangeText={setSearch} />
      {search ? (
        <Text style={styles.resultCount}>Found {resultCount} athlete{resultCount !== 1 ? 's' : ''}</Text>
      ) : null}
      <FilterChips options={sports} selected={sport} onSelect={setSport} />
      <FlatList 
        data={filtered} 
        keyExtractor={item => item.id} 
        renderItem={({ item }) => (
          <AthleteCard 
            athlete={item} 
            onPress={() => navigation.navigate('Profile', { athlete: item })} 
          />
        )} 
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  resultCount: { paddingHorizontal: 16, paddingTop: 8, fontSize: 12, color: '#7F8C8D' },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyEmoji: { fontSize: 48, marginBottom: 16 },
  emptyTitle: { fontSize: 18, fontWeight: '600', color: '#2C3E50' },
  emptySubtitle: { fontSize: 14, color: '#95A5A6', marginTop: 8 },
});