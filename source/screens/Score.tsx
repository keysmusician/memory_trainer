import { useNavigate } from "@solidjs/router"
import { AppNavigator, routes } from "../App"
import { style } from "../Style"

export function ScoreScreen() {
    const navigate = useNavigate() as AppNavigator

    return (
        <>
            <h2>Complete!</h2>

            <button
                style={{
                    ...style.group.button,
                }}
                onClick={() => navigate(routes.start)}
            >
                Restart
            </button>
        </>
    )
}
