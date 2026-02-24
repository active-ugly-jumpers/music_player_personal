// Common Subsonic response wrapper
export interface SubsonicResponse<T = Record<string, unknown>> {
    "subsonic-response": {
        status: "ok" | "failed";
        version: string;
        error?: {
            code: number;
            message: string;
        };
        type?: string;
        serverVersion?: string;
        openSubsonic?: boolean;
    } & T;
}

// gonic index from getIndexes or getArtists
export type GonicIndex = {
    name: string;  // "#", "a", "b", etc.
    artist: Array<{
        id: string;
        name: string;
        albumCount: number;
    }>;
};

// getIndexes 
export type GonicIndexesResponse = SubsonicResponse<{
    indexes: {
        index: GonicIndex[];
    };
}>;

// labels (from getIndexes)
export type Label = {
    id: string;
    name: string;
    albumCount: number;
};

export type LabelsMap = Record<string, Label>;

// getArtists
export type GonicArtistsResponse = SubsonicResponse<{
    artists: {
        index: GonicIndex[];
    };
}>;

// artists (from getArtists)
export type Artist = {
    id: string;
    name: string;
    albumCount?: number;
};

export type ArtistsMap = Record<string, Artist>;

// getAlbumList2
export type GonicAlbumsResponse = SubsonicResponse<{
    albumList2: {
        album: Album[];
    };
}>;

export type Album = {
    id: string;
    name: string;
    year: number;
    created: string;  // ISO date string
    coverArt: string;
    artists: Array<{
        id: string;
        name: string;
    }>;
};

export type AlbumsMap = Record<string, Album>;

// getMusicDirectory (for label albums)
export type GonicMusicDirectoryResponse = SubsonicResponse<{
    directory: {
        child: Array<{
            id: string;
        }>;
    };
}>;

// getArtist (for artist albums)
export type GonicArtistResponse = SubsonicResponse<{
    artist: {
        album: Array<{
            id: string;
        }>;
    };
}>;





