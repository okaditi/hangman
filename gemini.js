// const GEMINI_API_KEY = "AIzaSyCLzDJSGvkx2fvcW1zpZ-u9aLmfBn3dWHk";
// const model = "gemini-1.5-pro";

// async function getHindiMovieName() {
//   const prompt = "Give me one popular Hindi movie name (just the title, nothing else). Avoid repeating previously mentioned names.";
//   const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       contents: [{ parts: [{ text: prompt }] }]
//     })
//   });

//   const data = await response.json();
//   const movie = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
//   return movie?.replace(/[^a-zA-Z]/g, '').toLowerCase();
// }
