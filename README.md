
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
git clone https://github.com/Aleksis-test/Cypress_ParaBank_tests.git

2. Zainstaluj zależności
```bash
npm install (Komenda zainstaluje Cypress i wszystkie wymagane pakiety)

3. Tryb interaktywny (z przeglądarką)
```bash
npx cypress open


📊 Dokumentacja testów

---Test case'y dostępne w pliku Excel:
(docs/ParaBank.Test_cases.xlsx)

---Testy Wydajnościowe:
(docs/preformance_tests)

---Plan testów 
(docs/Plan testów ParaBank.docx)

---Zgłoszenie błędu Jira
(docs/Bug_Jira)

---Testy automatyzacji w Cypress screen
(docs/ScreenShots_TestsInCypress)

---Raport z testów
(docs/Raport Testów.docx)

🧪 Opis testów

***registration.cy.js

Testy rejestracji nowego użytkownika. Sprawdzają czy formularz akceptuje poprawne dane, czy wyświetla błędy przy pustych polach, przy różnych hasłach oraz przy próbie rejestracji na istniejącą nazwę użytkownika.
Liczba testów: 4

***login.cy.js

Testy logowania i wylogowania. Obejmują logowanie poprawnymi danymi, błędną nazwą użytkownika, błędnym hasłem, pustymi polami oraz ponowne logowanie po wcześniejszej nieudanej próbie.
Liczba testów: 8

***overview-mock.cy.js

Testy strony głównej z wykorzystaniem mockowania API. Sprawdzają wyświetlanie kont z plików fixture, obsługę pustego konta, wiele kont, błąd serwera 500 oraz opóźnioną odpowiedź.
Liczba testów: 6

***newAccount.cy.js

Testy otwierania nowego konta. Weryfikują czy nowe konto pojawia się na liście, czy można wybrać konkretne konto źródłowe oraz czy saldo konta źródłowego zmniejsza się o 100.
Liczba testów: 3

***transfer.cy.js

Testy przelewów między kontami. Sprawdzają czy system blokuje przelew na to samo konto, czy przelew 200 USD aktualizuje salda oraz dokumentują błąd akceptacji przelewu na kwotę 0.
Liczba testów: 3

***billPay.cy.js

Testy płatności rachunków. Obejmują dodanie nowego odbiorcy, walidację wymaganych pól, format numeru konta oraz dokumentują błąd akceptacji płatności na kwotę 0.
Liczba testów: 4


👤 Autor

Twoje Aleksandra Janas

    GitHub: @Test Alexisa

    Email: aleksandra.janas.31@gmail.com

📄 Licencja

Ten projekt jest na licencji MIT - możesz go swobodnie używać i modyfikować.
````
