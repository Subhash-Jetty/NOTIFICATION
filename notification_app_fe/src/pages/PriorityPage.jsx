import { useEffect, useState } from "react"
import {
  Container,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Box,
  Chip,
  Pagination
} from "@mui/material"

import fetchCampusFeed from "../api/campusFeed"

const priorityMap = {
  Placement: 3,
  Result: 2,
  Event: 1
}

const PriorityPage = () => {
  const [allNotifications, setAllNotifications] =
    useState([])

  const [notifications, setNotifications] =
    useState([])

  const [limit, setLimit] =
    useState(10)

  const [selectedType, setSelectedType] =
    useState("All")

  const [viewedNotifications, setViewedNotifications] =
    useState([])

  const [currentPage, setCurrentPage] =
    useState(1)

  useEffect(() => {
    const loadData = async () => {
      const data =
        await fetchCampusFeed()

      setAllNotifications(data)
    }

    loadData()
  }, [])

  useEffect(() => {
    let filtered =
      [...allNotifications]

    if (selectedType !== "All") {
      filtered = filtered.filter(
        (item) =>
          item.Type === selectedType
      )
    }

    const sorted =
      filtered.sort(
        (a, b) => {
          const priorityDifference =
            priorityMap[b.Type] -
            priorityMap[a.Type]

          if (
            priorityDifference !== 0
          ) {
            return priorityDifference
          }

          return (
            new Date(
              b.Timestamp
            ) -
            new Date(
              a.Timestamp
            )
          )
        }
      )

    const startIndex =
      (currentPage - 1) *
      limit

    const endIndex =
      startIndex +
      limit

    setNotifications(
      sorted.slice(
        startIndex,
        endIndex
      )
    )

  }, [
    allNotifications,
    selectedType,
    limit,
    currentPage
  ])

  const markAsViewed = (
    id
  ) => {
    if (
      !viewedNotifications.includes(
        id
      )
    ) {
      setViewedNotifications([
        ...viewedNotifications,
        id
      ])
    }
  }

  const totalPages =
    Math.ceil(
      allNotifications.length /
        limit
    ) || 1

  return (
    <Container sx={{ mt: 4 }}>
      <Typography
        variant="h3"
        align="center"
        fontWeight="bold"
        mb={4}
      >
        Priority Notifications
      </Typography>

      <FormControl
        fullWidth
        sx={{ mb: 3 }}
      >
        <InputLabel>
          Top Notifications
        </InputLabel>

        <Select
          value={limit}
          label="Top Notifications"
          onChange={(e) => {
            setLimit(
              e.target.value
            )
            setCurrentPage(1)
          }}
        >
          <MenuItem value={10}>
            Top 10
          </MenuItem>

          <MenuItem value={15}>
            Top 15
          </MenuItem>

          <MenuItem value={20}>
            Top 20
          </MenuItem>
        </Select>
      </FormControl>

      <FormControl
        fullWidth
        sx={{ mb: 4 }}
      >
        <InputLabel>
          Filter Type
        </InputLabel>

        <Select
          value={selectedType}
          label="Filter Type"
          onChange={(e) => {
            setSelectedType(
              e.target.value
            )
            setCurrentPage(1)
          }}
        >
          <MenuItem value="All">
            All
          </MenuItem>

          <MenuItem value="Placement">
            Placement
          </MenuItem>

          <MenuItem value="Result">
            Result
          </MenuItem>

          <MenuItem value="Event">
            Event
          </MenuItem>
        </Select>
      </FormControl>

      {notifications.map(
        (item) => (
          <Card
            key={item.ID}
            sx={{
              mb: 3,
              cursor:
                "pointer"
            }}
            onClick={() =>
              markAsViewed(
                item.ID
              )
            }
          >
            <CardContent>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
              >
                <Typography
                  variant="h5"
                  fontWeight="bold"
                >
                  {item.Type}
                </Typography>

                <Chip
                  label={
                    viewedNotifications.includes(
                      item.ID
                    )
                      ? "VIEWED"
                      : "NEW"
                  }
                />
              </Box>

              <Typography variant="h6">
                {item.Message}
              </Typography>

              <Typography
                mt={1}
                color="text.secondary"
              >
                {item.Timestamp}
              </Typography>
            </CardContent>
          </Card>
        )
      )}

      <Box
        display="flex"
        justifyContent="center"
        mt={4}
        mb={4}
      >
        <Pagination
          count={
            totalPages
          }
          page={
            currentPage
          }
          onChange={(
            _,
            value
          ) =>
            setCurrentPage(
              value
            )
          }
        />
      </Box>
    </Container>
  )
}

export default PriorityPage