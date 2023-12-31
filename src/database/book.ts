
import Dexie, { type Table } from 'dexie';
import { superName, version } from './config';

export interface Book {
  id?: number;
  title: string; // 标题
  author: string; // 作者
  size: number; // 文件大小
  excerpt: string; // 摘要
  domain: string; // 领域
  language: string; // 语言
  publishTime: string; // 发布时间
  publisher: string; // 发布者(出版商)
  cover: string; // 封面
  category: string; // 类别
  status: string; // 状态
  progress: number; // 阅读进度(百分比)
  sourceURL: string; // 源文件URL
  lastReadPosition: string; // 最后一次阅读位置
  readedTime: number; // 累计阅读时间(分钟)
  createTime: Date;
  lastReadTime: Date; // 最后一次阅读时间
  content: Uint8Array; // 内容
}

class BookDB extends Dexie {
  books!: Table<Book>;

  constructor() {
    super(superName);
    this.version(version).stores({
      books: '++id, &title, author, size, excerpt,domain, language,publishTime,publisher,cover,category,status,progress,lastReadPosition,readedTime,createTime,lastReadTime,sourceURL'
    });
  }
}

export const bookDB = new BookDB();