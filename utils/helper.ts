export function convertTimeToSeconds(timeString: string): number {
	const [minutes, seconds] = timeString.split(":").map(Number);

	const totalSeconds = minutes * 60 + seconds;

	// If either `minutes` or `seconds` is NaN, the result will be NaN.
	return isNaN(totalSeconds) ? 0 : totalSeconds;
}
