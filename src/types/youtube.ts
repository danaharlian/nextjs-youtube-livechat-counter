export type YouTubeVideo = {
  id: string;
  title: string;
  description: string;
  liveStreamingDetails: {
    actualStartTime?: string | null;
    actualEndTime?: string | null;
    scheduledStartTime?: string | null;
    activeLiveChatId?: string | null;
  };
};

export type YouTubeLiveChatMessage = {
  id: string;
  snippet: {
    liveChatId: string;
    authorChannelId: string;
    publishedAt: string;
    type: "textMessageEvent" | "superChatEvent" | "memberMilestoneChatEvent";
    hasDisplayContent: boolean;
    displayMessage: string;
    textMessageDetails?: {
      messageText: string;
    };
  };
  authorDetails: {
    channelId: string;
    displayName: string;
    isChatOwner: boolean;
    isChatSponsor: boolean;
    isChatModerator: boolean;
  };
};

export type YouTubeLiveChatResponse = {
  items: YouTubeLiveChatMessage[];
  nextPageToken?: string;
  pollingIntervalMillis: number;
};
