import { Container, Title, Text, Button, Group } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store";
import { useState, useEffect } from 'react';
import './landing.scss';


export default function Landing() {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [showIntro, setShowIntro] = useState(true);
  const [messageIndex, setMessageIndex] = useState(0);
  const [showYoda, setShowYoda] = useState(true);

  const messages = [
    "Welcome to Star Wars...",
    "A long time ago in a galaxy far, far away...",
    "Star Wars is an epic tale of good versus evil, of hope and redemption...",
    "Where Jedi Knights protect peace and justice using the mystical Force...",
    "Through epic battles, legendary heroes, and incredible adventures...",
    "Now, let's explore this vast universe together!",
  ];

  useEffect(() => {
    const messageTimer = setInterval(() => {
      setMessageIndex(prev => {
        if (prev >= messages.length - 1) {
          clearInterval(messageTimer);
          setTimeout(() => {
            setShowYoda(false);
            setTimeout(() => setShowIntro(false), 1000);
          }, 2000);
          return prev;
        }
        return prev + 1;
      });
    }, 3000);

    return () => clearInterval(messageTimer);
  }, []);

  return (
    <>
      {showIntro && (
        <div className="intro-overlay">
          <div className={`tiny-yoda ${showYoda ? 'show' : 'hide'}`}>
            <div className="head">
              <div className="ears-div">
                <ul className="ears">
                  <li></li>
                  <li></li>
                </ul>
              </div>
              <div className="eyes-div">
                <div className="eyes">
                  <ul>
                    <li></li>
                    <li></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="body">
              <div className="robe"></div>
            </div>
            <div className="message-bubble">
              <Text className="message-text">{messages[messageIndex]}</Text>
            </div>
          </div>
        </div>
      )}

      <Container size="lg" py={120} className={showIntro ? 'blur' : ''}>
        <Title order={1} size={68} weight={900} align="center" mb={50}>
          Explore the{" "}
          <Text
            component="span"
            variant="gradient"
            gradient={{ from: "blue", to: "cyan" }}
            inherit
          >
            Star Wars
          </Text>{" "}
          Universe
        </Title>

        <Text
          color="dimmed"
          size="xl"
          align="center"
          mx="auto"
          mb={50}
          sx={{ maxWidth: 600 }}
        >
          Discover detailed information about characters, their homeworlds, and
          the films they appear in from the Star Wars saga.
        </Text>

        <Group position="center">
          <Button
            size="lg"
            onClick={() => navigate(isAuthenticated ? "/resources" : "/login")}
          >
            {isAuthenticated ? "View Characters" : "Get Started"}
          </Button>
        </Group>
      </Container>
    </>
  );
}