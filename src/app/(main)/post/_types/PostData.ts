export type PostData =
    | {
          description: null | string;
          id: string;
          publishDate: string;
          status: 'ARCHIVED' | 'DRAFT' | 'PUBLISHED';
          title: string;
      }
    | undefined;
