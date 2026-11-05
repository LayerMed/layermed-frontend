import type { Category } from './types';

// Explicit demo data only; successful API responses never use these values.
export const MOCK_CATEGORIES: Category[] = [
  {
    id: 1,
    title: 'Кардиология',
    description: 'Диагностика и лечение заболеваний сердечно-сосудистой системы, ИБС, аритмий и гипертонии.',
    doctorsCount: 14,
    isNew: true,
  },
  {
    id: 2,
    title: 'Неврология',
    description: 'Лечение головных болей, остеохондроза, нарушений сна и заболеваний нервной системы.',
    doctorsCount: 9,
    isNew: false,
  },
  {
    id: 3,
    title: 'Педиатрия',
    description: 'Забота о здоровье детей с рождения: профилактические осмотры, вакцинация и лечение.',
    doctorsCount: 22,
    isNew: false,
  },
  {
    id: 4,
    title: 'Дерматология',
    description: 'Консультации и лечение проблем кожи, волос, ногтей и эстетическая дерматология.',
    doctorsCount: 7,
    isNew: true,
  },
  {
    id: 5,
    title: 'Терапия',
    description: 'Первичный прием, комплексная диагностика и направление к профильным специалистам.',
    doctorsCount: 18,
  },
  {
    id: 6,
    title: 'Эндокринология',
    description: 'Диагностика нарушений гормонального фона, щитовидной железы и сахарного диабета.',
    doctorsCount: 11,
  },
  {
    id: 7,
    title: 'Гинекология',
    description: 'Комплексное женское здоровье, плановые осмотры, ведение беременности и диагностика.',
    doctorsCount: 16,
    isNew: true,
  },
  {
    id: 8,
    title: 'Офтальмология',
    description: 'Проверка зрения, лечение заболеваний глаз, подбор очков и контактных линз.',
    doctorsCount: 8,
  },
  {
    id: 9,
    title: 'Урология',
    description: 'Диагностика и лечение заболеваний мочевыделительной и мужской половой системы.',
    doctorsCount: 10,
  },
  {
    id: 10,
    title: 'Гастроэнтерология',
    description: 'Лечение органов ЖКТ, желудка, печени и желчевыводящих путей.',
    doctorsCount: 13,
    isNew: true,
  },
  {
    id: 11,
    title: 'Травматология и ортопедия',
    description: 'Лечение суставов, позвоночника, травм и восстановление опорно-двигательного аппарата.',
    doctorsCount: 15,
  },
];
