# Práce s branchemi
Abychom nemuseli řešit tolik konfliktů a mohli pracovat paralelně, vyzkoušíme si práci s větvemi (branch).

## Workflow
Na každou novou featuru, nebo úkol si vytvoříme novou branch.
- Jméno branch bude mít tento formát: nickname_programatora/popis-featury
- Všechny změny commituju a pushuju pouze do te svoji branche
- Kdyz mam pocit, ze mam hotovo, tak vytvořím pull request
- V pull requestu popíšu, na čem jsem dělal (v bodech) a nastavím někoho na review
- Když to reviewer zkoukne, tak se obsah branch mergne do mainu
- Před mergem vyřeším konflikty

## Proč je to dobré?
- můžeme pracovat paralelně a neřešit tolik konflikty
- v mainu je vždy aktuální funkční verze aplikace
- každý kód uvidí vždy vícero členů týmu, takže budeme mít větší přehled o tom, co se děje (a jak)

## JAK DELAT REBASE
- `git commit` vsechny svoje zmeny
- `git rebase origin/main` - to origin je dulezite!!!
- pokud to napise, ze nejde rebasnout, tak se obrat na Ivana
- pokud rebase probehl v pohode `git push --force` - NEZBYTNE!!!!llll
