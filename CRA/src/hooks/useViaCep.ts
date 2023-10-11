import { useEffect, useState } from "react";
import externalApi from "../services/externalApi";
import { SomenteNumeros } from "../utils";

interface ViaCepModel {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
  erro?: boolean;
}

export default function useViaCep() {
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<ViaCepModel | null>(null);
  const [cep, setCep] = useState<string>("");

  const FetchCep = async (): Promise<void> => {
    setLoading(true);

    externalApi("https://viacep.com.br")
      .get<ViaCepModel>(`/ws/${cep}/json`)
      .then(({ data }) => setResponse(data))
      .catch((error: any) => setResponse(error.response.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (SomenteNumeros(cep).length !== 8) return;

    FetchCep();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cep]);

  return { loading, response, cep, setCep };
}
