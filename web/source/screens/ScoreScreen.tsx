import { Setter } from "solid-js"
import { Screen } from "../App"


interface ScoreScreenProps{
    setScreen: Setter<Screen>
}
export function ScoreScreen(props: ScoreScreenProps) {
    return (
        <>
            <h2>Complete!</h2>

            <button
                onClick={() => props.setScreen('Start')}
            >
                Restart
            </button>
        </>
    )
}
