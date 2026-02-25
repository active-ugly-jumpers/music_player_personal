import { useState } from "react";
import { LeftPanel } from "./left-panel";
import { RightPanel } from "./right-panel";

export const AppLayout = () => {
  const [selectedAlbum, setSelectedAlbum] = useState<string | null>(null);
  return (
    <>
      <header>listening with</header>
      <LeftPanel
        selectedAlbum={selectedAlbum}
        onAlbumSelect={setSelectedAlbum}
      />
      <RightPanel albumId={selectedAlbum} />
    </>
  );
};
