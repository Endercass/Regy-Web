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
            authorID: 275787354688585730,
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
                <span>
                  Message "{infraction.messageID}" violates regex: "
                  {infraction.regexID}"
                </span>
                <DiscordMessages>
                  <DiscordMessage title="aaaddasad">
                    {infraction.message}
                  </DiscordMessage>
                </DiscordMessages>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default App;
