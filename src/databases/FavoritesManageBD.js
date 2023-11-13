import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({
  name: 'favorites.db',
  location: 'default',
});

export const initializeFavoritesTable = () => {
  db.transaction((tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS favorites (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, flower_id INTEGER)',
      []
    );
  });
};

export const fetchFavorites = (username, setFavoritesData) => {
  db.transaction((tx) => {
    tx.executeSql('SELECT * FROM favorites WHERE username = ?', [username], (tx, results) => {
      const data = [];
      for (let i = 0; i < results.rows.length; ++i) {
        data.push(results.rows.item(i));
      }
      setFavoritesData(data);
    });
  });
};

export const addToFavorites = (username, flowerId, callback) => {
  db.transaction((tx) => {
    tx.executeSql('INSERT INTO favorites (username, flower_id) VALUES (?, ?)', [username, flowerId], (_, results) => {
      if (results.rowsAffected > 0) {
        callback();
      }
    });
  });
};