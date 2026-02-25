import { useState } from "react";
import { NavigationTabs } from "../library/navigation-tabs";
import { type TabKey, type ListProps } from "../library/types";
import { LabelsList } from "../library/labels-list";
import { ArtistsList } from "../library/artists-list";
import { AlbumsList } from "../library/albums-list";
import { RandomList } from "../library/random-list";

const TAB_COMPONENTS: Record<TabKey, React.ComponentType<ListProps>> = {
  labels: LabelsList,
  artists: ArtistsList,
  albums: AlbumsList,
  random: RandomList,
};

export const LeftPanel = ({ onAlbumSelect }: ListProps) => {
  const [activeTab, setActiveTab] = useState<TabKey>("labels");

  const ActiveComponent = TAB_COMPONENTS[activeTab];
  return (
    <>
      <NavigationTabs activeTab={activeTab} onTabChange={setActiveTab} />
      <section className="library">
        <ActiveComponent onAlbumSelect={onAlbumSelect} />
      </section>
    </>
  );
};
