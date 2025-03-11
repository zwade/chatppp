import { Router } from "express";
import { progressConversation } from "./chat.js";

export const ApiRouter = Router();

ApiRouter.post("/chat/advance", async (req, res) => {
    const { conversation, config } = req.body;
    if (typeof conversation !== "object" || typeof config !== "object") {
        res.status(400).send("Invalid request");
        return;
    }

    const result = await progressConversation(conversation, config);
    res.json(result);
});