import React, { useMemo, useCallback, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, FlatList, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useShortlist } from '../hooks/useShortlist';
import { AthleteCard } from '../components/AthleteCard';
import athletesData from '../assets/athletes.json';
import { calculateScore } from '../utils/scoreCalculator';
import { RootStackParamList, Athlete } from '../types';

type ShortlistScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ShortlistTab'>;

export const ShortlistScreen = () => {
  const navigation = useNavigation<ShortlistScreenNavigationProp>();
  const { shortlist, removeFromShortlist, loadShortlist } = useShortlist();
  const [refreshing, setRefreshing] = useState(false);
  const athletes = athletesData as Athlete[];
  
  const shortlisted = useMemo(() => athletes.filter(a => shortlist.includes(a.id)), [shortlist]);
  
  const avgScore = useMemo(() => {
    if (shortlisted.length === 0) return 0;
    const total = shortlisted.reduce((sum, a) => sum + calculateScore(a.stats), 0);
    return Math.round(total / shortlisted.length);
  }, [shortlisted]);

  // Refresh when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      loadShortlist();
    }, [loadShortlist])
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadShortlist();
    setRefreshing(false);
  }, [loadShortlist]);

  const handleRemove = (id: string, name: string) => {
    Alert.alert(
      'Remove Athlete',
      `Remove ${name} from shortlist?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Remove', 
          onPress: async () => {
            await removeFromShortlist(id);
            await loadShortlist();
          },
          style: 'destructive'
        }
      ]
    );
  };

  if (shortlisted.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.empty}>
          <Text style={styles.emptyEmoji}>⭐</Text>
          <Text style={styles.emptyTitle}>No shortlisted athletes</Text>
          <Text style={styles.emptyText}>Go to Discover and add athletes</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.stats}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Total Athletes</Text>
          <Text style={styles.statValue}>{shortlisted.length}</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Average Score</Text>
          <Text style={styles.statValue}>{avgScore}</Text>
        </View>
      </View>

      <FlatList
        data={shortlisted}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => (
          <View>
            <AthleteCard 
              athlete={item} 
              onPress={() => navigation.navigate('Profile', { athlete: item })} 
            />
            <TouchableOpacity 
              style={styles.removeButton}
              onPress={() => handleRemove(item.id, item.name)}
            >
              <Text style={styles.removeButtonText}>Remove from Shortlist</Text>
            </TouchableOpacity>
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  stats: { 
    flexDirection: 'row', 
    backgroundColor: '#FFF', 
    margin: 16, 
    padding: 16, 
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2
  },
  statBox: { flex: 1, alignItems: 'center' },
  statDivider: { width: 1, backgroundColor: '#E0E0E0', marginHorizontal: 16 },
  statLabel: { fontSize: 12, color: '#7F8C8D', marginBottom: 4 },
  statValue: { fontSize: 24, fontWeight: 'bold', color: '#2C3E50' },
  removeButton: {
    backgroundColor: '#E74C3C',
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  removeButtonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 14,
  },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyEmoji: { fontSize: 48, marginBottom: 16 },
  emptyTitle: { fontSize: 18, fontWeight: '600', color: '#2C3E50' },
  emptyText: { fontSize: 14, color: '#95A5A6', marginTop: 8 },
});