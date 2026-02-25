import { useState } from "react";
import { useArtists } from "../../hooks/useArtists";
import { useAlbums } from "../../hooks/useAlbums";
import { fetchArtistAlbums } from "../../gonic/api";
import { AlbumItem } from "./album-item";
import { type ListProps } from "./types";

export const ArtistsList = ({ onAlbumSelect }: ListProps) => {
  const { albums } = useAlbums();
  const { artists, error } = useArtists();
  const [activeArtist, setActiveArtist] = useState<string | null>(null);
  const [artistAlbumIds, setArtistAlbumIds] = useState<string[]>([]);

  if (error) return <div>Error: {error.message}</div>;

  async function handleArtistClick(artistId: string) {
    if (activeArtist === artistId) {
      setActiveArtist(null); // Collapse
    } else {
      const ids = await fetchArtistAlbums(artistId);
      setArtistAlbumIds(ids);
      setActiveArtist(artistId);
    }
  }

  return (
    <ul>
      {Object.entries(artists).map(([id, artist]) => (
        <li key={id}>
          <button
            className="expandable artist"
            aria-selected={activeArtist === id}
            onClick={() => handleArtistClick(id)}
          >
            <div className="info">{artist.name}</div>
            <div className="meta">Albums: {artist.albumCount}</div>
          </button>
          {activeArtist === id && (
            <ul>
              {artistAlbumIds.map((albumId) => {
                return (
                  <AlbumItem
                    key={albumId}
                    album={albums[albumId]}
                    onAlbumSelect={onAlbumSelect}
                  />
                );
              })}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
};
