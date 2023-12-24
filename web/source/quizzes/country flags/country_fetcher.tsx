import { IQuiz, ResponseFetcherProps } from "../../quiz";
import { country_flags } from "./country_flags";
import { enum_fetcher } from "../../user_input_fetchers/enum_fetcher";
import { Setter } from "solid-js";

/**
 * Fetches a country.
 */
interface CountryFetcherProps extends ResponseFetcherProps<string> {
    quiz?: IQuiz<URL, string, string>
    setResponse: Setter<string>
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
                onChange={(event) => {
                    props.setResponse(event.target.value)
                    event.currentTarget.value = ''
                }}
                style={{ width: "100%" }}
            />
            <EnumFetcher
                items={country_flags_items}
                setResponse={props.setResponse}
            />
        </>
    )
}
