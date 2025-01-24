import React, { useEffect, useState } from 'react';
import * as S from "./styles";
import despesasMock from "../mocks/despesas.json";
import ChatGemini from '../components/chat-gemini/ChatGemini';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../services/firebase';
import http from '../http';

type Despesa = {
  id: number;
  descricao: string;
  categoria: string;
  valor: number;
  tipo: string;
  data: string;
  user: string;
};

const Dashboard = () => {
  const [despesas, setDespesas] = useState(despesasMock);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const fetchDespesas = async () => {
      try {
        const response = await http.get(`/despesas/${user?.uid}`);
        setDespesas(response.data);
      } catch (error) {
        console.error("Erro ao buscar despesas: ", error)
      }
    }

    fetchDespesas();
  }, [])

  const calcularTotais = () => {
    if(despesas.length === 0) {
      return {entradas: 0, saidas: 0, saldo: 0}
    }

    const entradas = despesas
      .filter((d) => d.tipo === "entrada" && d.valor)
      .reduce((acc, d) => acc + d.valor, 0);

    const saidas = despesas
      .filter((d) => d.tipo === "saída" && d.valor)
      .reduce((acc, d) => acc + d.valor, 0);
      
    return { entradas, saidas, saldo: entradas - saidas };
  };

  const { entradas, saidas, saldo } = calcularTotais();

  return (
    <S.TableContainer>
      <S.Title>Dashboard de Finanças</S.Title>
      
      {/* Totais de Entradas, Saídas e Saldo */}
      <S.CardsContainer>
      <S.Card bgColor="#FF8C00">
        <p>Entradas</p>
        <p>R$ {entradas.toFixed(2)}</p>
      </S.Card>
      <S.Card bgColor="#B22222">
        <p>Saídas</p>
        <p>R$ {saidas.toFixed(2)}</p>
      </S.Card>
      <S.Card bgColor="#006400">
        <p>Saldo</p>
        <p>R$ {saldo.toFixed(2)}</p>
      </S.Card>
    </S.CardsContainer>
      
      {/* Tabela com os dados das despesas */}
      <S.StyledTable>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Categoria</th>
            <th>Valor</th>
            <th>Tipo</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {despesas.map((despesa) => (
            <tr key={despesa.id}>
              <td>{despesa.descricao}</td>
              <td>{despesa.categoria}</td>
              <td>R$ {despesa.valor.toFixed(2)}</td>
              <td>{despesa.tipo}</td>
              <td>{despesa.data}</td>
            </tr>
          ))}
        </tbody>
      </S.StyledTable>
      <ChatGemini despesas={despesas}/>
    </S.TableContainer>
  );
  
};

export default Dashboard;