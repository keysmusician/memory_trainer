import { Quiz, ResponseFetcherProps } from "../quizzes";
import { country_flags } from "../answer_keys/country_flags";
import { enum_fetcher } from "./enum_fetcher";
import { Setter } from "solid-js";

/**
 * Fetches a country.
 */
interface CountryFetcherProps extends ResponseFetcherProps<string> {
    quiz?: Quiz<URL, string, string>
    set_response: Setter<string>
}
export function country_fetcher(props: CountryFetcherProps) {
    const EnumFetcher = enum_fetcher<string>;
    const country_flags_items = Array.from(
        (props.quiz?.answer_key ?? country_flags).values()
    ).sort();
    return (
        <>
            <input
                type="text"
                placeholder="Country"
                onChange={(event) => { props.set_response(event.target.value) }}
                style={{ width: "100%" }}
            />
            <EnumFetcher
                items={country_flags_items}
                set_response={props.set_response}
            />
        </>
    )
}
