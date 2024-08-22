import AuthCheck from '../../components/authcheck';
import Transactions from '../../components/transactions';
const TransactionsPage: React.FC = () => {
  return (
    // <AuthCheck> - removing auth check for now 
      <Transactions />
    // </AuthCheck>
  );
};
export default TransactionsPage;