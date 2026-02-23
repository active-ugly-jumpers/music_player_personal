import { createGonicClient } from "./client";
import type { LabelsMap, GonicIndexesResponse, GonicIndex } from './types';

const client = createGonicClient();

export const fetchLabels = async (): Promise<LabelsMap> => {
    const data = await client<GonicIndexesResponse>("getIndexes");
    const labels = data["subsonic-response"]?.indexes?.index
        ?.flatMap((index: GonicIndex) => index.artist)
        .map(({ id, name, albumCount }) => [id, { name, albumCount }]) ?? [];

    return Object.fromEntries(labels);
};
