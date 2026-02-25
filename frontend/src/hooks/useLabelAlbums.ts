import { fetchLabelAlbums } from "../gonic/api";

type LabelAlbumsCache = {
    labelToAlbums: Record<string, string[]>;
    albumToLabel: Record<string, string>;
};

const cache: LabelAlbumsCache = {
    labelToAlbums: {},
    albumToLabel: {},
};

export const useLabelAlbums = () => {
    // Fetch album IDs for a label, with caching
    const getLabelAlbums = async (labelId: string): Promise<string[]> => {
        if (cache.labelToAlbums[labelId]) return cache.labelToAlbums[labelId];

        const albumIds = await fetchLabelAlbums(labelId);
        cache.labelToAlbums[labelId] = albumIds;
        albumIds.forEach((id) => (cache.albumToLabel[id] = labelId));
        return albumIds;
    };

    // Get label ID for an album (from cache only)
    const getAlbumLabel = (albumId: string): string | null => {
        return cache.albumToLabel[albumId] || null;
    };

    return { getLabelAlbums, getAlbumLabel };
};