export const config = { runtime: 'edge' };

const SYSTEM_PROMPT = `You are a friendly AI assistant embedded on the personal portfolio website of Shoaib Ahmed, a Frontend Web Developer.

About Shoaib:
- Frontend Web Developer specializing in React, Next.js, WordPress, and Magento 2
- Builds responsive, modern UIs with Tailwind CSS, Bootstrap, and Material UI
- Also works with Strapi 5, Hyva Theme, and Technical SEO
- Works efficiently and productively by pairing frontend expertise with AI tools for research, debugging, and automating repetitive tasks

Some of Shoaib's projects (mention these when asked about his work, and include the link when relevant):
- TalentVare - Job Portal: https://find-job-pi.vercel.app/
- Jewelicious - Jewelry E-commerce: https://shoaibahmed230.github.io/jewelry-e-commerce-site/
- App Lab - Software Landing Page: https://connectifysync.com/shoaib/app-lab-website/
- iArticle - Resource Platform: https://iarticle-website-frontend-rr4d.vercel.app/
- Intervention - Consultation Site: https://connectifysync.com/shoaib/Intervention-website/
- React Todo App: https://todo-app-react-vite-taillwind.vercel.app/
- Social Media Dashboard: https://social-media-app-orpin-eight.vercel.app/
- Real-time Weather App: https://weather-app-by-js-one.vercel.app/
- Molly Pittman - WordPress Site: https://floralwhite-gnu-194370.hostingersite.com/

Your job is to chat with visitors of the portfolio: answer questions about Shoaib's skills, experience, and projects, help them navigate the site, and generally be a helpful, warm, and concise assistant. If you don't know a specific detail about Shoaib that isn't provided here, be honest and suggest the visitor use the Contact section to reach out directly. Keep replies conversational and reasonably brief.`;

const ALLOWED_ORIGINS = new Set([
  'https://shoaibahmed-dev.vercel.app',
]);

function isAllowedOrigin(origin) {
  if (!origin) return false;
  if (ALLOWED_ORIGINS.has(origin)) return true;
  if (/^http:\/\/localhost(:\d+)?$/.test(origin)) return true;
  return false;
}

function corsHeaders(origin) {
  const headers = {
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    Vary: 'Origin',
  };
  if (isAllowedOrigin(origin)) {
    headers['Access-Control-Allow-Origin'] = origin;
  }
  return headers;
}

function jsonResponse(body, status, headers) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...headers },
  });
}

// Best-effort in-memory rate limiter. Resets whenever the edge instance recycles,
// which is an acceptable tradeoff for deterring casual abuse on a low-traffic portfolio.
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 10;
const requestLog = new Map();

function isRateLimited(key) {
  const now = Date.now();
  const timestamps = (requestLog.get(key) || []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  timestamps.push(now);
  requestLog.set(key, timestamps);
  return timestamps.length > RATE_LIMIT_MAX_REQUESTS;
}

const MAX_MESSAGE_LENGTH = 500;
const MAX_HISTORY_MESSAGES = 10;

export default async function handler(request) {
  const origin = request.headers.get('origin');
  const headers = corsHeaders(origin);

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers });
  }

  if (request.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, 405, headers);
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return jsonResponse({ error: 'Server is not configured with an API key' }, 500, headers);
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (isRateLimited(ip)) {
    return jsonResponse(
      { error: 'Too many messages, please slow down and try again in a minute.' },
      429,
      headers,
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: 'Invalid JSON body' }, 400, headers);
  }

  const { messages } = body || {};
  if (!Array.isArray(messages) || messages.length === 0) {
    return jsonResponse({ error: 'Request must include a non-empty "messages" array' }, 400, headers);
  }

  const sanitizedMessages = messages
    .filter((m) => m && typeof m.content === 'string' && (m.role === 'user' || m.role === 'assistant'))
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_MESSAGE_LENGTH) }))
    .slice(-MAX_HISTORY_MESSAGES);

  if (sanitizedMessages.length === 0) {
    return jsonResponse({ error: 'No valid messages provided' }, 400, headers);
  }

  let anthropicResponse;
  try {
    anthropicResponse = await fetch('https://api.anthropic.com/v1/messages', {
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
        stream: true,
      }),
    });
  } catch {
    return jsonResponse({ error: 'Failed to reach the assistant service' }, 502, headers);
  }

  if (!anthropicResponse.ok || !anthropicResponse.body) {
    let message = 'Failed to get a response from the assistant';
    try {
      const errData = await anthropicResponse.json();
      message = errData?.error?.message || message;
    } catch {
      // response body wasn't JSON; keep the generic message
    }
    return jsonResponse({ error: message }, anthropicResponse.status || 502, headers);
  }

  const decoder = new TextDecoder();
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const reader = anthropicResponse.body.getReader();
      let buffer = '';

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop();

          for (const line of lines) {
            if (!line.startsWith('data: ')) continue;
            const data = line.slice(6).trim();
            if (!data || data === '[DONE]') continue;

            try {
              const parsed = JSON.parse(data);
              if (parsed.type === 'content_block_delta' && parsed.delta?.text) {
                controller.enqueue(encoder.encode(parsed.delta.text));
              }
            } catch {
              // ignore malformed SSE chunk
            }
          }
        }
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache',
      ...headers,
    },
  });
}
