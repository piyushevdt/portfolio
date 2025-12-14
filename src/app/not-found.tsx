"use client";

import { Box, Button, Typography, Container } from "@mui/material";
import Link from "next/link";
import { Home, Search } from "@mui/icons-material";
import { keyframes } from "@mui/system";

// Animation keyframes

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`;

const NotFound: React.FC = () => {
  return (
    <Box
      sx={{
        // minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        // background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
        overflow: "hidden",
        px: 2,
      }}
    >
      {/* Main content */}
      <Container maxWidth="md">
        {/* 404 Number */}
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "8rem", sm: "12rem", md: "15rem" },
            fontWeight: 900,
            color: "white",
            textShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
            mb: 2,
            animation: `${pulse} 3s ease-in-out infinite`,
            letterSpacing: "0.1em",
          }}
        >
          404
        </Typography>

        {/* Icon */}
        <Search
          sx={{
            fontSize: { xs: "3rem", sm: "4rem" },
            color: "white",
            mb: 3,
            opacity: 0.9,
          }}
        />

        {/* Main message */}
        <Typography
          variant="h4"
          sx={{
            color: "white",
            fontWeight: 700,
            mb: 2,
            textShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
            fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
          }}
        >
          Page Not Found
        </Typography>

        {/* Subtitle */}
        <Typography
          variant="h6"
          sx={{
            color: "rgba(255, 255, 255, 0.9)",
            mb: 5,
            maxWidth: "600px",
            mx: "auto",
            fontSize: { xs: "1rem", sm: "1.25rem" },
            fontWeight: 400,
          }}
        >
          The page you&apos;re looking for seems to have wandered off into the digital void.
          Let&apos;s get you back home!
        </Typography>

        {/* Buttons */}
        <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
          <Button
            variant="contained"
            component={Link}
            href="/"
            startIcon={<Home />}
            sx={{
              px: 4,
              py: 1.5,
              fontSize: "1rem",
              fontWeight: 600,
              background: "white",
              color: "#667eea",
              textTransform: "none",
              borderRadius: "50px",
              boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
              transition: "all 0.3s ease",
              "&:hover": {
                background: "rgba(255, 255, 255, 0.95)",
                transform: "translateY(-3px)",
                boxShadow: "0 12px 30px rgba(0, 0, 0, 0.3)",
              },
            }}
          >
            Go Home
          </Button>
        </Box>

        {/* Error code */}
        <Typography
          variant="caption"
          sx={{
            color: "rgba(255, 255, 255, 0.6)",
            mt: 6,
            display: "block",
            fontSize: "0.875rem",
          }}
        >
          Error Code: 404 | Page Not Found
        </Typography>
      </Container>
    </Box>
  );
};

export default NotFound;