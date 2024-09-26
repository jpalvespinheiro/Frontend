import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import { getContas, addConta } from '../services/database';
import ContaForm from '../components/ContaForm';

const ContaScreen: React.FC = () => {
  const [contas, setContas] = useState<any[]>([]);

  useEffect(() => {
    loadContas();
  }, []);

  const loadContas = () => {
    getContas(setContas);
  };

  const handleAddConta = (fornecedor: string, tipoPagamento: string, meioPagamento: string, dataVencimento: string, valor: number) => {
    addConta(fornecedor, tipoPagamento, meioPagamento, dataVencimento, valor, () => {
      loadContas();
      Alert.alert('Conta adicionada com sucesso!');
    });
  };

  return (
    <View>
      <Text>Contas</Text>
      <FlatList
        data={contas}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>Fornecedor: {item.fornecedor}</Text>
            <Text>Valor: {item.valor}</Text>
            <Text>Data de Vencimento: {item.dataVencimento}</Text>
          </View>
        )}
      />
      <ContaForm onAddConta={handleAddConta} />
    </View>
  );
};

export default ContaScreen;
