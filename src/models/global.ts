// Type
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

export interface AnimeStreamingData {
    episode: string;
    anime: Anime;
    has_next_episode: boolean;
    next_episode: Episode | null;
    has_previous_episode: boolean;
    previous_episode: Episode | null;
    stream_url: string;
    download_urls: DownloadUrls;
}

// SubType
export interface Anime {
    slug: string;
    otakudesu_url: string;
}

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

interface DownloadUrl {
    provider: string;
    url: string;
}

interface ResolutionGroup {
    resolution: string;
    urls: DownloadUrl[];
}

interface DownloadUrls {
    mp4: ResolutionGroup[];
    mkv: ResolutionGroup[];
}

export interface PaginationData {
    current_page: number;
    last_visible_page: number;
    has_next_page: boolean;
    next_page: number;
    has_previous_page: boolean;
    previous_page: number;
}

// API Response Anime
export interface ApiResponse {
    status: string;
    data: AnimeDetails;
}

export interface ApiListResponse {
    status: string;
    data: CardAnimeHome[];
    pagination: PaginationData;
}
