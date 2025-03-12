import { $effect, F } from "@effectualjs/core";
import { $hashState, Conversation } from "./hooks.js";
import { Message } from "./Message.js";

export interface Props {
    conversation: Conversation;
}

export const ChatPreview = (props: Props) => {
    const hash = $hashState();

    $effect((hash) => {
        const el = document.querySelector(`_chat-${hash}`);
        el?.scrollIntoView({ behavior: "smooth" });
    }, [hash]);

    return (
        <div class="chat-wrapper">
            <div class="chat-messages">
                { props.conversation.messages.map((msg, i) => (
                    <Message key={i} id={`_chat-${i}`} {...msg} />
                )) }
            </div>
        </div>
    );
}