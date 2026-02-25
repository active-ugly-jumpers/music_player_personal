import { useAlbums } from "../../hooks/useAlbums";
import { type PlayerProps } from "./types";
import { fetchAlbumLabel } from "../../gonic/api";

export const Player = ({ albumId = null }: PlayerProps) => {
  const { albums } = useAlbums();
  const album = !albumId ? null : albums[albumId];

  return (
    <>
      {!album ? (
        <div className="placeholder">select an album</div>
      ) : (
        <div className="player-content">
          <div className="album-info">{album.name}</div>
          <div className="track-list"></div>
        </div>
      )}
    </>
  );
};
