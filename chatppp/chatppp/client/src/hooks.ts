import { $effect, $state, $watch, Store } from "@effectualjs/reconciler";
import { progressChat } from "./Api.js";

export type StateData<T> = [value: T, setValue: (data: T) => void];

export type MessageContent = {
    body: string;
    timestamp: string;
    origin: "user" | "bot";
}

export type Conversation = {
    name: string;
    messages: MessageContent[];
}

export type ModelConfig = {
    endpoint?: string;
    model?: string;
    token: string;
}

const Conversation = new Store<Conversation>({ name: "<unknown>", messages: [] });

export const $provideMessageLog = (name: string, config: ModelConfig) => {
    const conversation = Conversation.$provide();

    $watch((name) => {
        if (name !== conversation.value.name) {
            conversation.set(({ messages }) => ({ name, messages }));
        }
    }, [name]);

    const sendMessage = (message: string) => {
        const updatedConversation: Conversation = {
            name: conversation.value.name,
            messages: [
                ...conversation.value.messages,
                {
                    body: message,
                    timestamp: new Date().toISOString(),
                    origin: "user"
                }
            ]
        }

        conversation.setValue(updatedConversation);
        progressChat(updatedConversation, config).then((updatedConversation) => {
            conversation.setValue(updatedConversation);
        });
    }

    return {
        messages: conversation.value,
        sendMessage
    };
}

export function $localStorage<T,>(key: string): StateData<T | undefined>;
export function $localStorage<T,>(key: string, defaultValue: T): StateData<T>;
export function $localStorage<T,>(key: string, defaultValue?: T): StateData<T | undefined> {
    const store = $state<T | undefined>(defaultValue);

    $effect(function*() {
        if (localStorage.getItem(key)) {
            // TODO: Make dirtySet generational so i don't need to do this
            setTimeout(() => {
                store.setValue(JSON.parse(localStorage.getItem(key)!));
            }, 1);
        }

        const callback = (e: StorageEvent) => {
            if (e.key !== key) {
                return;
            }

            const value = localStorage.getItem(key);
            if (value) {
                store.setValue(JSON.parse(value));
            } else {
                store.setValue(defaultValue);
            }
        }

        window.addEventListener("storage", callback);
        yield;

        window.removeEventListener("storage", callback);
    });

    const onChange = (value: T) => {
        localStorage.setItem(key, JSON.stringify(value));
        store.setValue(value);
    }

    return [store.value, onChange] as StateData<T | undefined>;
}