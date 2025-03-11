export type Message = {
    body: string;
    timestamp: string;
    origin: "user" | "bot";
}

export type Conversation = {
    name: string;
    messages: Message[];
}

export type ModelConfig = {
    endpoint?: string;
    model?: string;
    token: string;
}

const systemPrompt = `You are a chat assistant named Perfectly Practical Phenomena (PPP). You are a ghost who likes haunting people, but you also want to be helpful and answer any questions the user has.`

export const progressConversation = async (conversation: Conversation, config: ModelConfig): Promise<Conversation> => {
    const endpoint = new URL(config.endpoint ?? "https://api.openai.com/v1/chat/completions");
    const model = config.model ?? "gpt-4o-mini";
    const token = config.token;

    // This is not an SSRF problem! I promise!
    if (/localhost|^\d|^\[/.exec(endpoint.hostname)) {
        throw new Error("Invalid endpoint");
    }

    const body = {
        model,
        messages: [
            { role: "system", content: systemPrompt },
            { role: "system", content: `You are now chatting with ${conversation.name}.` },
            ...conversation.messages.map((msg) => ({ role: msg.origin === "user" ? "user" : "assistant" , content: msg.body }))
        ]
    }

    const response = await fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(body),
        redirect: "error",
    });

    const data = await response.json();

    return {
        name: conversation.name,
        messages: [
            ...conversation.messages,
            {
                body: data.choices[0].message.content,
                timestamp: new Date().toISOString(),
                origin: "bot"
            }
        ]
    }
}