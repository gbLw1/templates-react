export default function SomenteNumeros(valor: string): string {
  return valor?.replace(/[^0-9+]/g, "");
}
