import { F } from "@effectualjs/core";
import "./Button.css";

export interface Props {

}

export interface Ctx {
    emits: {
        click?: () => void;
    }
}

export const Button = (props: Props, ctx: Ctx) => {
    return (
        <button
            class="button"
            $on:click={ctx.emits.click}
        >
            <slot/>
        </button>
    );
}