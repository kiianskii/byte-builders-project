import TransactionList from "../../components/TransactionList/TransactionList"
import { useEffect } from 'react'
import { useDispatch } from "react-redux"
import { transactionsCategoriesThunk, userTransactionsThunk } from "../../redux/transactions/operations";



function HomeTab() {

  const dispatch = useDispatch()
    
      useEffect(() => {
    dispatch(userTransactionsThunk())
    dispatch(transactionsCategoriesThunk())
  }, [dispatch]);
  return (
    <div>
      <TransactionList/>
    </div>
  )
}

export default HomeTab