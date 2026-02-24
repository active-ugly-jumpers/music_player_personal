import { useEffect, useState } from "react";
import { fetchLabels } from "../gonic/api";
import type { LabelsMap } from "../gonic/types";

let cachedLabels: LabelsMap | null = null;

export const useLabels = () => {
    const [labels, setLabels] = useState<LabelsMap>(cachedLabels ?? {});
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (cachedLabels) return;

        const fetchData = async () => {
            try {
                const data = await fetchLabels();
                cachedLabels = data;
                setLabels(data);
            } catch (err) {
                setError(err as Error);
            }
        };
        fetchData();
    }, []);

    return { labels, error };
};