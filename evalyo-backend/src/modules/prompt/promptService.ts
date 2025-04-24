const sendPrompt = async (context: string) => {
  try {
    console.log("here");
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant that extracts structured information from job descriptions.",
          },
          {
            role: "user",
            content: context,
          },
        ],
      }),
    });
    if (!response.ok) {
      console.error("Error response:", response.statusText);
    }
    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {}
};

export default sendPrompt;
