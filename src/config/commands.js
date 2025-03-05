// Available commands configuration
const AVAILABLE_COMMANDS = [
  {
    name: "Resume",
    command: "console.log(NimaNajaflou.resume())",
    description: "View Nima Najaflou's resume",
  },
  {
    name: "Contact",
    command: "NimaNajaflou.contacts()",
    description: "Get contact information",
  },
  {
    name: "Projects",
    command: "NimaNajaflou.projects()",
    description: "Show Nima Najaflou's projects",
  },
  {
    name: "Clear",
    command: "clear",
    description: "Clear the terminal screen",
  },
  {
    name: "Help",
    command: "help",
    description: "Show available commands",
  },
];

export default AVAILABLE_COMMANDS;
