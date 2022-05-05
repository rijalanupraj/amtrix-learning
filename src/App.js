import MyContext from './utils/MyContext';
import useData from './useData';
import MUITable from './MUITable';
import HomePage from './HomePage';

function App() {
  const { empInfo, dispatch, CRUDData } = useData();
  return (
    <div className='App'>
      <MyContext.Provider value={{ empInfo, dispatch, CRUDData }}>
        <HomePage />
        <br />
        <br />
        <br />
        <br />
        {/* <PaginationPage /> */}
        <MUITable />
      </MyContext.Provider>
    </div>
  );
}

export default App;
