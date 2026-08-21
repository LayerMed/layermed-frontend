import { apiClient } from '@/shared/api/axios';
import { Category } from '../model/types';

const MOCK_CATEGORIES: Category[] = [
  {
    id: '1',
    slug: 'cardiology',
    title: 'Кардиология',
    description: 'Диагностика и лечение заболеваний сердечно-сосудистой системы, ИБС, аритмий и гипертонии.',
    doctorsCount: 14,
    isNew: true,
  },
  {
    id: '2',
    slug: 'neurology',
    title: 'Неврология',
    description: 'Лечение головных болей, остеохондроза, нарушений сна и заболеваний нервной системы.',
    doctorsCount: 9,
    isNew: false,
  },
  {
    id: '3',
    slug: 'pediatrics',
    title: 'Педиатрия',
    description: 'Забота о здоровье детей с рождения: профилактические осмотры, вакцинация и лечение.',
    doctorsCount: 22,
    isNew: false,
  },
  {
    id: '4',
    slug: 'dermatology',
    title: 'Дерматология',
    description: 'Консультации и лечение проблем кожи, волос, ногтей и эстетическая дерматология.',
    doctorsCount: 7,
    isNew: true,
  },
  {
    id: '5',
    slug: 'therapy',
    title: 'Терапия',
    description: 'Первичный прием, комплексная диагностика и направление к профильным специалистам.',
    doctorsCount: 18,
  },
  {
    id: '6',
    slug: 'endocrinology',
    title: 'Эндокринология',
    description: 'Диагностика нарушений гормонального фона, щитовидной железы и сахарного диабета.',
    doctorsCount: 11,
  },
  {
    id: '7',
    slug: 'gynecology',
    title: 'Гинекология',
    description: 'Комплексное женское здоровье, плановые осмотры, ведение беременности и диагностика.',
    doctorsCount: 16,
    isNew: true,
  },
  {
    id: '8',
    slug: 'ophthalmology',
    title: 'Офтальмология',
    description: 'Проверка зрения, лечение заболеваний глаз, подбор очков и контактных линз.',
    doctorsCount: 8,
  },
  {
    id: '9',
    slug: 'urology',
    title: 'Урология',
    description: 'Диагностика и лечение заболеваний мочевыделительной и мужской половой системы.',
    doctorsCount: 10,
  },
  {
    id: '10',
    slug: 'gastroenterology',
    title: 'Гастроэнтерология',
    description: 'Лечение органов ЖКТ, желудка, печени и желчевыводящих путей.',
    doctorsCount: 13,
    isNew: true,
  },
  {
    id: '11',
    slug: 'orthopedics',
    title: 'Травматология и ортопедия',
    description: 'Лечение суставов, позвоночника, травм и восстановление опорно-двигательного аппарата.',
    doctorsCount: 15,
  },
];

export async function getCategories(): Promise<Category[]> {
  try {
    const { data } = await apiClient.get<Category[]>('/api/categories');
    return data;
  } catch (err) {
    console.warn('Backend API unavailable, falling back to mock categories data:', err);
    return MOCK_CATEGORIES;
  }
}
