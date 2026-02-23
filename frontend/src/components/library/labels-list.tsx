import { useLabels } from "../../hooks/useLabels";

export const LabelsList = () => {
  const { labels, isLoading, error } = useLabels();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <ul>
      {Object.entries(labels).map(([id, label]) => (
        <li key={id}>
          <button>
            <div>{label.name}</div>
            <div className="meta">Albums: {label.albumCount}</div>
          </button>
        </li>
      ))}
    </ul>
  );
};
