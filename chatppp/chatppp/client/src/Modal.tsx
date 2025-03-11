import { F } from "@effectualjs/core";
import "./Modal.css";
import { Icon } from "./Icon.js";

export interface Props {
    open: boolean;
}

export interface Ctx {
    emits: {
        close: () => void;
    },
    slots: {
        title: F.Element;
    }
}

export const Modal = (props: Props, ctx: Ctx) => {
    if (!props.open) {
        return null;
    }

    const close = () => {
        ctx.emits.close();
    }

    return (
        <portal element={document.getElementById("modal-root")}>
            <div class="modal-container">
                <div class="modal-backdrop" $on:click={close} />
                <div class="modal-inner">
                    <div class="modal-header">
                        <div class="modal-title">{ctx.slots.title}</div>

                        <Icon class="modal-close" $on:click={close} name="close"/>
                    </div>

                    <div class="modal-body">
                        <slot/>
                    </div>
                </div>
            </div>
        </portal>
    )
}