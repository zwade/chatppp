import { F, Store } from "@effectualjs/core";

import { Main } from "./Main.js";

import "./index.css";
import { $provideRouter } from "./hooks.js";
import { Router } from "./Router.js";
import { Share } from "./Share.js";

export interface Props {}

export const Count = Store.create(0);

export const App = (props: Props) => {
    $provideRouter();

    return (
        <Router routes={[
            { path: "/", component: Main },
            { path: "/share/:id", component: Share },
        ]} />
    );
};
