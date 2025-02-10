import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";

const models = [
  {
    name: "GPT-4",
    provider: "OpenAI",
    capabilities: "Advanced NLP, multimodal input",
    useCases: "Chatbots, content creation, coding assistance",
    fineTuning: "Available for enterprise users",
  },
  {
    name: "Claude",
    provider: "Anthropic",
    capabilities: "Safety-focused, contextual memory",
    useCases: "AI assistants, legal research, customer service",
    fineTuning: "Limited",
  },
  {
    name: "LLaMA 3",
    provider: "Meta",
    capabilities: "Open-source, efficient on smaller hardware",
    useCases: "Research, on-device AI, experimentation",
    fineTuning: "Fully customizable",
  },
  {
    name: "Mistral",
    provider: "Mistral AI",
    capabilities: "Sparse mixture-of-experts model",
    useCases: "High-performance AI applications",
    fineTuning: "Open-weight access",
  },
  {
    name: "Gemini 1.5",
    provider: "Google DeepMind",
    capabilities: "Multimodal understanding, real-time processing",
    useCases: "Search, AI-powered tools, creative AI",
    fineTuning: "Available via API",
  },
];

export default function LLMModels() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-6">Trending LLM Models</h1>
        <p className="text-lg text-center text-gray-600 mb-10">
          Compare and choose the best AI model for your needs.
        </p>
        
        {/* Comparison Table */}
        <div className="overflow-x-auto mb-12">
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">Model</th>
                <th className="border border-gray-300 px-4 py-2">Provider</th>
                <th className="border border-gray-300 px-4 py-2">Capabilities</th>
                <th className="border border-gray-300 px-4 py-2">Use Cases</th>
                <th className="border border-gray-300 px-4 py-2">Fine-Tuning</th>
              </tr>
            </thead>
            <tbody>
              {models.map((model, index) => (
                <tr key={index} className="text-center border border-gray-300">
                  <td className="border border-gray-300 px-4 py-2 font-semibold">{model.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{model.provider}</td>
                  <td className="border border-gray-300 px-4 py-2">{model.capabilities}</td>
                  <td className="border border-gray-300 px-4 py-2">{model.useCases}</td>
                  <td className="border border-gray-300 px-4 py-2">{model.fineTuning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Individual Model Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {models.map((model, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-2">{model.name}</h2>
              <p className="text-gray-600">{model.provider}</p>
              <p className="text-gray-600 mt-2">{model.capabilities}</p>
              <p className="text-gray-600 mt-2">Use Cases: {model.useCases}</p>
              <p className="text-gray-600 mt-2">Fine-Tuning: {model.fineTuning}</p>
              <Button className="mt-4">Learn More</Button>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}