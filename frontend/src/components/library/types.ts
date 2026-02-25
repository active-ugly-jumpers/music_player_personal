export type ListProps = {
    selectedAlbum: string | null;
    onAlbumSelect: (albumId: string) => void;
};

export type TabKey = "labels" | "albums" | "artists" | "random"; 