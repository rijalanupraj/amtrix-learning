import MyTable from './MyTable';
import MyContext from './utils/MyContext';
import useData from './useData';

function App() {
  const { empInfo, dispatch, CRUDData } = useData();
  return (
    <div className='App'>
      <MyContext.Provider value={{ empInfo, dispatch, CRUDData }}>
        <MyTable />
      </MyContext.Provider>
    </div>
  );
}

export default App;
