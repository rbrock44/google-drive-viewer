# Google Drive Viewer
(React + TypeScript + Vite) <br/> <br/>

> This project is a file explorer for a person's google drive acount<br/>
> [Live - Google Drive Viewer Website](https://google-drive-viewer.ryan-brock.com/)

Screenshots: <br/>
![preview](/screenshots/root_loaded.png)
![folder expanded](/screenshots/folder_expanded.png)
![search](/screenshots/search.png)

---

## 📚 Table of Contents

- [What's My Purpose?](#-whats-my-purpose)
- [How to Use](#-how-to-use)
- [Technologies](#-technologies)
- [Getting Started (Local Setup)](#-getting-started-local-setup)
    - [Run Locally](#run-locally)
    - [GitHub Hooks](#github-hooks)
    - [Build](#build)
    - [Deploy](#deploy)

---

## 🧠 What's My Purpose?

This react tailwind frontend was created for a take home assessment where I needed to load a google drive's contents <br/>

Things I wanted to do:
- Have a test suite - I learned TDD early in my career and so am passionate about testing. I believe in repeatable user experiences and would want test coverage around this
- Make prod (google auth) work - I spend way too much time attempting to securely get the client_id to prod with github secrets but failed to get the applicaiton to pick it up
- Load by folderId - once logged in have a way for to search other people's public folder by id
- File/Folder details - a true file explorer would show more details about each file/folder item
- Expand zip files - Right now this does not expand zip files, as I've learned those need to be handled differently
- loading icon/state - Recursively searching the google drive can be intense and I should have a loading state in the application
- styling - More time should be spent styling this, but since this was an MVP I've deemed it good enough
- Prop types/interfaces - I slung props around without type safety and should add that
- Linting - wiring up a linter would be a great decision
- Better navigation - right now it just expands and collapses but normal file viewers once you click an child directory it doesnt search upwards do that would make it more performant and make me swap how it loads children
- Handle empty search results better
---

## 🚦 How to Use

- `Login` Button - Yellow is selected by default
- `Load Root` Button - After logging in a user can lod the root of the google drive
- `Load Harcoded Files` Button - when no clientId is provided, this button will load the hardcoded files into the explorer <br/>
- `Search` Input/Button - Type into the search input box to filter or press the button after <br/>
- `Exact Match` - this checkbox toggles if it's an exact match or not
- `+` Button - used to expand contents of that parent item (think file contents of a folder)

Screenshots: <br/>
![start](/screenshots/start.png)
![logged_in](/screenshots/logged_in.png)
![no_client_id](/screenshots/no_client_id.png)
![no_client_id_loaded](/screenshots/no_client_id_loaded.png)
![preview](/screenshots/root_loaded.png)
![folder expanded](/screenshots/folder_expanded.png)
![search](/screenshots/search.png)

---

## 🛠 Technologies

- Framework: `React 19`
- Styles: `Tailwind CSS`
- Deployment: `GitHub Pages`

---

## 🚀 Getting Started (Local Setup)

* Install [node](https://nodejs.org/en) - v22 is needed
* Clone [repo](https://github.com/rbrock44/google-drive-status)

---

### Run Locally

- Copy [.env.example](.env.example) and rename to `.env.local`
- Replace all values that start with `replace-with-` 

```
npm install
npm run dev
```

---

### Github Hooks

- Build
    - Trigger: On Push to Main
    - Action(s): Builds application then kicks off gh page action to deploy build output

---

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

---

### Deploy

Run `npm run prod` to build and deploy the project. Make sure to be on `master` and that it is up to date before running the command. It's really meant to be a CI/CD action

---
