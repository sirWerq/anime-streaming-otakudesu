export function regexEpisode(data: string) {
    const regex = /episode-(\d+)-sub/;
    const match = data.match(regex);
    if (match) {
        const episodeNumber = match[1];
        return episodeNumber;
    } else {
        return null;
    }
}
