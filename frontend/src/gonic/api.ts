import { createGonicClient } from "./client";
import { type LabelsMap, type GonicIndexesResponse, type GonicIndex, type ArtistsMap, type GonicArtistsResponse, type AlbumsMap, type GonicAlbumsResponse, type GonicMusicDirectoryResponse, type GonicArtistResponse } from './types';

const client = createGonicClient();

export const fetchLabels = async (): Promise<LabelsMap> => {
    const data = await client.request<GonicIndexesResponse>("getIndexes");

    // Flatten nested index structure and convert to map keyed by ID
    const labels = data["subsonic-response"]?.indexes?.index
        ?.flatMap((index: GonicIndex) => index.artist)
        .map(artist => [artist.id, artist]) ?? [];
    return Object.fromEntries(labels);
};

export const fetchArtists = async (): Promise<ArtistsMap> => {
    const data = await client.request<GonicArtistsResponse>("getArtists");

    // Flatten nested index structure and convert to map keyed by ID
    const artists = data["subsonic-response"]?.artists?.index
        ?.flatMap((index: GonicIndex) => index.artist)
        .map(artist => [artist.id, artist]) ?? [];
    return Object.fromEntries(artists);
};

export const fetchAlbums = async (): Promise<AlbumsMap> => {
    // Fetch all albums with pagination (500 per request)
    const allAlbums = [];
    let offset = 0;
    const size = 500;

    while (true) {
        const data = await client.request<GonicAlbumsResponse>("getAlbumList2", { "type": "newest", "size": size, "offset": offset });
        const batch = data["subsonic-response"]?.albumList2?.album ?? [];
        allAlbums.push(...batch);

        if (batch.length < size) break; // Last page
        offset += size;
    }

    // Convert album array to map keyed by ID
    const albums = allAlbums.map(album => [album.id, album]);
    return Object.fromEntries(albums);
};

// Fetch album IDs for a specific label (music directory)
export const fetchLabelAlbums = async (labelId: string): Promise<string[]> => {
    const data = await client.request<GonicMusicDirectoryResponse>("getMusicDirectory", { "id": labelId });
    return data["subsonic-response"]?.directory?.child?.map(album => album.id) ?? [];
};

// Fetch album IDs for a specific artist
export const fetchArtistAlbums = async (artistId: string): Promise<string[]> => {
    const data = await client.request<GonicArtistResponse>("getArtist", { "id": artistId });
    return data["subsonic-response"]?.artist?.album?.map(album => album.id) ?? [];
};

export const fetchAlbumLabel = async (albumId: string): Promise<string> => {
    const data = await client.request<GonicMusicDirectoryResponse>("getMusicDirectory", { "id": albumId });
    return data["subsonic-response"]?.directory?.parent ?? "";
};

export const getCoverArtUrl = client.getCoverArtUrl;
export const getTrackStreamUrl = client.getStreamUrl;

