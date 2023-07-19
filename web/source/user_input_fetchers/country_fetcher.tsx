import { ResponseFetcherProps } from "../quizzes";
import { country_flags } from "../answer_keys/country_flags";
import { enum_fetcher } from "./enum_fetcher";

/**
 * Fetches a country.
 */
export function country_fetcher(props: ResponseFetcherProps<string>) {
    const EnumFetcher = enum_fetcher<string>;
return (
    <EnumFetcher
        items={Array.from(country_flags.values()).sort()}
        set_response={props.set_response}
    />
)
}
