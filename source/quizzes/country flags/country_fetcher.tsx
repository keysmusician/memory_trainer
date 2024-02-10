import { ResponseFetcherProps } from "../../quiz";
import { EnumFetcher } from "../../user input fetchers/enum fetcher";
import { Setter } from "solid-js";

/**
 * Fetches a country.
 */
interface CountryFetcherProps extends ResponseFetcherProps<
    string,
    URL,
    string
> {
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
            <EnumFetcher<string, URL, string> {...props} sort />
        </>
    )
}
