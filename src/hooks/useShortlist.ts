import { useEffect, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@scoutiq_shortlist';

export const useShortlist = () => {
  const [shortlist, setShortlist] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const loadShortlist = useCallback(async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setShortlist(parsed);
      } else {
        setShortlist([]);
      }
    } catch (error) {
      console.error('Error loading shortlist:', error);
      setShortlist([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadShortlist();
  }, [loadShortlist]);

  const addToShortlist = useCallback(async (id: string) => {
    try {
      const newShortlist = [...shortlist, id];
      setShortlist(newShortlist);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newShortlist));
      console.log('Added to shortlist:', id, 'New list:', newShortlist);
    } catch (error) {
      console.error('Error adding to shortlist:', error);
    }
  }, [shortlist]);

  const removeFromShortlist = useCallback(async (id: string) => {
    try {
      const newShortlist = shortlist.filter(item => item !== id);
      setShortlist(newShortlist);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newShortlist));
      console.log('Removed from shortlist:', id, 'New list:', newShortlist);
    } catch (error) {
      console.error('Error removing from shortlist:', error);
    }
  }, [shortlist]);

  const isShortlisted = useCallback((id: string) => {
    return shortlist.includes(id);
  }, [shortlist]);

  return { shortlist, addToShortlist, removeFromShortlist, isShortlisted, loading, loadShortlist };
};