import MyContext from './utils/MyContext';
import useData from './useData';
import MUITable from './MUITable';
import HomePage from './HomePage';
import MyCollapse from './MyCollapse';

function App() {
  const { empInfo, dispatch, CRUDData } = useData();
  return (
    <div className='App'>
      <MyContext.Provider value={{ empInfo, dispatch, CRUDData }}>
        <br />
        <br />
        <br />
        <MyCollapse />
        {/* <PaginationPage /> */}
        {/* <MUITable /> */}
      </MyContext.Provider>
    </div>
  );
}

export default App;
