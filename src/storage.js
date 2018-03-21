import { AsyncStorage } from 'react-native';

const HEART_STORAGE_KEY = 'heart';

export default class Storage {
  static async asyncGetFavoriteList() {
    const favoriteList = await AsyncStorage.getItem(HEART_STORAGE_KEY);
    return JSON.parse(favoriteList);
  }
  static async asyncSaveFavorite(itemUrl) {
    let initialData;
    const currentData = await AsyncStorage.getItem(HEART_STORAGE_KEY);
    if (!currentData) {
      initialData = [];
    } else {
      initialData = currentData;
    }
    initialData.push(itemUrl);
    await AsyncStorage.setItem(HEART_STORAGE_KEY, JSON.stringify(initialData));
  }
}
