import React, { useState } from "react";
import {
  Button,
  Container,
  TextField,
  Box,
  IconButton,
  InputAdornment,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";
import { Send as SendIcon } from "@mui/icons-material";
import logo from "./images/ServiceNow-Logo.png"; // Adjust the path to your image
import ReactMarkdown from "react-markdown";
import { API } from "./backend"; // Make sure to import your backend API URL

function App() {
  const [inputValue, setInputValue] = useState("");
  const [output, setOutput] = useState("");
  const [executionResult, setExecutionResult] = useState("");
  const [hasError, setHasError] = useState(false); // State to track errors
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // State to track loading status

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    // Reset the error state when the user types something
    if (e.target.value.trim() !== "") {
      setHasError(false);
    }
  };

  const handleEnterPress = () => {
    if (inputValue.trim() === "") {
      setHasError(true); // Set error state if input is empty
      setError("Input cannot be empty");
      return;
    }

    setIsLoading(true); // Start loading animation

    fetch(`${API}/userQuery`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: inputValue }),
    })
      .then((response) => {
        if (response.status === 200) {
          setHasError(false); // No error if status is 200
          return response.json();
        } else {
          setHasError(true); // Set error if status is not 200
          setError("Request failed with status " + response.status);
        }
      })
      .then((data) => {
        if (data && data.response) {
          if (data.response[0] === "`") {
            setOutput(data.response);
          } else {
            setOutput("```json\n" + data.response + "\n```");
          }
        }
        setIsLoading(false); // Stop loading animation
      })
      .catch((error) => {
        console.error("Error submitting input:", error);
        setOutput("Error submitting input");
        setError("Internal Server Error");
        setHasError(true); // Ensure error state is set in case of a catch
        setIsLoading(false); // Stop loading animation
      });
  };

  const handleExecute = () => {
    if (!hasError && output) {
      try {
        // Remove the markdown code block syntax to parse the JSON
        const cleanedOutput = output.replace(/```json|```/g, "").trim();
        const parsedData = JSON.parse(cleanedOutput); // Parse the JSON

        console.log("Parsed JSON Object:", parsedData); // Print the JSON object to the console

        // Send the parsed JSON to the backend
        fetch(`${API}/runQuery`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            jsonQuery: JSON.stringify(parsedData),
          }), // Send the parsed JSON object
        })
          .then((response) => {
            if (response.status === 200) {
              return response.json();
            } else {
              throw new Error("Request failed with status " + response.status);
            }
          })
          .then((data) => {
            console.log("Backend response:", data);
            setExecutionResult(
              "Query executed successfully: " + JSON.stringify(data, null, 2)
            );
          })
          .catch((error) => {
            console.error("Error executing query:", error);
            setExecutionResult("Error executing query");
          });
      } catch (error) {
        console.error("Error parsing JSON:", error);
        setExecutionResult("Error parsing JSON");
      }
    }
  };

  const MarkDownEditor = () => {
    const [markdown, setMarkdown] = useState(output);
    const [isEditing, setEditing] = useState(false);

    const handleEdit = () => {
      setEditing(true);
    };

    const handleSave = () => {
      setEditing(false);
      setOutput(markdown); // Save the edited markdown
    };

    const handleMarkdownChange = (e) => {
      setMarkdown(e.target.value);
    };

    return (
      <Box
        sx={{
          p: 4,
          bgcolor: "grey.100",
          borderRadius: 2,
          maxWidth: "800px",
          width: "100%",
        }}
      >
        <Typography variant="h6" gutterBottom>
          API Request Markdown
        </Typography>
        {isEditing ? (
          <TextField
            label="Edit Markdown"
            multiline
            rows={10}
            fullWidth
            variant="outlined"
            value={markdown}
            onChange={handleMarkdownChange}
          />
        ) : (
          <Box
            sx={{
              p: 2,
              bgcolor: "white",
              borderRadius: 2,
              border: "1px solid #ddd",
              whiteSpace: "pre-wrap",
            }}
          >
            <ReactMarkdown>{markdown}</ReactMarkdown>
          </Box>
        )}
        <Box display="flex" justifyContent="flex-start" mt={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={isEditing ? handleSave : handleEdit}
            style={{ fontSize: "0.9rem" }}
          >
            {isEditing ? "Save" : "Edit"}
          </Button>
        </Box>
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Button
            variant="contained"
            onClick={handleExecute}
            style={{
              backgroundColor: "#009688",
              color: "#ffffff",
              fontSize: "0.9rem",
            }}
          >
            Execute
          </Button>
        </Box>
      </Box>
    );
  };

  return (
    <Box style={{ minHeight: "100vh", color: "#000000" }}>
      {/* Header with Fixed Position */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={2}
        bgcolor="#f5f5f5"
        borderBottom="1px solid #ddd"
        position="fixed" // Fix the header to the top
        top={0}
        left={0}
        right={0}
        zIndex={1000} // Ensure the header stays above other content
      >
        <img src={logo} alt="Logo" style={{ width: "100px", height: "auto" }} />
        <Button
          variant="contained"
          style={{
            backgroundColor: "#1976d2",
            color: "#ffffff",
            fontSize: "0.9rem",
            fontWeight: "bold",
            padding: "6px 16px",
            borderRadius: "8px",
            boxShadow: "0 3px 5px rgba(0, 0, 0, 0.2)",
          }}
        >
          Login
        </Button>
      </Box>

      {/* Main Content Area with Scrollable Content */}
      <Box
        mt={8} // Add margin to prevent content from being hidden under the fixed header
        overflow="auto" // Enable scrolling when content overflows
        style={{ maxHeight: "calc(100vh - 64px)" }} // Adjust maxHeight to fit within the viewport
      >
        <Container>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="80vh"
            flexDirection="column"
          >
            <Typography
              variant="h4"
              component="h1"
              style={{
                color: "#000000",
                textAlign: "center",
                marginBottom: "20px",
                fontWeight: "bold",
              }}
            >
              Effortlessly Manage Your Backend
            </Typography>
            <Box width="100%" maxWidth="400px" mb={4}>
              <TextField
                label="What do you want to do today?"
                variant="outlined"
                fullWidth
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleEnterPress();
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleEnterPress}
                        aria-label="enter"
                        disabled={hasError} // Disable icon when there's an error
                      >
                        <SendIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            {/* Show loading animation when data is being fetched */}
            {isLoading && (
              <Box mb={2}>
                <CircularProgress />
              </Box>
            )}

            {/* Show warning message when there is an error */}
            {hasError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            {/* Show buttons and Markdown Editor only if there's no error */}
            {!hasError && output && <MarkDownEditor />}

            {executionResult && (
              <Box
                p={2}
                bgcolor="#f1f8e9"
                borderRadius={2}
                mt={4}
                mx="auto"
                maxWidth="600px"
                textAlign="center"
                border="1px solid #c8e6c9"
              >
                <Typography variant="body2" color="textPrimary">
                  {executionResult}
                </Typography>
              </Box>
            )}
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default App;
