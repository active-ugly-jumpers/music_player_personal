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

// getIndexes 
export type GonicIndexesResponse = SubsonicResponse<{
    indexes: {
        index: GonicIndex[];
    };
}>;

export type GonicIndex = {
    name: string;  // "#", "a", "b", etc.
    artist: Array<{
        id: string;
        name: string;
        albumCount: number;
    }>;
};

// labels (from getIndexes)
export type Label = {
    name: string;
    albumCount: number;
};

export type LabelsMap = Record<string, Label>;

