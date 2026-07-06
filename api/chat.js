const SYSTEM_PROMPT = `You are a friendly AI assistant embedded on the personal portfolio website of Shoaib Ahmed, a Frontend Web Developer.

About Shoaib:
- Frontend Web Developer specializing in React, Next.js, WordPress, and Magento 2
- Builds responsive, modern UIs with Tailwind CSS
- This portfolio showcases his projects, skills, and experience

Your job is to chat with visitors of the portfolio: answer questions about Shoaib's skills, experience, and projects, help them navigate the site, and generally be a helpful, warm, and concise assistant. If you don't know a specific detail about Shoaib that isn't provided here, be honest and suggest the visitor use the Contact section to reach out directly. Keep replies conversational and reasonably brief.`;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Server is not configured with an API key' });
  }

  const { messages } = req.body || {};
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Request must include a non-empty "messages" array' });
  }

  const sanitizedMessages = messages
    .filter((m) => m && typeof m.content === 'string' && (m.role === 'user' || m.role === 'assistant'))
    .map((m) => ({ role: m.role, content: m.content }));

  if (sanitizedMessages.length === 0) {
    return res.status(400).json({ error: 'No valid messages provided' });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1000,
        system: SYSTEM_PROMPT,
        messages: sanitizedMessages,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      const message = data?.error?.message || 'Failed to get a response from the assistant';
      return res.status(response.status).json({ error: message });
    }

    const reply = data?.content?.find((block) => block.type === 'text')?.text || '';
    return res.status(200).json({ reply });
  } catch (err) {
    return res.status(502).json({ error: 'Failed to reach the assistant service' });
  }
}
