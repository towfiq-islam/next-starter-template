import { cookies } from "next/headers";

export async function serverApi({
  endpoint,
  mode = "SSG",
  revalidate = 3600,
  tags = [],
}) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`;

  // Get token from cookies
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const fetchOptions =
    mode === "SSR"
      ? { cache: "no-store" }
      : mode === "ISR"
        ? { cache: "force-cache", next: { revalidate, tags } }
        : { cache: "force-cache" };

  try {
    const res = await fetch(url, {
      ...fetchOptions,
      headers: {
        "Content-Type": "application/json",
        ...(token && {
          Authorization: `Bearer ${token}`,
        }),
      },
    });

    if (!res.ok) {
      console.error(
        `[serverApi] Error: ${res.status} ${res.statusText} at ${url}`,
      );
      return null;
    }

    return res.json();
  } catch (err) {
    console.error(`[serverApi] Network Error: ${err.message} at ${url}`);
    return null;
  }
}
