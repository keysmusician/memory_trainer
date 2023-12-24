import { US_state_capitals } from "../answer_keys/US_state_capitals";
import { ResponseFetcherProps } from "../quizzes/quizzes";
import { enum_fetcher } from "./enum_fetcher"

const EnumFetcher = enum_fetcher<string>;

/**
 * Fetches a state capital.
 */
export function state_capital_fetcher(props: ResponseFetcherProps<string>) {
    return (
        <EnumFetcher
            items={Array.from(US_state_capitals.values()).sort()}
            setResponse={props.setResponse}
        />
    )
}
