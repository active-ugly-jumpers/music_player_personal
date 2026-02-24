import { useEffect, useState } from "react";
import { fetchAlbums } from "../gonic/api";
import type { AlbumsMap } from "../gonic/types";

let cachedAlbums: AlbumsMap | null = null;

export const useAlbums = () => {
    const [albums, setAlbums] = useState<AlbumsMap>(cachedAlbums ?? {});
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (cachedAlbums) return;

        const fetchData = async () => {
            try {
                const data = await fetchAlbums();
                cachedAlbums = data;
                setAlbums(data);
            } catch (err) {
                setError(err as Error);
            }
        };
        fetchData();
    }, []);

    return { albums, error };
};