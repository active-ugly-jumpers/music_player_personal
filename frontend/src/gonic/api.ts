import { createGonicClient } from "./client";
import { type LabelsMap, type GonicIndexesResponse, type GonicIndex, type ArtistsMap, type GonicArtistsResponse } from './types';

const client = createGonicClient();

export const fetchLabels = async (): Promise<LabelsMap> => {
    const data = await client<GonicIndexesResponse>("getIndexes");

    // Transform nested API response into flat map structure:
    // 1. Extract array of index objects (grouped by first letter)
    // 2. flatMap: flatten all artists from multiple indexes into single array
    // 3. map: transform each artist into [id, {name, albumCount}] tuple
    // 4. Object.fromEntries: convert array of tuples into { id: {name, albumCount} } object
    const labels = data["subsonic-response"]?.indexes?.index
        ?.flatMap((index: GonicIndex) => index.artist)  // [index1.artists[], index2.artists[]] → [artist1, artist2, artist3...]
        .map(({ id, name, albumCount }) => [id, { name, albumCount }]) ?? [];  // artist → [id, {name, albumCount}]
    return Object.fromEntries(labels);  // [[id1, data1], [id2, data2]] → {id1: data1, id2: data2}
};

export const fetchArtists = async (): Promise<ArtistsMap> => {
    const data = await client<GonicArtistsResponse>("getArtists");

    // Transform nested API response into flat map structure (same pattern as fetchLabels):
    const artists = data["subsonic-response"]?.artists?.index
        ?.flatMap((index: GonicIndex) => index.artist)  // [index1.artists[], index2.artists[]] → [artist1, artist2, artist3...]
        .map(({ id, name, albumCount }) => [id, { name, albumCount }]) ?? [];  // artist → [id, {name, albumCount}]
    return Object.fromEntries(artists);  // [[id1, data1], [id2, data2]] → {id1: data1, id2: data2}
}
