export type PostData =
    | {
          description: null | string;
          id: string;
          post_content: {
              content: string;
              id: string;
              postId: string;
          } | null;
          publishDate: string;
          title: string;
      }
    | undefined;
