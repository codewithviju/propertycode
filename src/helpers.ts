export const streamServerConfig = {
  iceServers: [
    {
      urls: ["stun:stun.l.google.com:19302"],
    },
  ],
};

// TODO: move these configs to env vars
const prodVars = {
  apiUrl: "https://propertybot-backend.com/api/v1",
  uiUrl: "https://www.propertybot.io",
};

const stageVars = {
  apiUrl: "https://propertybot-backend.com/api/v1",
  uiUrl: "https://www.propertybot-dev.com",
};
const localVars = {
  apiUrl: "http://localhost:5001/api/v1",
  uiUrl: "http://localhost:3000",
};

export const getConfiguration = () => {
  let config = localVars;
  if (true || process.env.ENVIRONMENT === "production") {
    config = prodVars;
  }

  if (process.env.ENVIRONMENT === "staging") {
    config = stageVars;
  }

  console.log({ config, var: process.env.ENVIRONMENT, totes: process.env });
  return config;
};

export const getHeaders = () => {
  const token = localStorage.getItem("user");
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};
