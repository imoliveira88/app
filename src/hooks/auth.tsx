import React, { createContext, useCallback, useState, useContext, useEffect } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import api from '../services/api'
import config from '../config/config'


interface LoginCredentials {
  contract: string,
  password: string
}

interface AuthState {
  id: number,
  corporate_name: string,
  contract_number: string,
  name: string,
  cpf_cnpj: string,
  email: number,
  email_verified_at: string | null,
  original_id: string | null,
  createt_at: string,
  updated_at: string,
  measuring_cycle: number,
}

interface AuthContextData {
  user: {
    id: number,
    corporate_name: string,
    contract_number: string,
    name: string,
    cpf_cnpj: string,
    email: number,
    email_verified_at: string | null,
    original_id: string | null,
    createt_at: string,
    updated_at: string,
    measuring_cycle: number,
  },
  loading: boolean,
  login(credentials: LoginCredentials): Promise<void>,
  logout(): void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);


const AuthProvider: React.FC = ({ children, navigation }) => {
  const [data, setData] = useState<AuthState>({} as AuthState)
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    async function loadStoragedData(): Promise<void> {
      const user = await AsyncStorage.getItem('@Copergas:user')

      if (user) {
        setData(JSON.parse(user))
      }
      setLoading(false)
    }

    loadStoragedData()
  }, [])

  const login = useCallback(async ({ contract, password }) => {
    let data = { username: contract, password: password, client_id: config.clientId, client_secret: config.clientSecret, grant_type: 'password' }

    try {
      const response = await api.post(`oauth/token`, data)

      const tokenData = response.data
      await AsyncStorage.setItem('@Copergas:auth', JSON.stringify(tokenData))

      const userResponse = await api.get('api/user', { headers: { "Content-Type": "application/json", "Authorization": "Bearer " + response.data.access_token } });
      const userData = userResponse.data;
      await AsyncStorage.setItem('@Copergas:user', JSON.stringify(userData))

      setData(tokenData);
    } catch (e) {
      throw e;
    }
  }, [])

  const logout = useCallback(async () => {
    await AsyncStorage.removeItem('@Copergas:user')
    await AsyncStorage.removeItem('@Copergas:auth')
    setData({} as AuthState)
  }, [])

  return (
    <AuthContext.Provider value={{ user: data, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}

export { AuthProvider, useAuth }
