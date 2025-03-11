import { Conversation, ModelConfig } from "./hooks.js";

export const progressChat = async (conversation: Conversation, config: ModelConfig): Promise<Conversation> => {
    const response = await fetch("/api/chat/advance", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ conversation, config }),
    });

    if (!response.ok) {
        throw new Error("Failed to advance conversation");
    }

    return await response.json();
}