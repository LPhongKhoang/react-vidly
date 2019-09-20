export default function(items, itemInPage, pageIndex) {
  const startIndex = itemInPage*(pageIndex-1);
  return items.slice(startIndex, startIndex+itemInPage);
}