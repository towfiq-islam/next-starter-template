export function setItem(key, value) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}

export function getItem(key) {
  if (typeof window === "undefined") return undefined;
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : undefined;
}

export function removeItem(key) {
  if (typeof window === "undefined") return;
  localStorage.removeItem(key);
}
