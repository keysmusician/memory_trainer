import { Quiz, ResponseFetcherProps } from "../quizzes";
import { country_flags } from "../answer_keys/country_flags";
import { enum_fetcher } from "./enum_fetcher";
import { Setter } from "solid-js";

/**
 * Fetches a country.
 */
interface CountryFetcherProps extends ResponseFetcherProps<string> {
    quiz?: Quiz<string>
    set_response: Setter<ResponseType>
}
export function country_fetcher(props: CountryFetcherProps) {
    const EnumFetcher = enum_fetcher<string>;
    return (
        <>
            <input
                type="text"
                placeholder="Country"
                onChange={(event) => { props.set_response(event.target.value) }}
            />
            <EnumFetcher
                items={Array.from(
                    props.quiz ?
                        props.quiz.answer_key.values() :
                        country_flags.values()
                ).sort()}
                set_response={props.set_response}
            />
        </>
    )
}
