import { Player } from "../player/player";
import { type PlayerProps } from "../player/types";

export const RightPanel = ({ albumId = null }: PlayerProps) => {
  return (
    <section className="player">
      <Player albumId={albumId} />
    </section>
  );
};
