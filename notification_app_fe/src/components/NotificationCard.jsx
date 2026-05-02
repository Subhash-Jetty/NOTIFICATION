import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip
} from "@mui/material"

const NotificationCard = ({
  item,
  viewedNotifications,
  markAsViewed
}) => {
  return (
    <Card
      sx={{
        mb: 3,
        borderRadius: 3,
        cursor: "pointer"
      }}
      onClick={() =>
        markAsViewed(item.ID)
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
}

export default NotificationCard