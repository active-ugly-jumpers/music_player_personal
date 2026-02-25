import { useEffect, useState } from "react";
import { fetchAlbums } from "../gonic/api";
import type { AlbumsMap } from "../gonic/types";


export const useAlbums = () => {
    const [albums, setAlbums] = useState<AlbumsMap>({});
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchAlbums();
                setAlbums(data);
            } catch (err) {
                setError(err as Error);
            }
        };
        fetchData();
    }, []);

    return { albums, error };
};