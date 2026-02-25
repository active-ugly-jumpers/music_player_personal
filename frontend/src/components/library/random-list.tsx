import { useAlbums } from "../../hooks/useAlbums";
import { AlbumItem } from "./album-item";
import { type ListProps } from "./types";

export const RandomList = ({ selectedAlbum, onAlbumSelect }: ListProps) => {
  const { albums, error } = useAlbums();
  if (error) return <div>Error: {error.message}</div>;

  // Get random n albums
  const n = 10;
  const allEntries = Object.entries(albums);
  const randomAlbums = allEntries.sort(() => Math.random() - 0.5).slice(0, n);

  return (
    <ul>
      {randomAlbums.map(([id, album]) => (
        <AlbumItem
          key={id}
          album={album}
          selected={selectedAlbum === id}
          onAlbumSelect={onAlbumSelect}
        />
      ))}
    </ul>
  );
};
