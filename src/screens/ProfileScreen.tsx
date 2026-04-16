import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { ReadinessScore } from '../components/ReadinessScore';
import { useShortlist } from '../hooks/useShortlist';
import { calculateScore, calculateReadiness } from '../utils/scoreCalculator';
import { RootStackParamList, Athlete } from '../types';
import { RouteProp } from '@react-navigation/native';

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Profile'>;

export const ProfileScreen = () => {
  const route = useRoute<ProfileScreenRouteProp>();
  const navigation = useNavigation();
  const { athlete } = route.params;
  const { isShortlisted, addToShortlist, removeFromShortlist, loadShortlist } = useShortlist();
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const check = isShortlisted(athlete.id);
    setSaved(check);
  }, [athlete.id, isShortlisted]);

  const overall = calculateScore(athlete.stats);
  const readiness = calculateReadiness(athlete.stats);

  const handleToggle = async () => {
    if (saved) {
      await removeFromShortlist(athlete.id);
      Alert.alert('Removed', `${athlete.name} removed from shortlist`);
      setSaved(false);
    } else {
      await addToShortlist(athlete.id);
      Alert.alert('Added', `${athlete.name} added to shortlist`);
      setSaved(true);
    }
    // Force refresh shortlist screen
    loadShortlist();
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.name}>{athlete.name}</Text>
        <View style={styles.scoreBox}>
          <Text style={styles.scoreLabel}>Overall</Text>
          <Text style={styles.scoreValue}>{overall}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Sport: <Text style={styles.value}>{athlete.sport}</Text></Text>
        <Text style={styles.label}>Position: <Text style={styles.value}>{athlete.position}</Text></Text>
        <Text style={styles.label}>Age: <Text style={styles.value}>{athlete.age}</Text></Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Performance Metrics</Text>
        {Object.entries(athlete.stats).map(([key, val]) => (
          <View key={key} style={styles.statRow}>
            <Text style={styles.statLabel}>{key.toUpperCase()}</Text>
            <View style={styles.statBarBg}>
              <View style={[styles.statBarFill, { width: `${val}%` }]} />
            </View>
            <Text style={styles.statValue}>{val}</Text>
          </View>
        ))}
      </View>

      <View style={styles.card}>
        <ReadinessScore score={readiness} />
      </View>

      <TouchableOpacity 
        style={[styles.button, saved && styles.buttonRemove]} 
        onPress={handleToggle}
      >
        <Text style={styles.buttonText}>
          {saved ? 'Remove from Shortlist' : 'Add to Shortlist'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  header: { 
    backgroundColor: '#FFF', 
    padding: 20, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    borderBottomWidth: 1, 
    borderBottomColor: '#E0E0E0' 
  },
  name: { fontSize: 24, fontWeight: 'bold', color: '#2C3E50' },
  scoreBox: { alignItems: 'center' },
  scoreLabel: { fontSize: 12, color: '#7F8C8D' },
  scoreValue: { fontSize: 28, fontWeight: 'bold', color: '#3498DB' },
  card: { backgroundColor: '#FFF', margin: 16, padding: 16, borderRadius: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  label: { fontSize: 14, color: '#7F8C8D', marginVertical: 4 },
  value: { color: '#2C3E50', fontWeight: '500' },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 16, color: '#2C3E50' },
  statRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  statLabel: { width: 70, fontSize: 12, color: '#7F8C8D', fontWeight: '500' },
  statBarBg: { flex: 1, height: 8, backgroundColor: '#ECF0F1', borderRadius: 4, overflow: 'hidden' },
  statBarFill: { height: '100%', backgroundColor: '#3498DB', borderRadius: 4 },
  statValue: { width: 35, fontSize: 12, color: '#2C3E50', textAlign: 'right', fontWeight: '500' },
  button: { backgroundColor: '#3498DB', margin: 16, padding: 16, borderRadius: 12, alignItems: 'center' },
  buttonRemove: { backgroundColor: '#E74C3C' },
  buttonText: { color: '#FFF', fontSize: 16, fontWeight: '600' },
});