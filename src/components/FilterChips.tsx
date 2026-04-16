import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

interface Props {
  options: string[];
  selected: string | null;
  onSelect: (option: string | null) => void;
}

export const FilterChips: React.FC<Props> = ({ options, selected, onSelect }) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
      <TouchableOpacity 
        style={[styles.chip, selected === null && styles.chipSelected]} 
        onPress={() => onSelect(null)}
      >
        <Text style={[styles.chipText, selected === null && styles.chipTextSelected]}>All</Text>
      </TouchableOpacity>
      {options.map(option => (
        <TouchableOpacity 
          key={option} 
          style={[styles.chip, selected === option && styles.chipSelected]} 
          onPress={() => onSelect(option)}
        >
          <Text style={[styles.chipText, selected === option && styles.chipTextSelected]}>{option}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { paddingVertical: 12, paddingHorizontal: 16 },
  chip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#ECF0F1', marginRight: 8 },
  chipSelected: { backgroundColor: '#3498DB' },
  chipText: { color: '#7F8C8D' },
  chipTextSelected: { color: '#FFF', fontWeight: '500' },
});