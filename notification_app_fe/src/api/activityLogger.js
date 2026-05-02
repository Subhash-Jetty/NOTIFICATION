import axios from "axios"

const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzdWJoYXNoX2pldHR5QHNybWFwLmVkdS5pbiIsImV4cCI6MTc3NzcwNzE2MywiaWF0IjoxNzc3NzA2MjYzLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiMTI3M2ZlMjMtNTBhZS00YmMxLTk2OGQtYjlmOWU3NjhiYjhjIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiamV0dHkgc3ViaGFzaCIsInN1YiI6ImQ2MzVjMWQ0LTIxNTMtNDllYi05ZTBmLTA4ZWJkZWFmZDUxZCJ9LCJlbWFpbCI6InN1Ymhhc2hfamV0dHlAc3JtYXAuZWR1LmluIiwibmFtZSI6ImpldHR5IHN1Ymhhc2giLCJyb2xsTm8iOiJhcDIzMTEwMDEwNzg3IiwiYWNjZXNzQ29kZSI6IlFrYnB4SCIsImNsaWVudElEIjoiZDYzNWMxZDQtMjE1My00OWViLTllMGYtMDhlYmRlYWZkNTFkIiwiY2xpZW50U2VjcmV0IjoiZGRia1ZuQ1NoUlBCWGtOaiJ9.X5WPS6z8tgzI0bhL3CQOqWSMMznlOi6oQD4LK42T6fQ"

const supportedLevels = [
  "debug",
  "info",
  "warn",
  "error",
  "fatal"
]

const supportedPackages = [
  "api",
  "component",
  "hook",
  "page",
  "state",
  "style",
  "auth",
  "config",
  "middleware",
  "utils"
]

const sendActivity = async (
  level,
  sourceName,
  messageText
) => {
  if (!supportedLevels.includes(level)) {
    return
  }

  if (!supportedPackages.includes(sourceName)) {
    return
  }

  try {
    await axios.post(
      "http://20.207.122.201/evaluation-service/logs",
      {
        stack: "frontend",
        level,
        package: sourceName,
        message: messageText
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    )
  } catch (error) {
    console.log("log skipped")
  }
}

export default sendActivity