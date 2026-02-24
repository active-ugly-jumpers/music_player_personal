import { useState } from "react";
import { useLabels } from "../../hooks/useLabels";
import { useAlbums } from "../../hooks/useAlbums";
import { fetchLabelAlbums } from "../../gonic/api";
import { AlbumItem } from "./album-item";

export const LabelsList = () => {
  const { albums } = useAlbums();
  const { labels, error } = useLabels();
  const [activeLabel, setActiveLabel] = useState<string | null>(null);
  const [labelAlbumIds, setLabelAlbumIds] = useState<string[]>([]);

  if (error) return <div>Error: {error.message}</div>;

  async function handleLabelClick(labelId: string) {
    if (activeLabel === labelId) {
      setActiveLabel(null); // Collapse
    } else {
      const ids = await fetchLabelAlbums(labelId);
      setLabelAlbumIds(ids);
      setActiveLabel(labelId);
    }
  }

  return (
    <ul>
      {Object.entries(labels).map(([id, label]) => (
        <li key={id}>
          <button
            className="expandable"
            aria-selected={activeLabel === id}
            onClick={() => handleLabelClick(id)}
          >
            <div className="info">{label.name}</div>
            <div className="meta">Albums: {label.albumCount}</div>
          </button>
          {activeLabel === id && (
            <ul>
              {labelAlbumIds.map((albumId) => {
                const album = albums[albumId];
                return AlbumItem(album);
              })}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
};
