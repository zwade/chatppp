import { $effect, $state } from "@effectualjs/reconciler";
import { loadChat } from "./Api.js";
import { Conversation } from "./hooks.js";
import { F } from "@effectualjs/core";
import { Poster } from "./Poster.js";
import { ChatPreview } from "./ChatPreview.js";

export interface Props {
    matches: Record<string, string | null>;
}

export const Share = (props: Props) => {
    const conversation = $state<Conversation | null>(null);
    const id = props.matches.id as string;

    $effect((id) => {
        loadChat(id).then((chat) => {
            conversation.setValue(chat);
        });
    }, [id]);

    if (!conversation.value) {
        return (
            <Poster $slot:title="">
                Loading...
            </Poster>
        );
    }

    return (
        <Poster $slot:title={`Wanted: ${ conversation.value.name }`}>
            <ChatPreview conversation={conversation.value} />
        </Poster>
    );
}