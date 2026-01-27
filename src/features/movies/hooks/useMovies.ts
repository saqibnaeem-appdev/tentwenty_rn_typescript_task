import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/api/client';
import {
  MovieListResponse,
  MovieDetails,
  MovieImagesResponse,
  MovieVideosResponse,
} from '@/api/types';

export const MOVIE_KEYS = {
  all: ['movies'] as const,
  upcoming: () => [...MOVIE_KEYS.all, 'upcoming'] as const,
  details: (id: number) => [...MOVIE_KEYS.all, 'detail', id] as const,
  images: (id: number) => [...MOVIE_KEYS.all, 'images', id] as const,
  videos: (id: number) => [...MOVIE_KEYS.all, 'videos', id] as const,
  search: (query: string) => [...MOVIE_KEYS.all, 'search', query] as const,
};

export const useUpcomingMovies = () => {
  return useQuery({
    queryKey: MOVIE_KEYS.upcoming(),
    queryFn: () => apiClient<MovieListResponse>('/movie/upcoming'),
  });
};

export const useMovieDetails = (id: number) => {
  return useQuery({
    queryKey: MOVIE_KEYS.details(id),
    queryFn: () => apiClient<MovieDetails>(`/movie/${id}`),
    enabled: !!id,
  });
};

export const useMovieImages = (id: number) => {
  return useQuery({
    queryKey: MOVIE_KEYS.images(id),
    queryFn: () => apiClient<MovieImagesResponse>(`/movie/${id}/images`),
    enabled: !!id,
  });
};

export const useMovieVideos = (id: number) => {
  return useQuery({
    queryKey: MOVIE_KEYS.videos(id),
    queryFn: () => apiClient<MovieVideosResponse>(`/movie/${id}/videos`),
    enabled: !!id,
  });
};

export const useSearchMovies = (query: string) => {
  return useQuery({
    queryKey: MOVIE_KEYS.search(query),
    queryFn: () =>
      apiClient<MovieListResponse>(
        `/search/movie?query=${encodeURIComponent(query)}`,
      ),
    enabled: !!query,
  });
};

export const useGenres = () => {
  return useQuery({
    queryKey: ['genres'],
    queryFn: () =>
      apiClient<{ genres: { id: number; name: string }[] }>(
        '/genre/movie/list',
      ),
  });
};
