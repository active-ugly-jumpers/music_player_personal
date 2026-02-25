import { type TabKey } from "./types";

type Tab = {
  key: TabKey;
  label: string;
};

const tabs: Tab[] = [
  { key: "labels", label: "labels" },
  { key: "albums", label: "albums" },
  { key: "artists", label: "artists" },
  { key: "random", label: "feeling random" },
];

type NavigationTabsProps = {
  activeTab: TabKey;
  onTabChange: (tabKey: TabKey) => void;
};

export const NavigationTabs = ({
  activeTab,
  onTabChange,
}: NavigationTabsProps) => {
  return (
    <nav>
      <ul role="tablist">
        {tabs.map((tab) => (
          <li key={tab.key}>
            <button
              role="tab"
              aria-selected={activeTab === tab.key}
              onClick={() => onTabChange(tab.key)}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
