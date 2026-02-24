import { type Album } from "../../gonic/types";

export const AlbumItem = (album: Album) => {
  return (
    <li key={album.id}>
      <button className="album">
        <div className="info">
          <div className="name">{album.name}</div>
          <div className="artist">
            {album.artists.map((artist) => artist.name).join(", ")}
          </div>
        </div>
        <div className="meta">{album.year}</div>
      </button>
    </li>
  );
};
