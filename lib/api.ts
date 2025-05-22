// lib/api.ts
export const sendMessageToChatbot = async (message: string) => {
  const response = await fetch("http://localhost:8000/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    throw new Error("Failed to get response from chatbot");
  }

  const data = await response.json();
  return data.response;
};