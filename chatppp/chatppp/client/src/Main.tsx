import { $effect, $state, F } from "@effectualjs/core"
import { Modal } from "./Modal.js";
import { Config } from "./Config.js";
import { Icon } from "./Icon.js";
import { $localStorage, $provideMessageLog, ModelConfig } from "./hooks.js";
import { Chat } from "./Chat.js";

import "./main.css";
import { Poster } from "./Poster.js";

export const Main = () => {
    const { activeConversation, conversations, setIndex } = $provideMessageLog();
    const configOpen = $state(false);
    const [config, setConfig] = $localStorage<Partial<ModelConfig>>("model-config", {})

    const close = () => {
        configOpen.setValue(false);
    }

    $effect(() => {
        if (!config.token) {
            setTimeout(() => configOpen.setValue(true), 1);
        }
    });

    return (
        <div class="main">
            <Poster $slot:title={`Wanted: ${ conversations[activeConversation].name }`}>
                <div class="main-content">
                    <div class="sidebar">
                        <div class="conversation-list">
                            {
                                conversations.map((conversation, i) => (
                                    <div class="conversation-list-item" $on:click={() => setIndex(i)}>
                                        { conversation.name }
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <div class="chat-box">
                        <Chat config={config} />
                    </div>

                    <div class="settings">
                        <Icon name="settings" $on:click={() => configOpen.setValue(true)} size={2.5}/>
                    </div>
                </div>
            </Poster>

            <Modal open={configOpen.value} $on:close={close} $slot:title={<div>Settings</div>}>
                <Config config={config} $on:close={close} $on:configChange={setConfig}/>
            </Modal>
        </div>
    )
}