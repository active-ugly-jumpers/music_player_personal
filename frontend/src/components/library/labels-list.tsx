import { useEffect, useState } from "react";
import { fetchLabels } from "../../lib/api";
import type { LabelsMap } from "../../types/gonic";

export const LabelsList = () => {
  const [labels, setLabels] = useState<LabelsMap>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchLabels();
        setLabels(data);
      } catch (error) {
        console.error("Failed to fetch labels:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <ul>
      {Object.entries(labels).map(([id, label]) => (
        <li key={id}>
          <button>
            <div>{label.name}</div>
            <div className="meta">Albums: {label.albumCount}</div>
          </button>
        </li>
      ))}
    </ul>
  );
};
