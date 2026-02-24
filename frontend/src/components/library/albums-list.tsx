import { useAlbums } from "../../hooks/useAlbums";

export const AlbumsList = () => {
  const { albums, error } = useAlbums();
  if (error) return <div>Error: {error.message}</div>;

  return (
    <ul>
      {Object.entries(albums).map(([id, album]) => (
        <li key={id}>
          <button>
            <div>{album.name}</div>
            <div className="meta">{album.year}</div>
          </button>
        </li>
      ))}
    </ul>
  );
};
