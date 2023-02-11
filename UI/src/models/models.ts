export interface Feed {
  id: number;
  heading: string;
  body: string;
  imgUrl: string;
}

export interface BookmarkListM {
  id: number;
  title: string;
  posts: number[];
}

export interface BookmarkListWithFeeds extends BookmarkListM {
  feeds: Feed[];
}
