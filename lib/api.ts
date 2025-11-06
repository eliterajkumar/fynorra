// lib/api.ts
export const sendMessageToChatbot = async (message: string) => {
  const response = await fetch("https://c33822360e09.ngrok-free.app/api/query", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: message }),
  });

  if (!response.ok) {
    throw new Error("Failed to get response from chatbot");
  }

  const data = await response.json();
  return data.response;
};