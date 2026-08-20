import Image from 'next/image';
import { Header } from '@/widgets/header';
import { SearchForm } from '@/features/search';

export const Hero = () => {
  const badges = [
    { id: 1, label: 'Верифицированные врачи', bgClass: 'bg-[#D7F1FF]', textClass: 'text-[#1F79AA]', shadowClass: 'shadow-[0px_9px_10px_-5px_#D7F1FF99]' },
    { id: 2, label: 'Оправданная сумма', bgClass: 'bg-[#E8FFB3]', textClass: 'text-[#007600]', shadowClass: '' },
    { id: 3, label: 'Реальные отзывы', bgClass: 'bg-[#FFF6B5]', textClass: 'text-[#8F5100]', shadowClass: '' },
    { id: 4, label: 'Полная приватность', bgClass: 'bg-[#E7E2FF]', textClass: 'text-[#4C4085]', shadowClass: '' },
  ];

  return (
    <section className='p-5 bg-white rounded-[45px]'>
      <Header/>

      <div className='flex items-center justify-between px-3'>
        <div>
          <h1 className='font-bold text-[50px] leading-[1.0] flex flex-col gap-0 mb-3.5'>
            <span>Найдите врача</span>
            <span
              className="inline-block py-1 -my-1 text-[60px] leading-[1.0] bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(180deg, #1170E3 0%, #6EC2FF 100%)'
              }}
            >
              Которому доверяете
            </span>
          </h1>

          <p className='max-w-[829px] mb-12 text-[#95A8B4] font-medium'>
            На нашем сайте более сотен квалифицированных врачей, к которым вы можете быстро записаться на прием. Мы гарантируем, что найдете подходящего специалиста и получите необходимую медицинскую помощь в кратчайшие сроки.
          </p>

          <SearchForm />
        </div>

        <div>
          <Image
            src="/hero-image.png"
            alt="Hero image"
            width={500}
            height={500}
            priority
            className='mb-[110px] mt-[69px]'
          />
        </div>
      </div>

      <div className="flex items-center justify-center gap-x-4">
        {badges.map((badge) => (
          <div
            key={badge.id}
            className={`w-[329px] gap-x-2.5 flex items-center justify-center py-[13.5px] rounded-2xl ${badge.bgClass} ${badge.textClass} ${badge.shadowClass}`.trim()}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.49 2.23L5.49997 4.11C4.34997 4.54 3.40997 5.9 3.40997 7.12V14.55C3.40997 15.73 4.18997 17.28 5.13997 17.99L9.43997 21.2C10.85 22.26 13.17 22.26 14.58 21.2L18.88 17.99C19.83 17.28 20.61 15.73 20.61 14.55V7.12C20.61 5.89 19.67 4.53 18.52 4.1L13.53 2.23C12.68 1.92 11.32 1.92 10.49 2.23Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9.04999 11.87L10.66 13.48L14.96 9.17999" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className='font-semibold'>{badge.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};







