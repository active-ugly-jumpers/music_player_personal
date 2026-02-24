import { useState } from "react";
import { NavigationTabs, type TabKey } from "../library/navigation-tabs";
import { LabelsList } from "../library/labels-list";
import { ArtistsList } from "../library/artists-list";
import { AlbumsList } from "../library/albums-list";
import { RandomList } from "../library/random-list";

const TAB_COMPONENTS: Record<TabKey, React.ComponentType> = {
  labels: LabelsList,
  artists: ArtistsList,
  albums: AlbumsList,
  random: RandomList,
};

export const LeftPanel = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("labels");
  const handleTabChange = (tabKey: TabKey) => {
    setActiveTab(tabKey);
  };

  const ActiveComponent = TAB_COMPONENTS[activeTab];

  return (
    <>
      <NavigationTabs
        activeTab={activeTab}
        onTabChange={(tabKey) => handleTabChange(tabKey)}
      />
      <section className="library">
        <ActiveComponent />
      </section>
    </>
  );
};
