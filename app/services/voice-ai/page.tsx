export const metadata = {
  title: "Voice & Speech AI – Fynorra",
  description: "Speech-to-text, text-to-speech, voice cloning & branded voice assistants from Fynorra AI Solutions.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Voice & Speech AI",
  "description": "Fynorra offers STT, TTS, voice cloning, and branded voice AI assistants for seamless voice experiences.",
  "provider": { "@type": "Organization", "name": "Fynorra AI Solutions Pvt Ltd", "url": "https://www.fynorra.com" },
  "url": "https://www.fynorra.com/services/voice-ai"
};

export default function VoiceAIPage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <h1>Voice & Speech AI Solutions</h1>

      <p>
        Enable human-like voice interfaces, transcription, and branded AI voice experiences. Fynorra delivers
        powerful voice & speech AI tools — whether for call centers, virtual agents, or media applications.
      </p>

      <h2>What we offer</h2>
      <ul>
        <li>Speech-to-Text (STT) with high accuracy & low latency</li>
        <li>Text-to-Speech (TTS) with expressive, natural voices</li>
        <li>Voice cloning & custom brand voice creation</li>
        <li>Conversational voice agents and IVR systems</li>
      </ul>

      <h3>Use Cases</h3>
      <ul>
        <li>Call center automation & voice bots</li>
        <li>Podcast narration & voiceovers</li>
        <li>Accessibility & assistive voice tech</li>
        <li>Virtual assistants with custom voices</li>
      </ul>

      <h3>FAQs</h3>
      <dl>
        <dt>Can you clone a voice with few samples?</dt>
        <dd>Yes — we use advanced voice cloning techniques with only minutes of voice data to build realistic models.</dd>

        <dt>Is there language support?</dt>
        <dd>We support multiple languages and accents. Tell us which languages you need — we’ll adapt or train models.</dd>
      </dl>

      <h3>Next step</h3>
      <p>Schedule a demo. Let’s prototype a voice bot or customized voice interface for your product.</p>
      <button>Request a Demo</button>
    </main>
  );
}
