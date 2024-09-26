import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

interface ContaFormProps {
  onAddConta: (fornecedor: string, tipoPagamento: string, meioPagamento: string, dataVencimento: string, valor: number) => void;
}

const ContaForm: React.FC<ContaFormProps> = ({ onAddConta }) => {
  const [fornecedor, setFornecedor] = useState('');
  const [tipoPagamento, setTipoPagamento] = useState('');
  const [meioPagamento, setMeioPagamento] = useState('');
  const [dataVencimento, setDataVencimento] = useState('');
  const [valor, setValor] = useState('');

  const handleAdd = () => {
    onAddConta(fornecedor, tipoPagamento, meioPagamento, dataVencimento, parseFloat(valor));
    setFornecedor('');
    setTipoPagamento('');
    setMeioPagamento('');
    setDataVencimento('');
    setValor('');
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Fornecedor" value={fornecedor} onChangeText={setFornecedor} style={styles.input} />
      <TextInput placeholder="Tipo de Pagamento" value={tipoPagamento} onChangeText={setTipoPagamento} style={styles.input} />
      <TextInput placeholder="Meio de Pagamento" value={meioPagamento} onChangeText={setMeioPagamento} style={styles.input} />
      <TextInput placeholder="Data de Vencimento" value={dataVencimento} onChangeText={setDataVencimento} style={styles.input} />
      <TextInput placeholder="Valor" value={valor} onChangeText={setValor} keyboardType="numeric" style={styles.input} />
      <Button title="Adicionar Conta" onPress={handleAdd} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
  },
});

export default ContaForm;
