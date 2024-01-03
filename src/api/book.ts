import { bookDB } from "@database";
import { isWeb } from "@shared";

interface AddBook {
  title: string;
  size: number;
  content: Uint8Array;
}

export async function addBook({ title, size, content }: AddBook) {
  const now = new Date();

  const book = {
    title,
    author: '',
    size: size,
    excerpt: '',
    domain: '',
    language: '',
    publishTime: '',
    publisher: '',
    cover: '',
    category: '',
    progress: 0,
    status: '',
    lastReadPosition: '',
    readedTime: 0,
    createTime: now,
    lastReadTime: now,
    content
  }

  if (isWeb()) {
    return await bookDB.books.add(book);
  } else {
    // todo desktop add book
  }
}

export async function findBookByTitle(title: string) {
  if (isWeb()) {
    return await bookDB.books.get({ title });
  } else {
    // todo desktop find book
  }
}

export async function removeBook(id: string) {
  if (isWeb()) {
    return await bookDB.books.delete(id);
  } else {
    // todo desktop remove book
  }
}