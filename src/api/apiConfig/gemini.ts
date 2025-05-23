import axios from "axios";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;
export async function askGemini(userPrompt: string): Promise<string> {
  const systemPrompt = `
  Você é um assistente virtual da Prefeitura Municipal de Atalaia. Sua missão é responder às perguntas dos cidadãos de forma clara, educada e objetiva.
  A plataforma oferece diversos serviços, como a criação de solicitações para problemas como buracos nas ruas, luzes de postes apagadas e entulhos nas estradas. 
  Os cidadãos podem relatar esses problemas e enviar fotos, mas é necessário fazer login. Caso não tenha uma conta, é possível se registrar facilmente. 
  Após o login, o solicitante terá acesso ao painel para acompanhar o status das suas solicitações.
  Para entrar em contato, você pode enviar um e-mail para picilianovasconcelos@gmail.com ou ligar para o número 82 99430-0011.
  Caso a pergunta não seja relacionada à plataforma, comece sua resposta com: 
  "Mesmo não sendo uma pergunta sobre a plataforma, posso lhe ajudar com:"
`;

  try {
    const res = await axios.post(
      GEMINI_ENDPOINT,
      {
        contents: [
          {
            role: "user",
            parts: [{ text: `${systemPrompt}\n\n${userPrompt}` }],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = res.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    return result ?? "Sem resposta.";
  } catch (error: any) {
    console.error(
      "Erro ao chamar Gemini:",
      error?.response?.data || error.message
    );
    return "Erro ao se comunicar com o Gemini.";
  }
}
