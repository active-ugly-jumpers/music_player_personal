import { type Album } from "../../gonic/types";

type AlbumItemProps = {
  album: Album;
  onAlbumSelect: (albumId: string) => void;
};

export const AlbumItem = ({ album, onAlbumSelect }: AlbumItemProps) => {
  return (
    <li>
      <button className="album" onClick={() => onAlbumSelect(album.id)}>
        <div className="info">
          <div className="name">{album.name}</div>
          <div className="artists">
            {album.artists.map((artist) => artist.name).join(", ")}
          </div>
        </div>
        <div className="meta">{album.year}</div>
      </button>
    </li>
  );
};
