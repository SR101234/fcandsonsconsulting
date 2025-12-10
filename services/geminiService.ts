import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API_KEY is missing from environment variables.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const generateAIResponse = async (userQuery: string): Promise<string> => {
  const ai = getClient();
  if (!ai) return "I'm sorry, I cannot connect to the service right now. Please check the configuration.";

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: userQuery,
      config: {
        systemInstruction: `You are an expert AI Financial Consultant for 'FC and Sons Consulting'. 
        We specialize in:
        1. Mutual Funds
        2. Demat Services
        3. Insurance (Health and Vehicle)
        4. Forex
        5. Custom Duty
        6. Accounting & Taxation
        7. Auditing & Assurance
        8. Real Estate
        9. Bill Discounting
        10. FD and Bonds
        
        Your goal is to answer client questions professionally, briefly (under 100 words), and encourage them to use our contact form for a full consultation.
        Maintain a polite, professional, and wealthy tone.`,
      }
    });
    
    return response.text || "I apologize, I couldn't generate a response at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Our AI assistant is momentarily unavailable. Please try again later.";
  }
};