import { useEffect, useState } from "react";
import { fetchArtists } from "../gonic/api";
import type { ArtistsMap } from "../gonic/types";

let cachedArtists: ArtistsMap | null = null;

export const useArtists = () => {
    const [artists, setArtists] = useState<ArtistsMap>(cachedArtists ?? {});
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (cachedArtists) return;

        const fetchData = async () => {
            try {
                const data = await fetchArtists();
                cachedArtists = data;
                setArtists(data);
            } catch (err) {
                setError(err as Error);
            }
        };
        fetchData();
    }, []);

    return { artists, error };
};