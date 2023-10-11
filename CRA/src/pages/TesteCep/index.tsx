import useViaCep from "../../hooks/useViaCep";

export default function TesteCep() {
  const { loading, response, cep, setCep } = useViaCep();

  return (
    <div>
      <h1>Teste CEP</h1>
      <input
        type="text"
        value={cep}
        onChange={({ target: { value } }) => setCep(value)}
      />
      {loading && <p>Carregando...</p>}
      {!loading && response && <pre>{JSON.stringify(response, null, 2)}</pre>}
    </div>
  );
}
