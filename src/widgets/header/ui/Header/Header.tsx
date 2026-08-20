import { Button } from '@/shared/ui'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Header = () => {
  const headerLinks = [
    { text: 'Каталог', linkto: '#' },
    { text: 'Список врачей', linkto: '#' },
    { text: 'О нас', linkto: '#' },
    { text: 'Связаться с нами', linkto: '#' },
  ]

  return (
    <header className='flex items-center justify-between'>
      <Image src={'/LogoBig.svg'} width={210} height={36} alt='Layermed' />
      <nav className='flex items-center justify-between'>
        <ul className='flex items-center justify-center gap-x-2'>
          {headerLinks.map((item, idx) => (<li key={idx}><Link className='px-5 py-[13.5px] bg-background rounded-2xl font-semibold hover:bg-[#D3DDE4] duration-300 ease' href={item.linkto}>{item.text}</Link></li>))}
        </ul>
      </nav>
      <div className='flex items-center justify-center gap-x-2'>
        <Button>Войти</Button>
        <Button variant='accent'>Зарегестрироваться</Button>
      </div>
    </header>
  )
}

export default Header
