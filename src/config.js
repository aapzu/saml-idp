const R = require("ramda");
const defaultConf = require("./config.defaults.js");

const getLocalConfig = () => {
  try {
    return require("./config.local.js");
  } catch (e) {
    const email = process.env.USER_EMAIL;
    if (!email) {
      throw new Error(
        "Please provide a local config in 'src/config.local.js' or the email of the user you want to authenticate as in the USER_EMAIL environment variable"
      );
    }
    console.log(
      'Local config not found. Using default values'
    );
    const fullNameFromEmail = email.split("@")[0].split(".").map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(" ");
    const [firstName, lastName] = fullNameFromEmail.split(" ");
    return {
      user: {
        userName: email,
        email: email,
        firstName: firstName,
        lastName: lastName,
        displayName: fullNameFromEmail,
      }
    };
  }
};

module.exports = R.mergeDeepRight(defaultConf, getLocalConfig());
