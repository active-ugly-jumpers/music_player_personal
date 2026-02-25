type PlayerDisplayProps = {
  album?: string | null;
};

export const PlayerDisplay = ({ album = null }: PlayerDisplayProps) => {
  return (
    <>
      {!album ? (
        <div className="placeholder">select an album</div>
      ) : (
        <div>{album}</div>
      )}
    </>
  );
};
