
// import { useEffect } from 'react'
import s from './TransactionList.module.css'
import {  useSelector } from 'react-redux'
// import { userTransactionsThunk } from '../../redux/transactions/operations'
import TransactionItem from '../TransactionItem/TransactionItem'
import { selectLoading, selectTransactions } from '../../redux/transactions/slice'

function TransactionList() {

    const transactions = useSelector(selectTransactions)
    const isLoading = useSelector(selectLoading)
    console.log(transactions);
    // const dispatch = useDispatch()

    // useEffect(() => {
    // dispatch(userTransactionsThunk())
    // }, [dispatch])

    if (!transactions.length) {
        return <h3 className={s.header}>No transactions yet</h3>
    } else if (isLoading) {
        return <h3 className={s.header}>Loading, please wait</h3>
    } else {
        return (<table className={s.table}>
            <thead className={s.headline}>
                <tr>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Category</th>
                    <th>Comment</th>
                    <th>Sum</th>
                    <th> </th>
                </tr>
            </thead>
            <tbody>
                {transactions.map((transaction) => {
                    return (<TransactionItem key={transaction.id} transaction={transaction} />)
                })}
            </tbody>
        </table>)
    }
}

export default TransactionList