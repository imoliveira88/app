import React, { createContext ,useCallback, useContext, useState, useReducer } from 'react';
import api from '../services/api';


interface ContractCity {
  city: string
}
interface ContractContextData {
  city:any,
  neighborhoods(): Promise<void>,
}

interface ContractState {
  bairros: Array<string>
}

interface CityState {
  cidades: Array<string>
}

const ContractContext = createContext<ContractContextData>({} as ContractContextData);

const ContractProvider: React.FC = (children) => {

  const [data, setData] = useState<ContractState>({} as ContractState)
  const [cityData, setCityData] = useState<CityState>({} as CityState)

  const neighborhoods = useCallback(async (data) => {
    alert('the neighborhood');

    const response = await api.get(`api/online-contracts-neighborhoods`)
    const dados = response.data
    setData(dados);
  }, [])

  const citys = useCallback(async (data) => {
    const response = await api.get('api/online-contracts')
    const dados = response.data
    setCityData(dados);
  }, [])

  return (
    <ContractContext.Provider value={{city: data , neighborhoods}}>
      {children}
    </ContractContext.Provider>
  )
}

function useProvider(): ContractContextData{
  const context = useContext(ContractContext)
  if(!context) {
    throw new Error('useProvider must be used within an ContractProvider')
  }

  return context
}

export { ContractProvider, useProvider};
