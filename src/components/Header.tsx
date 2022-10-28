interface Props {
  body: {
    title: string
  }
}

function Header ({ title }: Props['body']) {
  return (
    <div className='mb-10 ml-10'>
      <p className='text-3xl font-bold tracking-tight text-gray-800 capitalize'>
        {title}
      </p>
    </div>
  )
}

export default Header