# 🔌 Backend API Endpoints Reference

Backend base URL is specified by `NEXT_PUBLIC_API_URL` (default: `http://localhost:8000`).

---

## 👥 Users (`/users`)
- `POST /users/register` — Регистрация пользователя.
- `POST /users/login` — Авторизация и получение JWT-токена.
- `GET /users/` — Список всех пользователей (Admin).
- `GET /users/user/{user_id}` — Пользователь по ID (Admin).
- `GET /users/me` — Профиль текущего пользователя.
- `PATCH /users/me` — Обновление данных профиля.
- `PATCH /users/me/password` — Смена пароля.
- `DELETE /users/me/delete` — Удаление аккаунта.

---

## 🩺 Doctors (`/doctors`)
- `POST /doctors/register` — Регистрация врача.
- `GET /doctors/` — Список врачей (с фильтрами по городам, специальностям, стажу, цене и т.д.).
- `GET /doctors/{doctor_id}` — Подробный профиль врача по ID.
- `PATCH /doctors/me` — Обновление профиля врача.
- `DELETE /doctors/me` — Удаление профиля врача.

---

## 🏙️ Cities (`/cities`)
- `POST /cities/` — Создать город (Admin).
- `GET /cities/` — Получить список городов.
- `GET /cities/{city_id}` — Получить город по ID.
- `PATCH /cities/{city_id}` — Обновить город (Admin).
- `DELETE /cities/{city_id}` — Удалить город (Admin).

---

## 🩺 Specialties (`/specialties`)
- `POST /specialties/` — Создать специальность (Admin).
- `GET /specialties/` — Получить список специальностей.
- `GET /specialties/{specialty_id}` — Получить специальность по ID.
- `PATCH /specialties/{specialty_id}` — Обновить специальность (Admin).
- `DELETE /specialties/{specialty_id}` — Удалить специальность (Admin).

---

## 🌡️ Symptoms (`/symptoms`)
- `POST /symptoms/` — Создать симптом (Admin).
- `GET /symptoms/` — Список всех симптомов.
- `GET /symptoms/{symptom_id}` — Симптом по ID.
- `PATCH /symptoms/{symptom_id}` — Обновить симптом (Admin).
- `DELETE /symptoms/{symptom_id}` — Удалить симптом (Admin).
