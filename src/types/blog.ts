// ブログ記事が持つデータの型定義を定義する

export type Blog = {
    id: string;
    title: string;
    content: string;
    publishedAt: string;
    eyecatch?: {
        url: string;
        height: number;
        width: number;
    };
    category?: string;
    name: string;
    tags: string[];
    updatedAt?: string;
    description?: string;
};