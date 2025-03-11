import { F, AssignableStore } from "@effectualjs/core";
import { $provideMessageLog, ModelConfig } from "./hooks.js";
import { Message } from "./Message.js";
import { TextInput } from "./TextInput.js";

const TextBox = new AssignableStore("");

export interface ChatProps {
    name: string;
    config: ModelConfig;
}

export const Chat = (props: ChatProps) => {
    const textBox = TextBox.$provide();
    const { messages, sendMessage } = $provideMessageLog(props.name, props.config);
    console.log("Rerendered chat");

    const onSubmit = () => {
        sendMessage(textBox.value);
        textBox.setValue("");
    }

    return (
        <div>
            { messages.messages.map((msg, i) => (
                <Message key={i} {...msg} />
            )) }
            <ChatInput $on:submit={onSubmit} />
        </div>
    );
}

interface ChatInputCtx {
    emits: {
        submit: () => void;
    }
}

export const ChatInput = (_props: {}, ctx: ChatInputCtx) => {
    console.log("Rerendered chat input");
    const [value, setValue] = TextBox.$use();

    return (
        <div>
            <TextInput
                value={value}
                $on:change={setValue}
                $on:submit={() => ctx.emits.submit()}
            />
            <button $on:click={() => ctx.emits.submit()}>Submit</button>
        </div>
    )
}