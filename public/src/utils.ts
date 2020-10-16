export const isInfected = (x: number) => (x > 0 && x < 1);
export const isRecovered = (x: number) => (x >= 1);
export const isSusceptible = (x: number) => (x <= 0);
