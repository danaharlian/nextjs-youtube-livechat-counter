import { google } from "googleapis";

import {
  createLiveChatErrorMessage,
  safeString,
  sanitizeLiveStreamingDetails,
} from "@/lib/utils";

import { YouTubeLiveChatResponse, YouTubeVideo } from "@/types/youtube";

const createYoutubeService = () => {
  const youtube = google.youtube({
    version: "v3",
    auth: process.env.YOUTUBE_API_KEY,
  });

  return { youtube };
};

const youtubeService = createYoutubeService();

export const getVideoDetails = async (
  videoId: string
): Promise<YouTubeVideo> => {
  try {
    const response = await youtubeService.youtube.videos.list({
      part: ["id", "snippet", "liveStreamingDetails"],
      id: [videoId],
    });

    if (!response.data.items || response.data.items.length === 0) {
      throw new Error(`Video not found: ${videoId}`);
    }

    const video = response.data.items[0];
    const liveStreamingDetails = video.liveStreamingDetails;

    if (!liveStreamingDetails) {
      throw new Error(`Video ${videoId} is not a live stream`);
    }

    const sanitizedDetails = sanitizeLiveStreamingDetails(liveStreamingDetails);

    return {
      id: video.id as string,
      title: safeString(video.snippet?.title) ?? "Unknown Title",
      description: safeString(video.snippet?.description) ?? "",
      liveStreamingDetails: sanitizedDetails,
    };
  } catch (error) {
    const err = error as Error;
    console.error("getVideoDetails error", {
      videoId,
      message: err?.message,
      name: err?.name,
    });
    throw error;
  }
};

export const getLiveChatId = async (videoId: string): Promise<string> => {
  const video = await getVideoDetails(videoId);

  if (!video.liveStreamingDetails.activeLiveChatId) {
    const errorMessage = createLiveChatErrorMessage(
      videoId,
      video.liveStreamingDetails
    );
    throw new Error(errorMessage);
  }

  return video.liveStreamingDetails.activeLiveChatId;
};

export const getLiveChatMessages = async (
  liveChatId: string,
  pageToken?: string
): Promise<YouTubeLiveChatResponse> => {
  try {
    const response = await youtubeService.youtube.liveChatMessages.list({
      liveChatId,
      part: ["id", "snippet", "authorDetails"],
      ...(pageToken && { pageToken }),
    });

    return response.data as YouTubeLiveChatResponse;
  } catch (error) {
    const err = error as Error;
    console.error("getLiveChatMessages error", {
      liveChatId,
      pageToken,
      message: err?.message,
      name: err?.name,
    });
    throw error;
  }
};
