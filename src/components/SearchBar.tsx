import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

interface Props {
  value: string;
  onChangeText: (text: string) => void;
}

export const SearchBar: React.FC<Props> = ({ value, onChangeText }) => {
  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.input} 
        placeholder="Search athletes..." 
        value={value} 
        onChangeText={onChangeText}
        placeholderTextColor="#95A5A6"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingHorizontal: 16, paddingVertical: 8 },
  input: { backgroundColor: '#F5F5F5', borderRadius: 8, paddingHorizontal: 16, paddingVertical: 12, fontSize: 16 },
});