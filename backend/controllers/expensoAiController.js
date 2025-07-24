const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const expenoAIChatBot = async (req, res) => {
  try {
    const { query } = req.body;
    // console.log("🟢 Received query:", query);

    if (!query) {
      return res.status(400).json({ error: "Query is required." });
    }

    const prompt = `
You are Expenso AI – a helpful assistant that only answers questions related to expense management. 
Ignore any unrelated queries. Only help users with personal expense tracking, budgeting, saving tips, 
spending categories, or analyzing their expense patterns.

User's Question: "${query}"
`;

    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    // console.log("🧠 Gemini Response:", JSON.stringify(result, null, 2));

    
    const responseText = result.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!responseText) {
      return res.status(500).json({ error: "No response from AI." });
    }

    res.status(200).json({ reply: responseText });
  } catch (error) {
    console.error("🔥 AI Error:", error);
    res.status(500).json({ error: "Something went wrong with Expenso AI." });
  }
};

module.exports = {
  expenoAIChatBot,
};
