import {
    GoogleGenerativeAI,
} from "@google/generative-ai";

const MODEL_NAME = "gemini-1.5-flash";
const API_KEY = ""; 

async function run(prompt) {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME});

    const generationConfig = {
        temperature: 0.9,
        
        maxOutputTokens: 2048,
    };
     
    const chat = model.startChat({
        generationConfig,
        history: [],
    });

    const result = await chat.sendMessage(prompt);
    const response = result.response;
    console.log(response.text());
    return response.text();
} 

export default run;


// import {
//     GoogleGenerativeAI,
// } from "@google/generative-ai";

// const apiKey = "AIzaSyDFlcgYUn-K5v4xiD9ff8rfgx8m5t6GHQY"; // Insert your API key here
// const genAI = new GoogleGenerativeAI(apiKey);

// const modelName = "gemini-1.5-flash"; // Ensure this model name is correct
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
// const generationConfig = {
//     temperature: 1,
//     topP: 0.95,
//     topK: 64,
//     maxOutputTokens: 8192,
//     responseMimeType: "text/plain",
// };

// async function run(prompt) {
//     const chatSession = model.startChatSession({
//         generationConfig,
//         history: [],
//     });

//     const result = await chatSession.sendMessage(prompt);
//     console.log(result.response.text);
// }

// export default run;