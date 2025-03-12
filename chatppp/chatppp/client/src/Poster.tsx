import { F } from "@effectualjs/core"

import "./Poster.css";

export interface Props {

}

export interface Ctx {
    slots: {
        title: F.Element;
    }
}

export const Poster = (props: Props, ctx: Ctx) => {
    return (
        <div class="poster">
            <div class="poster-content">
                <div class="poster-header">
                    <div class="thumbtack" />
                    <div>ChatPPP</div>
                    <div class="thumbtack" />
                </div>

                <div class="poster-body">
                    <slot />
                </div>

                <div class="poster-title">
                    {ctx.slots.title}
                </div>
            </div>
        </div>
    );
}