import { AppLayout } from "./components/layout/app-layout";
import { fetchAlbums } from "./gonic/api";
function App() {
  fetchAlbums();
  return <AppLayout />;
}

export default App;
