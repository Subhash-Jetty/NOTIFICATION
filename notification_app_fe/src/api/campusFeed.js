import axios from "axios"
import sendActivity from "./activityLogger"

const accessToken ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzdWJoYXNoX2pldHR5QHNybWFwLmVkdS5pbiIsImV4cCI6MTc3NzcwNzE2MywiaWF0IjoxNzc3NzA2MjYzLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiMTI3M2ZlMjMtNTBhZS00YmMxLTk2OGQtYjlmOWU3NjhiYjhjIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiamV0dHkgc3ViaGFzaCIsInN1YiI6ImQ2MzVjMWQ0LTIxNTMtNDllYi05ZTBmLTA4ZWJkZWFmZDUxZCJ9LCJlbWFpbCI6InN1Ymhhc2hfamV0dHlAc3JtYXAuZWR1LmluIiwibmFtZSI6ImpldHR5IHN1Ymhhc2giLCJyb2xsTm8iOiJhcDIzMTEwMDEwNzg3IiwiYWNjZXNzQ29kZSI6IlFrYnB4SCIsImNsaWVudElEIjoiZDYzNWMxZDQtMjE1My00OWViLTllMGYtMDhlYmRlYWZkNTFkIiwiY2xpZW50U2VjcmV0IjoiZGRia1ZuQ1NoUlBCWGtOaiJ9.X5WPS6z8tgzI0bhL3CQOqWSMMznlOi6oQD4LK42T6fQ"
const categoryPriority = {
  Placement: 3,
  Result: 2,
  Event: 1
}

const fetchCampusFeed = async () => {
  try {
    await sendActivity(
      "debug",
      "api",
      "loading campus notifications"
    )

    const response = await axios.get(
      "http://20.207.122.201/evaluation-service/notifications",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    )

    const campusUpdates =
      response.data.notifications || []

    const sortedUpdates = [...campusUpdates].sort(
      (firstItem, secondItem) => {
        const priorityGap =
          categoryPriority[secondItem.Type] -
          categoryPriority[firstItem.Type]

        if (priorityGap !== 0) {
          return priorityGap
        }

        return (
          new Date(secondItem.Timestamp) -
          new Date(firstItem.Timestamp)
        )
      }
    )

    await sendActivity(
      "info",
      "api",
      "notifications loaded successfully"
    )

    return sortedUpdates

  } catch (error) {
    await sendActivity(
      "error",
      "api",
      "failed to load notifications"
    )

    return []
  }
}

export default fetchCampusFeed