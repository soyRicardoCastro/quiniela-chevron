import { Layout } from '../components'
import { Table } from 'flowbite-react'
import { useUsers } from '../query/users'
import { userStore } from '../store'

function Leaderboard() {
  const { data: users } = useUsers()
  const { user: profile } = userStore()
  const usersSorted = users?.sort((a, b) => b.puntos - a.puntos)

  const styleName = 'text-yellow-400'

  return (
    <Layout title='Tabla de Puntos'>
      <Table>
        <Table.Head>
          <Table.HeadCell>
            Posicion
          </Table.HeadCell>  
          <Table.HeadCell>
            Nombre
          </Table.HeadCell>  
          <Table.HeadCell>
            Puntos
          </Table.HeadCell>  
        </Table.Head>

        <Table.Body>  
          {usersSorted?.map((user, i) => (
          <Table.Row key={i}>
            <Table.Cell className={`font-bold text-md ${user._id === profile?._id && styleName}`}>
              {i + 1}
            </Table.Cell>
            <Table.Cell className={`font-bold text-md ${user._id === profile?._id && styleName}`}>
              {user.username}
            </Table.Cell>
            <Table.Cell className={`font-bold text-md ${user._id === profile?._id && styleName}`}>
              {user.puntos}
            </Table.Cell>
          </Table.Row>
          ))}
        </Table.Body>  
      </Table>

    </Layout>
  )
}

export default Leaderboard