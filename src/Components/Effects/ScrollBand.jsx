const WORDS = ['React', 'Next.js', 'WordPress', 'Technical SEO', 'Tailwind CSS', 'Magento 2', 'AI-Powered', 'Claude MCP'];

const Row = ({ outline }) => (
  <div className={`scroll-band-row ${outline ? 'is-outline' : ''}`}>
    {[...WORDS, ...WORDS, ...WORDS].map((word, i) => (
      <span key={i}>
        {word}
        <i>✦</i>
      </span>
    ))}
  </div>
);

// Two oversized text rows that slide in opposite directions as the page scrolls.
export const ScrollBand = () => (
  <div className="scroll-band" aria-hidden="true">
    <Row />
    <Row outline />
  </div>
);
