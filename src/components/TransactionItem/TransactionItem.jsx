import s from './TransactionItem.module.css'

function TransactionItem({transaction}) {
  return (
                <tr className={s.rowline}>
                <td className={s.row}>{transaction.transactionDate}</td>
                <td className={s.row}>{transaction.type === "INCOME"? "+":"-"}</td>
                <td className={s.row}>{transaction.categoryId}</td>
                <td className={s.row}>{transaction.comment}</td>
                <td className={s.row}>{transaction.amount}</td>
                <td className={s.row}><button>Edit</button></td>
                </tr>
  )
}

export default TransactionItem