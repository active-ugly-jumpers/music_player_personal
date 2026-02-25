import { useEffect, useState } from "react";
import { useAlbums } from "../../hooks/useAlbums";
import { useLabels } from "../../hooks/useLabels";
import { type PlayerProps } from "./types";
import { fetchAlbumLabel, getCoverArtUrl } from "../../gonic/api";
import { PlayButton } from "./play-button";
import { AlbumTitle } from "./album-title";

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export const Player = ({ albumId = null }: PlayerProps) => {
  const { albums } = useAlbums();
  const { labels } = useLabels();
  const [labelId, setLabelId] = useState<string | null>(null);

  const album = !albumId ? null : albums[albumId];
  const label = labelId ? labels[labelId].name : "";
  useEffect(() => {
    if (!albumId) return;

    fetchAlbumLabel(albumId).then(setLabelId);
  }, [albumId]);
  return (
    <>
      {!album ? (
        <div className="placeholder">select an album</div>
      ) : (
        <div className="player-content">
          <div className="album-header">
            <div className="cover">
              <img
                src={getCoverArtUrl(album.coverArt) ?? undefined}
                alt={album.name}
              />
            </div>
            <div className="content">
              <div className="details">
                <AlbumTitle name={album.name} />
                <div className="artists">
                  {album.artists.map((artist) => artist.name).join(" ")}
                </div>
                <div className="meta">
                  {album.year} [{label}] {formatDuration(album.duration)}
                </div>
              </div>
              <div className="controls">
                <PlayButton />
              </div>
            </div>
          </div>
          <div className="track-list">Track list here</div>
        </div>
      )}
    </>
  );
};
