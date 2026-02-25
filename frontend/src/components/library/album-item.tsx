import { type Album } from "../../gonic/types";

type AlbumItemProps = {
  album: Album;
  onAlbumSelect: (albumId: string) => void;
  selected?: boolean;
};

export const AlbumItem = ({
  album,
  onAlbumSelect,
  selected,
}: AlbumItemProps) => {
  return (
    <li>
      <button
        className="album"
        aria-selected={selected}
        onClick={() => onAlbumSelect(album.id)}
      >
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
