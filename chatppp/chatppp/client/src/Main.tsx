import { $state, F } from "@effectualjs/core"
import { Modal } from "./Modal.js";
import { Config } from "./Config.js";
import { Icon } from "./Icon.js";

export const Main = () => {
    const configOpen = $state(false);

    const close = () => {
        configOpen.setValue(false);
    }

    return (
        <div class="main">
            <div class="sidebar">
                <Icon name="settings" $on:click={() => configOpen.setValue(true)} size={2.5}/>
            </div>

            <Modal open={configOpen.value} $on:close={close} $slot:title={<div>Settings</div>}>
                <Config $on:close={close} />
            </Modal>
        </div>
    )
}