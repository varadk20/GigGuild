// src/AiHelper.js
const axios = require("axios");

// Function to get suggestions from OpenAI using axios
const getSuggestions = async (input) => {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        model: "text-davinci-003",  // Specify model
        prompt: `Provide suggestions or related content for: "${input}".`,
        max_tokens: 100,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error("Error calling OpenAI:", error);
    throw new Error("Failed to fetch suggestions from OpenAI.");
  }
};

module.exports = { getSuggestions };
