# Instrukcja korzystania z JSON importer

## Konfiguracja

1. Plik JSON który chcemy zaimportować do bazy danych wrzucamy do folderu Json_importer/JSON
2. W pliku import.js podajemy ścieżkę do JSONa, ktorego chcemy importować:
```javascript
await firestoreService.restore('./JSON/nazwa_naszego_jsona.json');
```

## Użycie

W konsoli przechodzimy do kataogu Json_importer a następnie wpisujemy komendę:
```bash
node import.js
```
