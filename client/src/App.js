import { useState } from "react";
import {
  DiscordMessage,
  DiscordMessages,
} from "@danktuary/react-discord-message";
import * as SnowflakeUtils from "discord-snowflake";
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
                    timestamp={
                      new Date(
                        SnowflakeUtils.getTimestamp(`${infraction.messageID}`)
                      )
                    }
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
