markdown

# Projekt testów Cypress

Projekt zawiera testy automatyczne napisane w Cypress dla https://parabank.parasoft.com/parabank/index.htm -  – demonstracyjnej aplikacji bankowej.  
Testy pokrywają główne funkcjonalności bankowości internetowej, w tym logowanie, zarządzanie kontami, przelewy, płatności rachunków oraz mockowanie API.
Projekt jest zintegrowany z Jenkins CI/CD

## 📋 Wymagania

- Node.js (wersja 18 lub wyższa)
- npm (do zarządzania pakietami)

## ⚠️ WAŻNE – Wymagania wstępne (PRZECZYTAJ NAJPIERW!)

Przed uruchomieniem testów musisz **ręcznie wykonać** następujące kroki:

### 1. Zarejestruj nowego użytkownika w ParaBank
- Wejdź na stronę: https://parabank.parasoft.com/parabank/register.htm
- Wypełnij formularz rejestracyjny
- **UWAGA:** Użyj dokładnie tych danych:
  - **Nazwa użytkownika:** `Alex`
  - **Hasło:** `Testowe123`

### 2. Dlaczego to jest konieczne?
ParaBank ma **znany problem** – sesje użytkowników wygasają po pewnym czasie, a konta są **automatycznie usuwane** z bazy danych.  
Przed każdą sesją testową musisz ponownie zarejestrować użytkownika `Alex`.

### 3. Utrzymanie sesji
- Po rejestracji pozostań zalogowany/a
- Uruchom testy **natychmiast** po rejestracji
- Jeśli testy zaczną padać z błędami logowania → zarejestruj ponownie `Alex` i spróbuj jeszcze raz


## 🚀 Instalacja

1. Sklonuj repozytorium:

````bash
git clone https://github.com/Aleksis-test/Cypress_Demoblaze_tests

2. Zainstaluj zależności
```bash
npm install (Komenda zainstaluje Cypress i wszystkie wymagane pakiety)

3. Tryb interaktywny (z przeglądarką)
```bash
npx cypress open


## 📊 Dokumentacja testów

👤 Autor

Twoje Aleksandra Janas

    GitHub: @Test Alexisa

    Email: aleksandra.janas.31@gmail.com

📄 Licencja

Ten projekt jest na licencji MIT - możesz go swobodnie używać i modyfikować.
````
