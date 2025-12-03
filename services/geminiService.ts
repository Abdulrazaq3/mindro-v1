import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateResponse = async (prompt: string, language: 'en' | 'ar'): Promise<string> => {
  if (!apiKey) {
    return "API Key is missing. Please check configuration.";
  }

  try {
    const modelId = 'gemini-2.5-flash';
    const systemInstruction = language === 'en' 
      ? "You are Mindro-V1, an empathetic, calm, and helpful AI assistant designed to support individuals with early-stage Alzheimer's. Keep responses concise, clear, and reassuring. Avoid complex jargon."
      : "أنت Mindro-V1، مساعد ذكاء اصطناعي متعاطف وهادئ ومفيد مصمم لدعم الأفراد المصابين بمرض الزهايمر في مراحله المبكرة. حافظ على الإجابات موجزة وواضحة ومطمئنة. تجنب المصطلحات المعقدة.";

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    return response.text || (language === 'en' ? "I'm having trouble thinking right now." : "أواجه مشكلة في التفكير الآن.");
  } catch (error) {
    console.error("Gemini API Error:", error);
    return language === 'en' 
      ? "I am currently offline. Please check your connection."
      : "أنا غير متصل حاليًا. يرجى التحقق من اتصالك.";
  }
};