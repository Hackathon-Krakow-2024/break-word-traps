[Polish :poland:](./README.md)

# WordsSmoothie

##### Table of contents

1. [**Running the application**](#running-the-application)

   - [**With Docker**](#running-the-application-with-docker)
   - [**Without Docker**](#running-the-application-without-docker)

2. [**Developing**](#developing)

   - [**With Docker**](#developing-with-docker)
   - [**Without Docker**](#developing-without-docker)

3. [**Tools used in this project**](#tools)
   - [**Frontend (GUI layer)**](#frontend-tools)
   - [**Backend (Server layer)**](#backend-tools)
   - [**AI**](#ai-tools)
4. [**Architecture**](#architecture)

</hr>

> [!Note]
> Both running and developing the application is possible on Windows, MacOS and Linux. The recommended way is to use [Docker](https://www.docker.com/).
>
> The technical requirements are being able to run Docker or Node.js and Python.

## Running the application

### Running the application with Docker

To run the application this way, it is required that you have Docker installed. If you don't have Docker installed, then use the instruction [here](https://docs.docker.com/get-started/get-docker/).

Then [clone](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) this repository.

After you have the repository on your machine, open a terminal of your choice and inside the terminal go into the directory in which `docker-compose.yml` is located and then run the following command:

```
docker-compose -f docker-compose.yml up --build
```

After building Docker images and opening the application is done, you wil be able to view it using internet browser of your choice under the address below:

[**localhost:8080**](http://localhost:8080)

### Running the application without Docker

To run the application without Docker you need the following applications installed:

- [**Node.js** with version higher or equal **20**](https://nodejs.org/en/download/package-manager/current)
- [**Python** with version higher or equal **3.12**](https://www.python.org/downloads/)

After installing the required applications [clone](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) this repository.

After you have the repository on your machine, open a terminal of your choice and run the following commands (the order is important):

1. **Installing required libraries:**

```
npm install
```

2. **Building the application:**

```
npm run build
```

3. **Running the applicaiton:**

```
npm start
```

After the application is built and running, you wil be able to view it using internet browser of your choice under the address below:

[**localhost:8080**](http://localhost:8080)

<hr>

## Developing

### Developing with Docker

The process of developing the application with Docker is very similar to running the application with Docker.

To develop the application this way, it is required that you have Docker installed. If you don't have Docker installed, then use the instruction [here](https://docs.docker.com/get-started/get-docker/).

After you have the repository on your machine, open a terminal of your choice and inside the terminal go into the directory in which `docker-compose.dev.yml` is located and then run the following command:

```
docker-compose -f docker-compose.dev.yml up --build
```

After building Docker images and opening the application is done, you wil be able to connect to the application using the addresses below:

- **Frontend:** [**localhost:8080**](http://localhost:8080)
- **Backend:** [**localhost:7860**](http://localhost:7860)

Both backend and frontend have `hot-reload` enabled - changes to the application code will be immediately visible in the application.

> [!Note]
> If you see errors in your IDE or text editor, use the following command:
>
> ```
> npm run build
> ```

### Developing without Docker

To develop the application without Docker you need the following applications installed:

- [**Node.js** with version higher or equal **20**](https://nodejs.org/en/download/package-manager/current)
- [**Python** with version higher or equal **3.12**](https://www.python.org/downloads/)

After installing the required applications [clone](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) this repository.

After you have the repository on your machine, open a terminal of your choice and run the following commands (the order is important):

> [!Note]
> For the `pm2` library (which is used for scripts) to work properly, the terminal has to be opened with administrator rights.

1. **Installing required libraries:**

```
npm install
```

2. **Building the application:**

```
npm run build
```

3. **Running the applicaiton in development mode:**

```
npm run dev
```

After building and opening the application is done, you wil be able to connect to the application using the addresses below:

- **Frontend:** [**localhost:8080**](http://localhost:8080)
- **Backend:** [**localhost:7860**](http://localhost:7860)

Both backend and frontend have `hot-reload` enabled - changes to the application code will be immediately visible in the application.

<hr>

## Tools

> [!Note]
> All tools used in this project have licenses that permit any usage, including commercial use.

The project uses some [**npm**](https://www.npmjs.com/) libraries to run. The list of those libraries is available in [**package.json**](./package.json) in sections `dependencies` and `devDependencies`.

### Frontend Tools

The `GUI` layer was created to be usable as a web application and because of that the programming language used is `TypeScript`.

The framework used to build this layer is [**React**](https://react.dev/).

The list of all libraries used in this layer is available in [**package.json**](./frontend/package.json) in sections `dependencies` and `devDependencies`.

### Backend Tools

The `backend` layer (the server layer) of the application was built using `Python` programming language.

The framework used to build this layer is [**FastAPI**](https://fastapi.tiangolo.com/).

The list of all libraries used in this layer is available in [**requirements.txt**](./backend/requirements.txt).

### AI tools
The application uses two models:
- OpenAI Whisper,
- OpenAI gpt-3.5-turbo

</hr>

## Architecture
![diagram](https://github.com/user-attachments/assets/81fe4668-0eed-48bf-bee9-eea3aadc6fc6)

The application allows the user to upload a video file from disk and analyze it. The first step required for analysis is to extract the audio track from the video. Then an audio transcription is generated using the AI model `Whisper` (medium version) by `OpenAI`. The model is stored locally, on our server. The next step is to analyze the text using the AI model `gpt-3.5-turbo` using `API OpenAI`. The analysis results are presented visually to the user.
