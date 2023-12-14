import { useNavigate } from "@solidjs/router"
import { AppNavigator, routes } from "../App"


export function ScoreScreen() {
    const navigate = useNavigate() as AppNavigator

    return (
        <>
            <h2>Complete!</h2>

            <button
                onClick={() => navigate(routes.start)}
            >
                Restart
            </button>
        </>
    )
}
