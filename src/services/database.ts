import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {
    name: 'contas_fornecedores.db',
    location: 'default',
  },
  () => {},
  error => {
    console.log('Error opening database: ', error);
  }
);

export const initDB = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS contas (id INTEGER PRIMARY KEY AUTOINCREMENT, fornecedor TEXT NOT NULL, tipoPagamento TEXT NOT NULL, meioPagamento TEXT NOT NULL, dataVencimento TEXT NOT NULL, valor REAL NOT NULL);'
    );
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS fornecedores (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT NOT NULL);'
    );
  });
};

export const getContas = (callback: (contas: any[]) => void) => {
  db.transaction(tx => {
    tx.executeSql('SELECT * FROM contas', [], (_, resultSet) => {
      const contas = [];
      for (let i = 0; i < resultSet.rows.length; i++) {
        contas.push(resultSet.rows.item(i));
      }
      callback(contas);
    });
  });
};

export const addConta = (fornecedor: string, tipoPagamento: string, meioPagamento: string, dataVencimento: string, valor: number, callback: () => void) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO contas (fornecedor, tipoPagamento, meioPagamento, dataVencimento, valor) VALUES (?, ?, ?, ?, ?)',
      [fornecedor, tipoPagamento, meioPagamento, dataVencimento, valor],
      () => {
        callback();
      },
      error => {
        console.log('Error adding conta: ', error);
      }
    );
  });
};

export const getFornecedores = (callback: (fornecedores: any[]) => void) => {
  db.transaction(tx => {
    tx.executeSql('SELECT * FROM fornecedores', [], (_, resultSet) => {
      const fornecedores = [];
      for (let i = 0; i < resultSet.rows.length; i++) {
        fornecedores.push(resultSet.rows.item(i));
      }
      callback(fornecedores);
    });
  });
};

export const addFornecedor = (nome: string, callback: () => void) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO fornecedores (nome) VALUES (?)',
      [nome],
      () => {
        callback();
      },
      error => {
        console.log('Error adding fornecedor: ', error);
      }
    );
  });
};
