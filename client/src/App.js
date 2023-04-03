import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  DiscordMention,
  DiscordMessage,
  DiscordMessages,
} from "@danktuary/react-discord-message";
import "./App.scss";

function App() {
  const [apiResponse, setApiResponse] = useState();
  function fetchAPI() {
    fetch("http://localhost:9000/infractions/")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setApiResponse(res);
      });
  }
  function addInfraction(data) {
    fetch("http://localhost:9000/infractions/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ infraction: data }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        fetchAPI();
      });
  }
  function rmInfraction(i) {
    fetch("http://localhost:9000/infractions/rm", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ index: i }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        fetchAPI();
      });
  }
  if (!apiResponse) fetchAPI();
  return (
    <div className="page">
      <button
        className="infraction-adder"
        onClick={() => {
          addInfraction({
            regexID: uuidv4(),
            // message: "regy test phrase",
            message:
              "regy test phrase regy test phrase regy test phrase regy test phrase regy test phrase regy test phrase regy test phrase regy test phrase regy test phrase regy test phrase regy test phrase regy test phrase regy test phrase regy test phrase ",
            messageID: 1091898634762731712,
            author: {
              id: 275787354688585730,
              name: "Endercass",
              pfpURL:
                "https://cdn.discordapp.com/avatars/275787354688585730/44c5228ff7252802c17d4fd838845393?size=512",
            },
          });
        }}
        title={JSON.stringify(apiResponse)}
      >
        Add infraction
      </button>
      <div className="infractions">
        {apiResponse &&
          apiResponse.map((infraction, index, arr) => {
            return (
              <div className="infraction-tile" key={index}>
                {/* <h1 title={infraction.messageID}>{infraction.message}</h1> */}
                <span className="regex-id">{infraction.regexID}</span>
                <DiscordMessages>
                  <DiscordMessage
                    author={infraction.author.name}
                    avatar={infraction.author.pfpURL}
                  >
                    {infraction.message}
                  </DiscordMessage>
                </DiscordMessages>
                <div className="infr-actions">
                  <button
                    className="infr-action"
                    title={infraction.messageID}
                    onClick={() => {
                      navigator.clipboard.writeText(infraction.messageID);
                    }}
                  >
                    Copy Message ID
                  </button>
                  <button
                    className="infr-action"
                    onClick={() => {
                      rmInfraction(apiResponse.indexOf(infraction));
                    }}
                  >
                    Dismiss Infraction
                  </button>
                  <button
                    className="infr-action"
                    title={infraction.author.id}
                    onClick={() => {
                      navigator.clipboard.writeText(infraction.author.id);
                    }}
                  >
                    Copy User ID
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default App;
