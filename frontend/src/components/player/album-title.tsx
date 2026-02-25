type AlbumTitleProps = {
  name: string;
};

export const AlbumTitle = ({ name }: AlbumTitleProps) => {
  return (
    <div className="title">
      <span className="decorative-letter">{name.charAt(0)}</span>
      <span className="title-text">{name.substring(1)}</span>
    </div>
  );
};
