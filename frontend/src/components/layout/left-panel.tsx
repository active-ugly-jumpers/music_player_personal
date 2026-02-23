import { NavigationTabs } from "../library/navigation-tabs";
import { LabelsList } from "../library/labels-list";

export const LeftPanel = () => {
  return (
    <>
      <NavigationTabs />
      <section className="library">
        <LabelsList />
      </section>
    </>
  );
};
