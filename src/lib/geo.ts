export const cityClock = (date = new Date()) => date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
export const distanceBetween = (a: { x: number; z: number }, b: { x: number; z: number }) => Math.hypot(a.x - b.x, a.z - b.z);
export const nearest = <T extends { x: number; z: number }>(origin: { x: number; z: number }, items: T[], limit = 3) => [...items].sort((a, b) => distanceBetween(origin, a) - distanceBetween(origin, b)).slice(0, limit);
