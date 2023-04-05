import { useState } from "react";
import {
  DiscordMessage,
  DiscordMessages,
} from "@danktuary/react-discord-message";
import "./App.scss";

var isDev = process.env.NODE_ENV !== "production";

function App() {
  const [apiResponse, setApiResponse] = useState();
  function fetchAPI() {
    fetch(isDev ? "http://localhost:8080/api/infractions" : "/api/infractions")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setApiResponse(res);
      });
  }
  function rmInfraction(i) {
    fetch(
      isDev
        ? "http://localhost:8080/api/infractions/rm"
        : "/api/infractions/rm",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ index: i }),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        fetchAPI();
      });
  }
  if (!apiResponse) fetchAPI();
  return (
    <div className="page">
      <button className="refresh-button" onClick={fetchAPI}>
        Refresh
      </button>
      <div className="infractions">
        {apiResponse &&
          apiResponse.map((infraction, index, arr) => {
            return (
              <div className="infraction-tile" key={index}>
                <span className="regex-id">{infraction.infraction_id}</span>
                <DiscordMessages>
                  <DiscordMessage
                    author={infraction.author.name}
                    avatar={infraction.author.pfp_url}
                  >
                    {infraction.message}
                  </DiscordMessage>
                </DiscordMessages>
                <div className="infr-actions">
                  <button
                    className="infr-action"
                    title={infraction.infraction_id}
                    onClick={() => {
                      navigator.clipboard.writeText(infraction.infraction_id);
                    }}
                  >
                    Copy Infraction ID
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
