// home
export interface CardAnimeHome {
    title: string;
    slug: string;
    poster: string;
    current_episode?: string;
    episode_count?: string;
    release_day?: string;
    rating?: string;
    newest_release_date?: string;
    last_release_date?: string;
    otakudesu_url?: string;
    release_date?: string;
}

// details anime
export interface Episode {
    episode: string;
    otakudesu_url: string;
    slug: string;
}

export interface Genre {
    name: string;
    otakudesu_url: string;
    slug: string;
}

export interface Recommendation {
    otakudesu_url: string;
    poster: string;
    slug: string;
    title: string;
}

export interface Batch {
    uploaded_at: string;
    slug: string;
    otakudesu_url: string;
}

export interface AnimeDetails {
    batch: Batch | null;
    duration: string;
    episode_count: string;
    episode_lists: Episode[];
    genres: Genre[];
    japanese_title: string;
    poster: string;
    produser: string;
    rating: string;
    recommendations: Recommendation[];
    release_date: string;
    status: string;
    studio: string;
    synopsis: string;
    title: string;
    type: string;
}

// API Response Anime
export interface AnimeDetailsApiResponse {
    status: string;
    data: AnimeDetails;
}
