# Digital Letters

This is a [Next.js](https://nextjs.org/) project made to display SMS/MMS messages stored in backup files created via [SMS Backup & Restore](https://play.google.com/store/apps/details?id=com.riteshsahu.SMSBackupRestore&gl=US).

Project was bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Table of contents

  - [Overview](#overview)
  - [Features](#features)
  - [Screenshots](#screenshots)
  - [Run Locally](#run-locally)
    - [Environment Variables](#environment-variables)
  - [Deployment](#deployment)
  - [My Process](#my-process)
  - [Tech Stack](#tech-stack)
  - [Issues](#issues)
  - [What I learned](#what-i-learned)
-

## Overview

## Features

- Create an account and upload a backup file to display your messages in the browser
- NextJS API route handles extracting all relevant information from backup file
- Messages are saved in Firestore database and connected to your account
- Your messages are paginated for easier navigation and better experience
- Take a look at how website will display your messages - there's a [sample conversation between Romeo and Juliet](https://postimg.cc/8jHnXS9M) ❤
- Change website theme to light or dark mode
- App is responsive, so you can view it on mobile too

Upcoming:

- Connect more conversations to user's account
- Invite another user via email and grant access to messages you uploaded
- Delete messages from database
- Manage your account (edit email, change password, delete account)
- Change fonts
- Add tests

## Screenshots

Desktop:

[![Homepage desktop lightmode](https://i.postimg.cc/T2FhjVww/home-light.png)](https://postimg.cc/t7dXpVFQ)

[![Login page desktop lightmode](https://i.postimg.cc/Twm2CSh3/login.png)](https://postimg.cc/KkGyY0n6)

[![Login success desktop darkmode](https://i.postimg.cc/MpSsjnfL/login-success.png)](https://postimg.cc/XpsKR78K)

[![Upload page desktop darkmode.png](https://i.postimg.cc/QChDSdRf/upload.png)](https://postimg.cc/Pp305TfD)

[![Sidebar desktop darkmode.png](https://i.postimg.cc/BbSWHwKy/sidebar.png)](https://postimg.cc/8J0nV4wB)

Mobile:

[![Homepage mobile darkmode](https://i.postimg.cc/6qP033JM/home-mobile.png)](https://postimg.cc/D4qsp7zG)

[![Upload page mobile darkmode](https://i.postimg.cc/90bV96FR/upload-mobile.png)](https://postimg.cc/Mfnh2rBq)

[![Messages page mobile darkmode](https://i.postimg.cc/vHSwdL1s/dashboard-mobile.png)](https://postimg.cc/56vRBzq7)

## Run Locally

Clone the project

```bash
    git clone https://github.com/ravviolo/digital-letters.git
```

Go to the project directory

```bash
  cd digital-letters
```

Install dependencies

```bash
  npm install
```

Start the development server

```bash
  npm run dev
```

Open http://localhost:3000 to view it in the browser.

### Environment Variables

This project uses Firebase Web SDK; to run this project locally, you will need to have a Firebase account. Create new Firebase project and save your project configuration as the following environment variables to your .env.local file.

`NEXT_PUBLIC_FIREBASE_API_KEY`
`NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
`NEXT_PUBLIC_FIREBASE_PROJECT_ID`
`NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
`NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
`NEXT_PUBLIC_FIREBASE_APP_ID`

In Firebase project console enable Authentication and Firestore database.

## Deployment

Website is still in development process.

## My Process

## Tech Stack

- [Typescript](https://www.typescriptlang.org/)
- [NextJS](https://nextjs.org/) for SEO, pre-rendering content, server-side code
- [ChakraUI](https://chakra-ui.com/) for styling
- [Firebase](https://firebase.google.com/) Back End as a Service, used for authentication and data storage (Firestore)

Other:

- [React Context](https://reactjs.org/docs/context.html#gatsby-focus-wrapper)
- [axios](https://axios-http.com/docs/intro)
- [react-hook-form](https://react-hook-form.com/)
- [formidable](https://www.npmjs.com/package/formidable)
- [next-connect](https://www.npmjs.com/package/next-connect/v/1.0.0-next.2)
- [react-dropzone](https://react-dropzone.js.org/)
- [xml-js](https://www.npmjs.com/package/xml-js)
- [tabler-icons](https://www.npmjs.com/package/tabler-icons-react)
- [Figma](https://www.figma.com/)

## Issues

Images sent via MMS are encoded in base64 strings. Those strings are a part of paginated messages data, which is saved to Firestore as a single document. Because of the fact that those encoded images form such long strings, Firestore cannot save this part of messages due to reaching maximum size of a document. [See Firestore limits](https://firebase.google.com/docs/firestore/quotas#limits).

Temporary fix: images data is not written to Firestore, only messages that hold text can be saved in database. Perhaps the project will move away from Firebase and use custom database.

API code still formats images correctly, you can check out how images are displayed in website's example page ([Screenshot](<(https://postimg.cc/56vRBzq7)>)).

## What I learned

- Basics of NextJS and importance of SSR in web development
- Usage of Typescript in NextJS projects
- Writing custom React hooks
- Usage of JS Promises, handling async code
- Form handling with react-hook-form
- User authentication with help of Firebase
- CRUD operations in database with help of Firebase
- Usage of ChakraUI
- Usage of environment variables
