import { useMemo } from "react";




export const useSortedList = (list, sort) => {
    const sortedList = useMemo(() => {
        if (sort) {
          return [...list].sort((a, b) => a[sort].localeCompare(b[sort]))
        }
        return list
      }, [sort, list]);

      return sortedList
}
export const useList = (list, sort, query) => {
    const sortedList = useSortedList(list, sort);
    const sortedAndSearchedList = useMemo(() => {
        return sortedList.filter(item => item.title.toLowerCase().includes(query.toLowerCase()))
      }, [query, sortedList]);

      return sortedAndSearchedList
}