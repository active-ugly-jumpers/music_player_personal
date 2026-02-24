import { useState } from "react";
import { NavigationTabs, type TabKey } from "../library/navigation-tabs";
import { LabelsList } from "../library/labels-list";

export const LeftPanel = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("labels");
  const handleTabChange = (tabKey: TabKey) => {
    setActiveTab(tabKey);
  };
  return (
    <>
      <NavigationTabs
        activeTab={activeTab}
        onTabChange={(tabKey) => handleTabChange(tabKey)}
      />
      <section className="library">
        <LabelsList />
      </section>
    </>
  );
};
