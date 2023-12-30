import { IQuiz, ResponseFetcherProps } from "../../quiz";
import { EnumFetcher } from "../../user_input_fetchers/enum fetcher";
import { Setter } from "solid-js";

/**
 * Fetches a country.
 */
interface CountryFetcherProps extends ResponseFetcherProps<string> {
    quiz?: IQuiz<URL, string, string>
    setResponse: Setter<string>
}
export function CountryFetcher(props: CountryFetcherProps) {
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
            <EnumFetcher<string> {...props} sort />
        </>
    )
}
