import { useEffect, useState } from "react"
import {
  Container,
  Typography,
  Card,
  CardContent,
  Box
} from "@mui/material"

import fetchCampusFeed from "../api/campusFeed"

const Dashboard = () => {
  const [campusUpdates, setCampusUpdates] =
    useState([])

  useEffect(() => {
    const loadUpdates = async () => {
      const freshUpdates =
        await fetchCampusFeed()

      setCampusUpdates(
        freshUpdates
      )
    }

    loadUpdates()
  }, [])

  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: 4,
        px: {
          xs: 2,
          sm: 3,
          md: 4
        }
      }}
    >
      <Typography
        variant="h3"
        sx={{
          textAlign:
            "center",
          fontWeight:
            "bold",
          mb: 4,
          fontSize: {
            xs: "2rem",
            sm: "2.8rem",
            md: "3.5rem"
          }
        }}
      >
        Campus Updates
      </Typography>

      {campusUpdates.map(
        (
          updateItem
        ) => (
          <Card
            key={
              updateItem.ID
            }
            sx={{
              mb: 3,
              borderRadius: 3
            }}
          >
            <CardContent>
              <Box
                sx={{
                  textAlign:
                    "center"
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight:
                      "bold",
                    fontSize:
                      {
                        xs: "1.4rem",
                        sm: "1.8rem"
                      }
                  }}
                >
                  {
                    updateItem.Type
                  }
                </Typography>

                <Typography
                  sx={{
                    mt: 2,
                    fontSize:
                      {
                        xs: "1rem",
                        sm: "1.3rem"
                      }
                  }}
                >
                  {
                    updateItem.Message
                  }
                </Typography>

                <Typography
                  mt={1}
                  color="text.secondary"
                  sx={{
                    fontSize:
                      {
                        xs: "0.9rem",
                        sm: "1rem"
                      }
                  }}
                >
                  {
                    updateItem.Timestamp
                  }
                </Typography>
              </Box>
            </CardContent>
          </Card>
        )
      )}
    </Container>
  )
}

export default Dashboard