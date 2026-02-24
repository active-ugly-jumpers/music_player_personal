import { useAlbums } from "../../hooks/useAlbums";
import { AlbumItem } from "./album-item";

export const AlbumsList = () => {
  const { albums, error } = useAlbums();
  if (error) return <div>Error: {error.message}</div>;

  return (
    <ul>{Object.entries(albums).map(([id, album]) => AlbumItem(album))}</ul>
  );
};
