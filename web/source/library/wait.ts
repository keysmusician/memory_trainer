export async function wait(msec: number) {
    return new Promise((resolve, _) => setTimeout(resolve, msec))
}
