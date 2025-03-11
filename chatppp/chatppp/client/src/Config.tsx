import { F } from "@effectualjs/core"
import { $localStorage, ModelConfig } from "./hooks.js"
import { TextInput } from "./TextInput.js"

import "./config.css";
import { Button } from "./Button.js";

export interface Ctx {
    emits: {
        close: () => void;
    }
}

export const Config = (_: {}, ctx: Ctx) => {
    const [config, setConfig] = $localStorage<Partial<ModelConfig>>("model-config", {})

    return (
        <div class="config-view">
            <form class="config-form" $on:submit={(e: SubmitEvent) => e.preventDefault()}>
                <TextInput
                    value={config?.endpoint}
                    placeholder="https://api.openai.com/v1/chat/completions"
                    $on:change={(value) => setConfig({ ...config, endpoint: value || undefined})}
                    $slot:label="Endpoint"
                />
                <TextInput
                    value={config?.model}
                    placeholder="gpt-4o-mini"
                    $on:change={(value) => setConfig({ ...config, model: value || undefined})}
                    $slot:label="Model Name"
                />
                <TextInput
                    value={config?.token}
                    placeholder={"sk-proj-...."}
                    $on:change={(value) => setConfig({ ...config, token: value || undefined})}
                    $slot:label="Token"
                />
                <Button
                    $on:click={() => ctx.emits.close()}
                >
                    Save and Close
                </Button>
            </form>
        </div>
    )
}