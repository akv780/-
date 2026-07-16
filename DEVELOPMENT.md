# Разработка и публикация

Основная ветка — `main`. GitHub Pages публикует сайт из корня этой ветки:

https://akv780.github.io/-/

## Рабочий цикл

1. Обновить локальную `main`: `git switch main` и `git pull --ff-only`.
2. Создать ветку задачи: `git switch -c feature/short-name`.
3. Внести изменения и проверить сайт локально.
4. Создать коммит: `git add <files>` и `git commit -m "Краткое описание"`.
5. Отправить ветку: `git push -u origin feature/short-name`.
6. Открыть pull request в `main`, проверить diff и дождаться успешных checks.
7. Выполнить merge после review.
8. Проверить `pages-build-deployment` в GitHub Actions и опубликованный сайт.

Не коммитьте секреты, токены, пароли и локальные файлы окружения.
