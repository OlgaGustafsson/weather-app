
export function convertWindSpeed(speedInMeterPerSecond: number): string {
    const speedInKilometerPerHour = speedInMeterPerSecond * 3.6; // conversion from m/s to km/h
    return `${speedInKilometerPerHour.toFixed(0)}km/h`;
}