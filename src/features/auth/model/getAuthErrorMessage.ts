import axios from 'axios';

export function getAuthErrorMessage(error: unknown): string {
  if (!axios.isAxiosError(error)) return 'Неизвестная ошибка. Попробуйте ещё раз.';
  if (!error.response) return 'Нет связи с сервером. Проверьте подключение и повторите попытку.';
  if (error.response.status === 401) return 'Неверная почта или пароль.';
  if (error.response.status === 409) return 'Пользователь с такой почтой уже зарегистрирован.';
  if (error.response.status === 422) return 'Проверьте введённые данные. Пароль должен быть достаточно надёжным.';
  if (error.response.status === 429) return 'Слишком много попыток. Попробуйте позже.';
  return 'Не удалось выполнить запрос. Попробуйте ещё раз.';
}
