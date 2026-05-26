import {
  createContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

type Usuario = {
  id: number;
  nome: string;
  tipo: string;
};

type AuthContextData = {
  usuario: Usuario | null;
  token: string | null;
  carregando: boolean;
  login: (token: string, usuario: Usuario) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextData);

type Props = {
  children: ReactNode;
};

export function AuthProvider({ children }: Props) {

  const [usuario, setUsuario] = useState<Usuario | null>(null);

  const [token, setToken] = useState<string | null>(null);

  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {

    const tokenStorage =
      await AsyncStorage.getItem('token');

    const usuarioStorage =
      await AsyncStorage.getItem('usuario');

    if (tokenStorage && usuarioStorage) {

      setToken(tokenStorage);

      setUsuario(JSON.parse(usuarioStorage));
    }

    setCarregando(false);
  }

  async function login(
    novoToken: string,
    novoUsuario: Usuario
  ) {

    await AsyncStorage.setItem(
      'token',
      novoToken
    );

    await AsyncStorage.setItem(
      'usuario',
      JSON.stringify(novoUsuario)
    );

    setToken(novoToken);

    setUsuario(novoUsuario);
  }

  async function logout() {

    await AsyncStorage.removeItem('token');

    await AsyncStorage.removeItem('usuario');

    setUsuario(null);

    setToken(null);
  }

  return (
    <AuthContext.Provider
      value={{
        usuario,
        token,
        carregando,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}