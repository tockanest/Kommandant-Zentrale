<div align="center">
  <img src="./public/images/profile/KommandantZentrale.png" alt="Tocka Nest Logo" style="height: 200px"/>
  <a href="https://www.tockanest.com" style="text-decoration: none; color: #F7F4F3">
      <h1>Kommandant Zentrale</h1>
      <h4>Befehlen, steuern und koordinieren.</h4>
  </a>
</div>

---

<h3 align="start">📖 About</h3>

This repository is the source code for the Kommandant Zentrale discord bot.

This will be a collaboration between me (Tocka) and a friend of mine (Pedro).

This is a work in progress, should not be used in production. But you do you.

---

<h3 align="start">🚀 Technologies</h3>

This project was/is being built with the following technologies:

- [Node.js](https://nodejs.org/en/)
- [Typescript](https://www.typescriptlang.org/)
- [Discord.js](https://discord.js.org/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)

In total, this project uses five different technologies to make it work.

This might grow in the future.

---

<h3 align="start">📦 Installation</h3>

To install this project, you will need to have Node.js installed on your machine.

You can download Node.js from the following link: [Node.js](https://nodejs.org/en/)

After you have installed Node.js, you can clone this repository to your machine and run the following command to install

all the dependencies:

```bash
git clone https://github.com/tockanest/Kommandant-Zentrale.git
cd kommandant-zentrale
npm install
npm run install::global
```

---

<h3 align="start">🔨 To Work On</h3>

- [ ] Create the main Event Handler.
- [ ] Create the main Command Handler.
- [ ] Create the main Database Handler.
- [ ] Create the commands.

This project needs to follow the following structure:

```structures
root/
    src/
        commands/
            [WIP]
        configs/
            events/
                eventHandler.ts
            commands/
                commandHandler.ts
            database/
                schemas/
                databaseHandler.ts
        index.ts
    .env
    .gitignore
    package.json
    tsconfig.json
    README.md
```
