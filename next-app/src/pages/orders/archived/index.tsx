import * as React from 'react'
import { GetStaticProps } from 'next'
import { InferGetStaticPropsType } from 'next'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import Content from '@/components/Content'
import { Order } from '@/lib/types'
import styles from '@/styles/pages/Orders.module.scss'


const Archived = ({ orders }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [orderList] = React.useState(orders)
  // const [orderList] = React.useState('') // Cond'tl return test

  if (!orderList) return (
    <div className={styles.container}>
      <Container className={styles.main} component='main'>
        <Typography
          className={styles.noList}
          variant='h2'
          component='div'
        >
          Loading or possibly invalid request..
        </Typography>
      </Container>
    </div>
  )

  return (
    <div className={styles.container}>
      <Container className={styles.main} component='main'>
        <TableContainer className={styles.paper} component={Paper}>
          <Typography
            className={styles.title}
            variant='h2'
            component='h1'
            gutterBottom
          >
            Archived Orders
          </Typography>
          <Table size='small' aria-label='table of orders'>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell align='right'>Date</TableCell>
                <TableCell align='right'>Name</TableCell>
                <TableCell align='right'>Location</TableCell>
                <TableCell align='right'>Card</TableCell>
                <TableCell align='right'>Sale amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderList.map((order: Order) => (
                <TableRow key={order.id}>
                  <Content order={order} />
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async _context => {
  const link = `${process.env.DJANGO_API}`
  const res = await fetch(link)
  const orders: Order[] = await res.json()

  return {
    props: {
      orders,
    },
  }
}

export default Archived
