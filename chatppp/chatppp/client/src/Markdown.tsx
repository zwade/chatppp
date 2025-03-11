import { $effect, F } from "@effectualjs/core";

export interface MarkdownProps {
    body: string;
}

export const Markdown = (props: MarkdownProps) => {
    const parsed = $effect((body) => {
        return `Parsed: ${body}`;
    }, [props.body]);

    return <div>{parsed}</div>;
};