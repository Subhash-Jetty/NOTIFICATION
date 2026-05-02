import { useEffect, useState } from "react"
import fetchCampusFeed from "../api/campusFeed"
import { priorityMap } from "../utils/priorityRules"

const usePriorityFeed = (
  selectedType,
  limit,
  currentPage
) => {
  const [notifications, setNotifications] =
    useState([])

  const [totalPages, setTotalPages] =
    useState(1)

  useEffect(() => {
    const loadData = async () => {
      const data =
        await fetchCampusFeed()

      let filtered = [...data]

      if (selectedType !== "All") {
        filtered =
          filtered.filter(
            (item) =>
              item.Type === selectedType
          )
      }

      filtered.sort(
        (a, b) => {
          const difference =
            priorityMap[b.Type] -
            priorityMap[a.Type]

          if (difference !== 0) {
            return difference
          }

          return (
            new Date(b.Timestamp) -
            new Date(a.Timestamp)
          )
        }
      )

      const pages =
        Math.ceil(
          filtered.length / limit
        ) || 1

      setTotalPages(pages)

      const startIndex =
        (currentPage - 1) * limit

      setNotifications(
        filtered.slice(
          startIndex,
          startIndex + limit
        )
      )
    }

    loadData()
  }, [
    selectedType,
    limit,
    currentPage
  ])

  return {
    notifications,
    totalPages
  }
}

export default usePriorityFeed