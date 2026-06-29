# F1 statistic

Frontend-приложение для статистики Формулы-1.

## Стек

React 19, TypeScript, Vite, Tailwind CSS 4, shadcn/ui, oxlint, Prettier, Husky + lint-staged.

## Запуск

```bash
npm install
npm run dev
```

Сборка production-версии:

```bash
npm run build
```

## Проверки

```bash
npm run check
```

Команда запускает проверку типов, линтер и проверку форматирования.

Дополнительно доступны:

```bash
npm run lint
npm run lint:fix
npm run format
npm run format:check
npm run typecheck
```

Перед коммитом `lint-staged` автоматически запускает `oxlint --fix` и `prettier --write` для staged-файлов.

## Код-стайл и архитектура

Проект использует TypeScript, функциональные React-компоненты и FSD структуру:

```text
src/
  app/
  pages/
  widgets/
  features/
  entities/
  shared/
```

Для внутренних импортов используются алиасы: `@app`, `@pages`, `@widgets`, `@features`, `@entities`, `@shared`, `@`.
