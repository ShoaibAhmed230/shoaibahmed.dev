import { SiReact, SiNextdotjs, SiWordpress, SiClaude } from 'react-icons/si'

// Each line is a list of [text, colour class] tokens.
const LINES = [
  [['const ', 'tk-key'], ['developer', 'tk-var'], [' = {', 'tk-punc']],
  [['  name', 'tk-prop'], [': ', 'tk-punc'], ['"Shoaib Ahmed"', 'tk-str'], [',', 'tk-punc']],
  [['  role', 'tk-prop'], [': ', 'tk-punc'], ['"AI-Powered Web Developer"', 'tk-str'], [',', 'tk-punc']],
  [['  stack', 'tk-prop'], [': [', 'tk-punc'], ['"React"', 'tk-str'], [', ', 'tk-punc'], ['"Next.js"', 'tk-str'], [', ', 'tk-punc'], ['"WordPress"', 'tk-str'], ['],', 'tk-punc']],
  [['  aiTools', 'tk-prop'], [': [', 'tk-punc'], ['"Claude MCP"', 'tk-str'], [', ', 'tk-punc'], ['"Claude Code"', 'tk-str'], ['],', 'tk-punc']],
  [['  experience', 'tk-prop'], [': ', 'tk-punc'], ['"5+ years"', 'tk-str'], [',', 'tk-punc']],
  [['  available', 'tk-prop'], [': ', 'tk-punc'], ['true', 'tk-bool'], [',', 'tk-punc']],
  [['};', 'tk-punc']],
];

const START_DELAY = 900; // ms, after the card has revealed
const CHAR_MS = 28;

// Precompute per-line length and start delay so lines type one after another.
let elapsed = START_DELAY;
const TIMED_LINES = LINES.map((tokens) => {
  const chars = tokens.reduce((n, [text]) => n + text.length, 0);
  const line = { tokens, chars, delay: elapsed, duration: chars * CHAR_MS };
  elapsed += line.duration + 120;
  return line;
});
const CARET_DELAY = elapsed;

const BADGES = [
  { label: 'React', Icon: SiReact, color: '#61dafb', className: 'badge-pos-1 animate-float-slow' },
  { label: 'Next.js', Icon: SiNextdotjs, color: 'currentColor', className: 'badge-pos-2 animate-float-fast' },
  { label: 'WordPress', Icon: SiWordpress, color: '#21759b', className: 'badge-pos-3 animate-float-fast' },
  { label: 'Claude MCP', Icon: SiClaude, color: '#d97757', className: 'badge-pos-4 animate-float-slow' },
];

export const HeroCodeCard = () => (
  <div className="code-card-wrap">
    <div className="code-card-glow" aria-hidden="true" />

    <div className="code-card" role="img" aria-label="Code snippet describing Shoaib Ahmed: AI-Powered Web Developer working with React, Next.js, WordPress and Claude MCP, 5+ years of experience, available for work.">
      <div className="code-card-bar">
        <span className="dot bg-[#ff5f57]" />
        <span className="dot bg-[#febc2e]" />
        <span className="dot bg-[#28c840]" />
        <span className="code-card-file">shoaib.config.js</span>
      </div>

      <pre className="code-card-body" aria-hidden="true">
        {TIMED_LINES.map((line, i) => (
          <div key={i} className="code-line">
            <span className="code-ln">{i + 1}</span>
            <span
              className="code-type"
              style={{
                '--chars': line.chars,
                '--delay': `${line.delay}ms`,
                '--dur': `${line.duration}ms`,
              }}
            >
              {line.tokens.map(([text, cls], j) => (
                <span key={j} className={cls}>{text}</span>
              ))}
            </span>
          </div>
        ))}
        <div className="code-line">
          <span className="code-ln">{TIMED_LINES.length + 1}</span>
          <span className="code-caret" style={{ '--delay': `${CARET_DELAY}ms` }} />
        </div>
      </pre>
    </div>

    {BADGES.map((badge) => (
      <span key={badge.label} className={`tech-badge flex items-center gap-2 ${badge.className}`} aria-hidden="true">
        <badge.Icon style={{ color: badge.color }} className="text-base" />
        {badge.label}
      </span>
    ))}
  </div>
);
