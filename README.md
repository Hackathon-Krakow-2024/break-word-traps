[English :us:](./README.en.md)

# Words Smoothie

##### Spis treści

1. [**Uruchomienie**](#uruchomienie)

   - [**Z użyciem Docker**](#uruchomienie-z-użyciem-docker)
   - [**Bez użycia Docker**](#uruchomienie-bez-użycia-docker)

2. [**Dewelopowanie**](#dewelopowanie)

   - [**Z użyciem Docker**](#dewelopowanie-z-użyciem-docker)
   - [**Bez użycia Docker**](#dewelopowanie-bez-użycia-docker)

3. [**Narzędzia użyte w projekcie**](#narzędzia)
   - [**Frontend (warstwa GUI)**](#narzędzia-frontend)
   - [**Backend (warstwa serwerowa)**](#narzędzia-backend)
   - [**AI**](#narzędzia-ai)
4. [**Architektura**](#architektura)
5. [**Estymowany koszt**](#koszt)

</hr>

> [!Note]
> Zarówno uruchomienie aplikacji jak i jej dewelopowanie jest możliwe na Windows, MacOS i Linux. Rekomendowany sposób to ten z użyciem [Docker](https://www.docker.com/).
>
> Wymagania techniczne to możliwość uruchomienia aplikacji Docker lub Node.js oraz Python.

## Uruchomienie

### Uruchomienie z użyciem Docker

Do uruchomienia aplikacji w ten sposób wymagane jest posiadanie zainstalowanej aplikacji Docker. Jeżeli nie posiadasz zainstalowanego Dockera to użyj instrukcji znajdującej się [tutaj](https://docs.docker.com/get-started/get-docker/).

Następnie [sklonuj](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) to repozytorium.

Gdy już będziesz miał repozytorium na swojej maszynie, otwórz dowolny terminal i w terminalu przejdź do folderu, w którym znajduje się plik `docker-compose.yml` i użyj poniższej komendy:

```
docker-compose -f docker-compose.yml up --build
```

Gdy zakończy się budowanie obrazów i uruchamianie aplikacji, będziesz mogł ją zobaczyć wchodząc pod poniższy adres w dowolnej przeglądarce internetowej:

[**localhost:8080**](http://localhost:8080)

### Uruchomienie bez użycia Docker

Do uruchomienia aplikacji bez użycia Docker wymagane jest posiadanie zainstalowanych na swoim systemie następujących aplikacji:

- [**Node.js** w wersji większej lub równej **20**](https://nodejs.org/en/download/package-manager/current)
- [**Python** w wersji większej lub równej **3.12**](https://www.python.org/downloads/)

Po zainstalowaniu wymaganych aplikacji, [sklonuj](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) to repozytorium.

Gdy już będziesz miał repozytorium na swojej maszynie, otwórz dowolny terminal i w terminalu przejdź do głównego folderu repozytorium i użyj poniższych komend, w odpowiedniej kolejności:

1. **Instalacja wymaganych bibliotek:**

```
npm install
```

2. **Zbudowanie aplikacji:**

```
npm run build
```

3. **Uruchomienie aplikacji:**

```
npm start
```

Po uruchomieniu aplikacji będzie ona dostępna po wejściu na poniższy adres w dowolnej przeglądarce internetowej:

[**localhost:8080**](http://localhost:8080)

<hr>

## Dewelopowanie

### Dewelopowanie z użyciem Docker

Proces dewelopowania z użyciem Docker niewiele różni się od procesu uruchamienia aplikacji.

Do dewlopowania aplikacji w ten sposób wymagane jest posiadanie zainstalowanej aplikacji Docker. Jeżeli nie posiadasz zainstalowanego Dockera to użyj instrukcji znajdującej się [tutaj](https://docs.docker.com/get-started/get-docker/).

Następnie [sklonuj](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) to repozytorium.

Gdy już będziesz miał repozytorium na swojej maszynie, otwórz dowolny terminal i w terminalu przejdź do folderu, w którym znajduje się plik `docker-compose.dev.yml` i użyj poniższej komendy:

```
docker-compose -f docker-compose.dev.yml up --build
```

Gdy zakończy się budowanie obrazów i uruchamianie aplikacji, będziesz mogł ją zobaczyć łącząc się z:

- **Frontend:** [**localhost:8080**](http://localhost:8080)
- **Backend:** [**localhost:7860**](http://localhost:7860)

Zarazem backend jak i frontend posiadają mechanizm `hot-reload` - zmiany wprowadzone w kodzie będą miały natychmiastowe odzwierciedlenie w zbudowanej aplikacji.

> [!Note]
> Jeżeli widzisz błedy w swoim IDE lub edytorze tekstu, użyj komendy:
>
> ```
> npm run build
> ```

### Dewelopowanie bez użycia Docker

Do dewelopowania aplikacji bez użycia Docker wymagane jest posiadanie zainstalowanych na swoim systemie następujących aplikacji:

- [**Node.js** w wersji większej lub równej **20**](https://nodejs.org/en/download/package-manager/current)
- [**Python** w wersji większej lub równej **3.12**](https://www.python.org/downloads/)

Po zainstalowaniu wymaganych aplikacji, [sklonuj](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) to repozytorium.

Gdy już będziesz miał repozytorium na swojej maszynie, otwórz dowolny terminal i w terminalu przejdź do głównego folderu repozytorium i użyj poniższych komend, w odpowiedniej kolejności:

> [!Note]
> Aby biblioteka `pm2` używana w skryptach działała poprawnie, terminal musi być uruchomiony jako administrator.

1. **Instalacja wymaganych bibliotek:**

```
npm install
```

2. **Zbudowanie aplikacji:**

```
npm run build
```

3. **Uruchomienie aplikacji w trybie deweloperskim:**

```
npm run dev
```

Gdy zakończy się budowanie i uruchamianie aplikacji, będziesz mogł ją zobaczyć łącząc się z:

- **Frontend:** [**localhost:8080**](http://localhost:8080)
- **Backend:** [**localhost:7860**](http://localhost:7860)

Zarazem backend jak i frontend posiadają mechanizm `hot-reload` - zmiany wprowadzone w kodzie będą miały natychmiastowe odzwierciedlenie w zbudowanej aplikacji.

<hr>

## Narzędzia

> [!Note]
> Wszystkie narzędzia użyte w projekcie posiadają licencje pozwalające na użycie ich w dowolny sposób, także w projektach komercyjnych.

Projekt używa kilku bibliotek z [**npm**](https://www.npmjs.com/) do uruchomienia. Lista dostępna jest w pliku [**package.json**](./package.json) w sekcji `dependencies` i `devDependencies`.

### Narzędzia Frontend

Warstwa `GUI` została zbudowana z założeniem, że będzie to aplikacja webowa, dlatego została zbudowana w języku programowania `TypeScript`.

Frameworkiem użytym do zbudowania tej warty jest [**React**](https://react.dev/).

Lista wszystkich bibliotek użytych w tej warstwie jest dostępna w pliku [**package.json**](./frontend/package.json) w sekcji `dependencies` i `devDependencies`.

### Narzędzia Backend

Warstwa `backend` czyli warstwa serwerowa aplikacji została zbudowana z użyciem języka programowania `Python`.

Frameworkiem użytym do zbudowania tej warstwy jest [**FastAPI**](https://fastapi.tiangolo.com/).

Lista wszystkich bibliotek użytych w tej warstwie jest dostępna w pliku [**requirements.txt**](./backend/requirements.txt).

### Narzędzia AI
Aplikacja używa dwóch modeli:
- OpenAI Whisper,
- OpenAI gpt-3.5-turbo

</hr>

## Architektura
![diagram](https://github.com/user-attachments/assets/81fe4668-0eed-48bf-bee9-eea3aadc6fc6)

Aplikacja pozwala użytkownikowi na załadowanie pliku wideo z dysku i jego analizę. Pierwszym krokiem niezbędnym do analizy jest wyciągnięcie ścieżki dźwiękowej z filmu. Następnie generowana jest transkrypcja audio za pomocą modelu AI `Whisper` (wersja medium) autorstwa `OpenAI`. Model jest wywoływany lokalnie, na naszym serwerze. Kolejnym krokiem jest analiza tekstu przy użyciu modelu AI `gpt-3.5-turbo` za pomocą `API OpenAI`. Wyniki analizy przedstawione są wizualnie użytkownikowi.

</hr>

## Koszt
Koszt użycia modelu `gpt-3.5-turbo` dla jednego filmu o długości 30 sekund to okolo `0.0030 USD`.
Koszt liczony jest na podstawie cennika `OpenAPI` - 3 USD za 1 milion input tokenów i 6 USD za 1 milion output tokenów. Aplikacja generuja stałą ilość input tokenów w ilości 400 tokenów za jeden plik wideo, plus ilość tokenów zależna od długości wideo. Ilość output tokenów jest stała i wynosi 200 tokenów.
