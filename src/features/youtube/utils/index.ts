import { safeString } from "@/lib/utils";

import { YouTubeVideo } from "@/features/youtube/types/youtube";

const YT_ID_REGEX = /^[a-zA-Z0-9_-]{11}$/;
const YT_PATTERNS = [
  /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
  /youtube\.com\/live\/([^&\n?#]+)/,
  /youtube\.com\/shorts\/([^&\n?#]+)/,
];

export const extractVideoId = (videoId: string) => {
  const sanitizedVideoId = videoId.trim();

  if (YT_ID_REGEX.test(sanitizedVideoId)) {
    return sanitizedVideoId;
  }

  for (const pattern of YT_PATTERNS) {
    const match = sanitizedVideoId.match(pattern);
    if (match?.[1]) {
      return match[1];
    }
  }

  return sanitizedVideoId;
};

export const sanitizeLiveStreamingDetails = (
  details: YouTubeVideo["liveStreamingDetails"]
): {
  actualStartTime: string | null;
  actualEndTime: string | null;
  scheduledStartTime: string | null;
  activeLiveChatId: string | null;
} => {
  return {
    actualStartTime: safeString(details?.actualStartTime),
    actualEndTime: safeString(details?.actualEndTime),
    scheduledStartTime: safeString(details?.scheduledStartTime),
    activeLiveChatId: safeString(details?.activeLiveChatId),
  };
};

export const createLiveChatErrorMessage = (
  videoId: string,
  liveStreamingDetails: YouTubeVideo["liveStreamingDetails"]
): string => {
  if (liveStreamingDetails.actualEndTime) {
    return `Live stream has ended for video ${videoId}`;
  }

  if (
    liveStreamingDetails.scheduledStartTime &&
    !liveStreamingDetails.actualStartTime
  ) {
    return `Live stream is scheduled but not started yet for video ${videoId}`;
  }

  return `No active live chat found for video ${videoId}. Make sure the stream is live and chat is enabled.`;
};
