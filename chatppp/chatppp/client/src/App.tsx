import { F, Store } from "@effectualjs/core";

import { Main } from "./Main.js";

import "./index.css";
import { Bugs } from "./Bugs.js";

export interface Props {}

export const Count = Store.create(0);

export const App = (props: Props) => {
    return (
        <div>
            <Bugs />
            {/* <Main/> */}
        </div>
    );
};
