const { runServer } = require("saml-idp");
const config = require("./config");

const audience = process.env.AUDIENCE_URL;

if (!audience) {
  throw new Error("Please provide an AUDIENCE_URL environment variable");
}

runServer({
  acsUrl: `https://foo.okta.com/auth/saml20/assertion-consumer`,
  audience,
  config,
});
