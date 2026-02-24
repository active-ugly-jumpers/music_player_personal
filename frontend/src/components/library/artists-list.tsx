import { useArtists } from "../../hooks/useArtists";

export const ArtistsList = () => {
  const { artists, error } = useArtists();
  if (error) return <div>Error: {error.message}</div>;

  return (
    <ul>
      {Object.entries(artists).map(([id, artist]) => (
        <li key={id}>
          <button>
            <div>{artist.name}</div>
            <div className="meta">Albums: {artist.albumCount}</div>
          </button>
        </li>
      ))}
    </ul>
  );
};
