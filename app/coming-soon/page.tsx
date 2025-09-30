export const metadata = {
  title: "Fynorra Platform — Coming Soon",
  description: "Launching soon: Fynorra’s next-gen AI platforms (Creator Studio, Agents, Voice APIs). Join the waitlist for early access.",
};

export default function ComingSoonPage() {
  return (
    <main>
      <h1>Fynorra Platform — Coming Soon</h1>
      <p>
        We’re building something powerful: AI agents, creator studio, voice infrastructure, and more.
        Join our waitlist to be first in line for early access and beta launches.
      </p>

      <form action="/api/subscribe-waitlist" method="post">
        <input
          type="email"
          name="email"
          placeholder="Your email address"
          required
          className="border px-3 py-2 rounded-md"
        />
        <button type="submit" className="ml-2 px-4 py-2 bg-primary text-white rounded-md">
          Join Waitlist
        </button>
      </form>

      <h2>Platform Roadmap</h2>
      <ul>
        <li>Creator AI Studio – YouTube & Social Automation</li>
        <li>Agents Platform – deployable AI agents</li>
        <li>Enterprise RAG-as-a-Service</li>
        <li>Voice API & branded voice infrastructure</li>
        <li>AI Template Marketplace</li>
      </ul>

      <p>Stay tuned — big things are coming.</p>
    </main>
  );
}
