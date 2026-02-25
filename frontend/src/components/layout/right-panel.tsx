import { PlayerDisplay } from "../player/player-display";

type RightPanelProps = {
  album?: string | null;
};

export const RightPanel = ({ album = null }: RightPanelProps) => {
  return (
    <section className="player">
      <PlayerDisplay album={album} />
    </section>
  );
};
