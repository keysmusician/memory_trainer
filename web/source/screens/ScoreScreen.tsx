import { useScreen } from "../App"


export function ScoreScreen() {
    const [, setScreen] = useScreen()!;

    return (
        <>
            <h2>Complete!</h2>

            <button
                onClick={() => setScreen('Start')}
            >
                Restart
            </button>
        </>
    )
}
