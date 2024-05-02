import { deleteTransactionThunk } from '../../redux/transactions/operations'
import s from './TransactionItem.module.css'
import { useDispatch } from "react-redux"

function TransactionItem({ transaction }) {
    const dispatch = useDispatch()
  return (
                <tr className={s.rowline}>
                <td className={s.row}>{transaction.transactionDate}</td>
                <td className={s.row}>{transaction.type === "INCOME"? "+":"-"}</td>
                <td className={s.row}>{transaction.categoryId}</td>
                <td className={s.row}>{transaction.comment}</td>
                <td className={s.row}>{transaction.amount}</td>
                <td className={s.row}><button>Edit</button><button onClick={() => dispatch(deleteTransactionThunk(transaction.id))}>Delete</button></td>
                </tr>
  )
}

export default TransactionItem