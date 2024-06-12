const TelegramBot = require("node-telegram-bot-api");
const { SocksProxyAgent } = require("socks-proxy-agent");

//replace Robot Token
const token = "xxxx";

// proxy setting (if socks5 replace socks5)
const proxy = "socks://127.0.0.1:2080";
const agent = new SocksProxyAgent(proxy);

// if connect bot by proxy
// create bot by proxy
const bot = new TelegramBot(token, {
  polling: true,
  request: {
    agent: agent,
  },
});
//else if connect  bot not proxy
// const bot = new TelegramBot(token, {
//   polling: true,

// });

const userResponses = {};

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text;

  if (messageText === "/start") {
    // create custom keyboard
    const keyboard = {
      reply_markup: {
        keyboard: [
          [{ text: "welcome" }],
          [{ text: "category" }],
          [{ text: " About US" }],
        ],
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    };

    bot.sendMessage(chatId, "welcome to me bot please select button", keyboard);
  }

  // create custom response
  if (messageText === "welcome") {
    userResponses[chatId] = { currentQuestion: 0, responses: [] };
    askQuestion(chatId);
  } else if (messageText === "welcome") {
    bot.sendMessage(chatId, "click welcome");
  } else if (messageText === "About US") {
    bot.sendMessage(chatId, "click About US");
  } else if (userResponses[chatId]) {
    handleResponse(chatId, messageText);
  }
});

const handleResponse = (chatId, response) => {
  const user = userResponses[chatId];
  if (response === "back to Menu") {
    delete userResponses[chatId];
    const keyboard = {
      reply_markup: {
        keyboard: [
          [{ text: "welcome" }],
          [{ text: "category" }],
          [{ text: " About US" }],
        ],
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    };
    bot.sendMessage(chatId, "Back to main Menu", keyboard);
  } else {
    const questionType = questions[user.currentQuestion].type;
    user.responses.push({ type: questionType, answer: response });
    user.currentQuestion++;
  }
};
