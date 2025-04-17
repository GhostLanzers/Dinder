require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
app.use(express.json());

// Get your Gemini API key from environment variables
const GEMINI_API_KEY = process.env.API_KEY;
const corsOptions = {
  origin: "http://localhost:5173", 
  methods: "GET,POST", 
  allowedHeaders: ["Content-Type", "Authorization"], 
};

// Use CORS middleware with specified options
app.use(cors(corsOptions));
app.post("/generate-profile", async (req, res) => {
  const { answers = {}, photos = [] } = req.body;

  // Construct the prompt based on user inputs
  let prompt = `You are an Ai model that generates the dating profile description using QA answers provided and image file names.
   Atleast one image file name is provided. if the image name is too generic create a random dating profile description.
   Dont give extra info other than the description in 100 words. Dont provide your thinking. Just output the description.
   Now Create a dating profile description.`;

  if (Object.keys(answers).length > 0) {
    prompt += " The user provided the following answers: ";
    for (const [question, answer] of Object.entries(answers)) {
      prompt += `${question}: ${answer}. `;
    }
  }

  if (photos.length > 0) {
    prompt += " The user has uploaded photos. with file names as";
   photos.map((photo)=>{
    prompt+=photo
   }) 
  }

  try {
   
    const endpoint =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" +
      GEMINI_API_KEY;
    const response = await axios.post(
      endpoint,
      {
        contents: [{ parts: [{ text: prompt }] }],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    

    res.json({profileDescription:response.data.candidates[0].content.parts[0].text});
  } catch (error) {
    console.error("Error generating profile:", error);
    res.status(500).json({ error: "Failed to generate profile description." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
