export interface BlogPost {
  id: string;
  title: string;
  description: string;
  content: string;
  publishDate: string;
  author: string;
  category: 'mbti-类型' | '职业规划' | '性格分析' | '测试指南';
  tags: string[];
  readTime: number;
  featured: boolean;
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
}

export interface BlogCategory {
  id: string;
  name: string;
  description: string;
  count: number;
}