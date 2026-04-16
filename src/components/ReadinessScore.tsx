import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  score: number;
}

export const ReadinessScore: React.FC<Props> = ({ score }) => {
  const getColor = () => {
    if (score >= 80) return '#2ECC71';
    if (score >= 60) return '#F39C12';
    return '#E74C3C';
  };

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.label}>Readiness Score</Text>
        <Text style={[styles.score, { color: getColor() }]}>{score}%</Text>
      </View>
      <View style={styles.barBg}>
        <View style={[styles.barFill, { width: `${score}%`, backgroundColor: getColor() }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  label: { fontSize: 14, color: '#7F8C8D' },
  score: { fontSize: 18, fontWeight: 'bold' },
  barBg: { height: 8, backgroundColor: '#ECF0F1', borderRadius: 4, overflow: 'hidden' },
  barFill: { height: '100%', borderRadius: 4 },
});