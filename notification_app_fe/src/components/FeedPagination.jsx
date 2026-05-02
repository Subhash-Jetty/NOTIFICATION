import {
  Box,
  Pagination
} from "@mui/material"

const FeedPagination = ({
  totalPages,
  currentPage,
  setCurrentPage
}) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      mt={4}
      mb={4}
    >
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={(_, value) =>
          setCurrentPage(value)
        }
      />
    </Box>
  )
}

export default FeedPagination