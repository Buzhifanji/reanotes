import { isArray, isObj } from "@shared";

function handleCatalogId(val: any) {
  if (isArray<any>(val)) {
    return val.reduce((acc, cur) => {
      const temp = isObj(cur) ? JSON.stringify(val) : cur;
      return acc + temp;
    }, '');
  } else {
    return val.toString();
  }
}

export function formatePdfCatalog(list: any) {
  if (!list) return [];

  // 处理 没有目录的特殊情况
  if (list.length === 1 && list[0].title === '目录') {
    return [];
  }

  list.forEach((item: any) => {
    item.id = handleCatalogId(item.dest);
    item.children = formatePdfCatalog(item.items);
  });

  return list;
}