export default async function handler(req, res) {
  // 1. Pegar o termo de busca enviado pelo seu VTT (ex: ?query=orc)
  const { query } = req.query;

  // 2. Pegar a chave oculta que vai estar salva nas configurações da Vercel
  const apiKey = process.env.UNSPLASH_ACCESS_KEY;

  if (!query) {
    return res.status(400).json({ error: 'Faltando o parâmetro de busca.' });
  }

  try {
    // 3. Fazer a requisição para o Unsplash de forma segura no servidor
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&client_id=${apiKey}`
    );
    const data = await response.json();

    // Habilitar CORS para que seu site no GitHub Pages consiga acessar essa API da Vercel
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    // 4. Devolver os dados das imagens para o seu VTT
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar imagens no Unsplash.' });
  }
}