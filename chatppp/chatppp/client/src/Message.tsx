import { F } from "@effectualjs/core";
import { $effect } from "@effectualjs/reconciler";
import { Markdown } from "./Markdown.js";

export interface MessageProps {
    body: string;
    timestamp: string;
    origin: "user" | "bot";
}

export const Message = (props: MessageProps) => {
    const formattedTime = $effect((timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString(undefined, {
            month: "long",
            day: "numeric",
            hour12: true,
            hour: "numeric",
            minute: "numeric",
        });
    }, [props.timestamp]);

    return (
        <div class="message">
            <div class="message-time">{formattedTime}</div>
            <div class="message-body"><Markdown body={props.body} /></div>
        </div>
    )
}