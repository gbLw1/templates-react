import { Link } from "react-router-dom";
import Header from "../components/Header";

export default function Home() {
  return (
    <div>
      <Header />
      <h1>Base Template</h1>
      <Link to="/cep">Teste CEP</Link>
    </div>
  );
}
