export type TabKey = "labels" | "albums" | "artists" | "random";

export type Tab = {
  key: TabKey;
  label: string;
};

const tabs: Tab[] = [
  { key: "labels", label: "labels" },
  { key: "albums", label: "albums" },
  { key: "artists", label: "artists" },
  { key: "random", label: "random" },
];

export const NavigationTabs = () => {
  return (
    <nav>
      <ul role="tablist">
        {tabs.map((tab) => (
          <li key={tab.key}>
            <button role="tab" aria-selected="true">
              {tab.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
