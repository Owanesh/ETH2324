interface CommentType {
    author: string;
    content: string;
    date: string;
  }
  
  interface ArticleType {
    title: string;
    id: number;
    slug: string;
    content: string;
    description: string;
    image: string;
    author: string;
    nickname: string;
    date: string;
    tags: string[];
    comments: CommentType[];
  }
  
  export default ArticleType;
  