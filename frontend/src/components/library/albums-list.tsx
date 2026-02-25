import { useAlbums } from "../../hooks/useAlbums";
import { AlbumItem } from "./album-item";
import { type ListProps } from "./types";

export const AlbumsList = ({ selectedAlbum, onAlbumSelect }: ListProps) => {
  const { albums, error } = useAlbums();
  if (error) return <div>Error: {error.message}</div>;

  return (
    <ul>
      {Object.entries(albums).map(([id, album]) => (
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
