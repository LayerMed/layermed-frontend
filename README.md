# LayerMed Frontend

Frontend application for **LayerMed** medical platform, built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS v4**, and **Feature-Sliced Design (FSD)** architecture.

---

## 📋 О проекте и текущий стек (Current Tech Stack)

- **Framework:** Next.js 16 (App Router, Server & Client Components)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 (CSS-first configuration in `globals.css`)
- **Architecture:** Feature-Sliced Design (FSD)
- **Data Fetching & State:** Axios API Client with fallback to Mock Layer + React Query setup

---

## 🚀 Быстрый старт (Quick Start)

### 1. Установка зависимостей
```bash
pnpm install
```

### 2. Переменные окружения
Создайте файл `.env.local` на основе `.env.example`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
API_URL=http://localhost:8000
```

### 3. Запуск сервера разработки
```bash
pnpm dev
```
Приложение будет доступно по адресу [http://localhost:3000](http://localhost:3000).

---

## 🏗 Архитектура проекта (Feature-Sliced Design)

Проект строго придерживается методологии **Feature-Sliced Design (FSD)**:

```text
src/
├── app/                  # Next.js App Router (страницы, лейауты, глобальные стили globals.css)
├── views/                # FSD представления страниц (HomePage)
├── widgets/              # Автономные UI-блоки с нулевой взаимной зависимостью
│   ├── categories-hero/  # Виджет категорий/специальностей с кнопкой перехода
│   ├── doctors-slider/   # Слайдер карточек врачей
│   ├── about-us/         # Виджет "О нас" с графикой и 3 строками статистики
│   ├── hero/             # Главный промо-баннер
│   ├── header/           # Шапка сайта
│   ├── footer/           # Подвал сайта (1-в-1 по дизайн-макету с брендированным градиентом)
│   └── ticker/           # Бегущая строка / промо-лента
├── features/             # Пользовательские сценарии и бизнес-логика
│   ├── auth/             # Авторизация (LoginForm)
│   ├── book-appointment/ # Запись к врачу (BookAppointmentModal)
│   └── search/           # Поиск врачей и услуг (SearchForm)
├── entities/             # Доменные сущности
│   ├── doctor/           # Сущность врача (DoctorCard)
│   ├── patient/          # Сущность пациента
│   └── specialty/        # Сущность специальности
└── shared/               # Переиспользуемые компоненты, API-клиенты и утилиты
    ├── api/              # Настроенный Axios-клиент с обработкой ошибок
    ├── providers/        # ReactQueryProvider
    └── ui/               # Базовые UI-компоненты (Button, Input, Modal)
```

---

## 🧩 Реализованный функционал и виджеты (Current Features)

### 1. 🩺 Виджет слайдера врачей (`src/widgets/doctors-slider`)
- **Компонент карточки врача (`DoctorCard`):**
  - **Имя врача:** `font-weight: 700`, `font-size: 26px`, `color: #000`.
  - **Специализация:** `font-weight: 700`, `font-size: 18px`, `color: #0095ff`.
  - **Стаж:** `font-weight: 600`, `font-size: 18px`, `color: #95a8b4`.
  - **Динамическая шкала и цвет рейтинга:**
    - `< 3.0` — Красный ползунок и текст (`bg-red-500`, `text-red-500`).
    - `< 4.0` — Желтый ползунок и текст (`bg-amber-400`, `text-amber-500`).
    - `>= 4.0` — Акцентный синий цвет (`bg-primary`, `text-primary`).
  - **Плашки города и статуса:**
    - Единый размер: `width: 162px`, `height: 35px`, `border-radius: 30px`, `padding: 8px 12px`, `font-weight: 600`, `font-size: 16px`.
    - Плашка **Город** (`#0095ff`, `bg-primary/10`).
    - Плашка **Онлайн** (`text-emerald-600`, `bg-emerald-500/10`) / **Офлайн** (`text-slate-500`, `bg-slate-500/10`).
  - **Моковые данные:** Город по умолчанию — **Ташкент**, настроены различные статусы онлайн/офлайн и рейтинги.

### 2. 🗂️ Виджет категорий (`src/widgets/categories-hero`)
- Карточки категорий врачей с отображением количества специалистов и тегами.
- Кнопка **«Показать все категории»** (`variant="accent"` с иконкой) по центру снизу.

### 3. ℹ️ Виджет "О нас" (`src/widgets/about-us`)
- Верстка 1-в-1 по дизайн-макету:
  - Центрированная шапка с описанием миссии LayerMed.
  - Левая колонка: 3D графический логотип в полноразмерном контейнере без искажений.
  - Правая колонка: 3 строки ключевой статистики с подчеркивающей полосой градиента (`#34AAFF`, 52px):
    - **400** — Квалифицированных врачей.
    - **+5K** — Пользователей по всей Центральной Азии.
    - **4.8** — Средний рейтинг оставляемый пользователями (автоматически рассчитывается из массива специалистов).

### 4. 🦶 Виджет подвала (`src/widgets/footer`)
- Полное соответствие дизайн-макету `photo_2026-08-21_15-45-02.jpg`:
  - Брендированный голубой градиентний контейнер со скруглением `rounded-[45px]`.
  - Левый блок: заголовок «Связь с нами», подчёркнутый логотип `LayerMed` и описание.
  - 3 колонки ссылок: «Пациентам», «Врачам и Клиникам», «Контакты и Поддержка».
  - Права защищены (`© 2026 LAYERMED`).
  - Гигантский полупрозрачный водяной знак **LAYERMED** во всю ширину нижней части подвала.

### 5. 🎨 Дизайн-система и переменные (Tailwind CSS v4)
- Единый центрированный стиль шапок для всех виджетов (`px-3 mb-8 text-center flex flex-col items-center`).
- Использование токенов цвета из `--color-primary`, `--color-surface`, `--color-foreground`, `--color-background`.

---

## 🔌 Эндпоинты бэкенда (Backend API Reference)

Подробное руководство по бэкенд эндпоинтам доступно в отдельном файле: [API_ENDPOINTS.md](./API_ENDPOINTS.md).

Backend base URL задаётся через `NEXT_PUBLIC_API_URL` (по умолчанию: `http://localhost:8000`).

### 👥 Users (`/users`)
- `POST /users/register` — Регистрация пользователя.
- `POST /users/login` — Авторизация и получение JWT-токена.
- `GET /users/` — Список всех пользователей (Admin).
- `GET /users/user/{user_id}` — Пользователь по ID (Admin).
- `GET /users/me` — Профиль текущего пользователя.
- `PATCH /users/me` — Обновление данных профиля.
- `PATCH /users/me/password` — Смена пароля.
- `DELETE /users/me/delete` — Удаление аккаунта.

### 🩺 Doctors (`/doctors`)
- `POST /doctors/register` — Регистрация врача.
- `GET /doctors/` — Список врачей (с фильтрами по городам, специальностям, стажу, цене и т.д.).
- `GET /doctors/{doctor_id}` — Подробный профиль врача по ID.
- `PATCH /doctors/me` — Обновление профиля врача.
- `DELETE /doctors/me` — Удаление профиля врача.

### 🏙️ Cities (`/cities`)
- `POST /cities/` — Создать город (Admin).
- `GET /cities/` — Получить список городов.
- `GET /cities/{city_id}` — Получить город по ID.
- `PATCH /cities/{city_id}` — Обновить город (Admin).
- `DELETE /cities/{city_id}` — Удалить город (Admin).

### 🩺 Specialties (`/specialties`)
- `POST /specialties/` — Создать специальность (Admin).
- `GET /specialties/` — Получить список специальностей.
- `GET /specialties/{specialty_id}` — Получить специальность по ID.
- `PATCH /specialties/{specialty_id}` — Обновить специальность (Admin).
- `DELETE /specialties/{specialty_id}` — Удалить специальность (Admin).

### 🌡️ Symptoms (`/symptoms`)
- `POST /symptoms/` — Создать симптом (Admin).
- `GET /symptoms/` — Список всех симптомов.
- `GET /symptoms/{symptom_id}` — Симптом по ID.
- `PATCH /symptoms/{symptom_id}` — Обновить симптом (Admin).
- `DELETE /symptoms/{symptom_id}` — Удалить симптом (Admin).
