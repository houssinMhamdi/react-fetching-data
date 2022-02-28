import {useState ,useEffect} from 'react'
import axios from 'axios'
export default function App() {
  const [term ,setTerm] = useState('javascript')
  const [debounceSearch ,setDebounceSearch] = useState(term)
  const [result , setResult] = useState([])





  useEffect(() => {
    const timeOut = setTimeout(()=>setDebounceSearch(term),1000)
    return()=>{
      clearTimeout(timeOut)
    }
  }, [term])


  useEffect(() => {
       const search = async () =>{
        const respond = await axios.get('https://en.wikipedia.org/w/api.php',{
          params:{
            action:'query',
            list:'search',
            origin:'*',
            format:'json',
            srsearch:debounceSearch,

          },

        })
          setResult(respond.data.query.search)
     }
     search()
  }, [debounceSearch])



//   useEffect(()=>{
  

//      if (!result.length) {
//           if(term){
//          search()
//         }
//      }else{
//  const debounceSearch = setTimeout (()=>{
//          if(term){
//          search()
//      }
//      },700)

//      return()=>{
//        clearTimeout(debounceSearch)
//      }
//      }
    
//   },[term,result.length])

  const fetchResult = result.map((el)=>{
    return( 
             <tr  key={el.pageid}>
                <td scope='row'>1</td>
                <td>{el.title}</td>
                <td>
                <span dangerouslySetInnerHTML={{__html:el.snippet}}/>
                </td>
              </tr>
              )
  })

  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <div className='my-3'>
            <label htmlFor='exampleFormControlInput1' className='form-label'>
              Search Input
            </label>
            <input
              type='text'
              className='form-control'
              id='exampleFormControlInput1'
              onChange={(e)=>setTerm(e.target.value)}
              value={term}
            />
          </div>
        </div>
      </div>

      <div className='row'>
        <div className='col'>
          <table className='table'>
            <thead>
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>Title</th>
                <th scope='col'>Desc</th>
              </tr>
            </thead>
            <tbody>
              {fetchResult}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}