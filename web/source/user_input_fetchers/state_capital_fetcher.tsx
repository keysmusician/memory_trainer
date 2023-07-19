import { US_state_capitals } from "../answer_keys/state_capitals";
import { ResponseFetcherProps } from "../quizzes";
import { enum_fetcher } from "./enum_fetcher"

/**
 * Fetches a state capital.
 */
export function state_capital_fetcher(props: ResponseFetcherProps<string>) {
    const EnumFetcher = enum_fetcher<string>;
    return (
        <EnumFetcher
            items={Array.from(US_state_capitals.values()).sort()}
            set_response={props.set_response}
        />
    )
}
