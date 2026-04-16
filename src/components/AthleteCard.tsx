import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Athlete } from '../types';
import { calculateScore } from '../utils/scoreCalculator';

interface Props {
  athlete: Athlete;
  onPress: () => void;
}

export const AthleteCard: React.FC<Props> = ({ athlete, onPress }) => {
  const score = calculateScore(athlete.stats);
  
  const getSportColor = () => {
    if (athlete.sport === 'Football') return '#FF6B6B';
    if (athlete.sport === 'Basketball') return '#4ECDC4';
    return '#45B7D1';
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.card, { borderLeftColor: getSportColor() }]}>
        <View style={styles.header}>
          <Text style={styles.name}>{athlete.name}</Text>
          <View style={[styles.scoreBadge, { backgroundColor: getSportColor() }]}>
            <Text style={styles.scoreText}>{score}</Text>
          </View>
        </View>
        <View style={styles.details}>
          <Text style={styles.sport}>{athlete.sport}</Text>
          <Text style={styles.position}>{athlete.position}</Text>
          <Text style={styles.age}>Age: {athlete.age}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    borderLeftWidth: 4,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  name: { fontSize: 18, fontWeight: 'bold', color: '#2C3E50' },
  scoreBadge: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20 },
  scoreText: { color: '#FFF', fontWeight: 'bold' },
  details: { flexDirection: 'row', gap: 12 },
  sport: { fontSize: 14, color: '#7F8C8D', fontWeight: '500' },
  position: { fontSize: 14, color: '#95A5A6' },
  age: { fontSize: 14, color: '#95A5A6' },
});