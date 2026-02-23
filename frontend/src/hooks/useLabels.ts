import { useEffect, useState } from "react";
import { fetchLabels } from "../gonic/api";
import type { LabelsMap } from "../gonic/types";

export const useLabels = () => {
    const [labels, setLabels] = useState<LabelsMap>({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchLabels();
                setLabels(data);
            } catch (err) {
                setError(err as Error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    return { labels, isLoading, error };
};