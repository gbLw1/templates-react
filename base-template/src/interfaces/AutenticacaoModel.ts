export default interface AutenticacaoModel {
  tokenType: string;
  accessToken: string;
  expiresIn: number;
  refreshToken?: string;
}
