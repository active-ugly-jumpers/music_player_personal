import md5 from "md5";

const GONIC_USER = import.meta.env.VITE_GONIC_USER
const GONIC_PASS = import.meta.env.VITE_GONIC_PASS
const GONIC_URL = import.meta.env.VITE_GONIC_URL
const API_VERSION = "1.16.1"
const CLIENT_NAME = "musicplayer"

function generateSalt(length: number = 8): string {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const randomValues = new Uint8Array(length);
    crypto.getRandomValues(randomValues);

    return Array.from(randomValues)
        .map(val => chars[val % chars.length])
        .join('');
}

type SubsonicParams = Record<string, string | number>;
const buildUrl = (method: string, params: SubsonicParams = {}) => {
    const url = new URL(method, `${GONIC_URL}/rest/`);
    const salt = generateSalt();
    const token = md5(GONIC_PASS + salt);

    // Standard auth params
    url.searchParams.append('u', GONIC_USER);
    url.searchParams.append('t', token);
    url.searchParams.append('s', salt);
    url.searchParams.append('v', API_VERSION);
    url.searchParams.append('c', CLIENT_NAME);
    url.searchParams.append('f', 'json');

    // Additional params
    for (const key in params) {
        url.searchParams.append(key, String(params[key]))
    }

    return url;
}

export const createGonicClient = () => {
    async function request<T>(method: string, params: SubsonicParams = {}): Promise<T> {
        const url = buildUrl(method, params)
        const response = await fetch(url)

        if (!response.ok) {
            throw new Error(`Gonic API Error: ${response.status} on ${method}`)
        }

        const data = await response.json()
        if (data["subsonic-response"]?.status === "failed") {
            throw new Error(`Gonic API Failed: ${data["subsonic-response"].error?.message || "Unknown error"}`)
        }

        return data
    }

    function getCoverArtUrl(coverArtId: string, size?: number): string | null {
        return buildUrl("getCoverArt", { id: coverArtId, ...(size && { size }) }).toString();
    }

    function getStreamUrl(trackId: string): string {
        return buildUrl("stream", { id: trackId, format: "raw" }).toString();
    }

    return { request, getCoverArtUrl, getStreamUrl }
}