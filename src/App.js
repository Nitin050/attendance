import './App.css';
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [studentsInside, setStudentsInside] = useState(0);


  const onSubmit = (e) => {
    e.preventDefault();
    var is_repetition = false;
    data.every(d=>{
      if(d.rollNo == rollNo){
        alert('Roll no. already exist');
        is_repetition = true;
        return false;
      }
    })
    if(!is_repetition){
      var checkInTime = new Date().getHours() + ':' + new Date().getMinutes();
      setData(d=>[...d, {
        name, rollNo, checkIn: checkInTime, checkOut: ''
      }]);
      setStudentsInside(si=>si+1);
    }
    setName('');
    setRollNo('');
  }

  const checkOutFun = (i) => {
    console.log('clicked',i)
    var checkOutTime = new Date().getHours() + ':' + new Date().getMinutes();
    var list_copy = data;
    list_copy[i].checkOut = checkOutTime
    setData([...list_copy]);
    setStudentsInside(si=>si-1);
  }

  return (
    <div className="home">
      <div className='heading'>
        Attendance Dashboard
      </div>
      <div className='form'>
        <form onSubmit={onSubmit}>
          <label htmlFor="name">Name: </label>
          <input onChange={(e)=>setName(e.target.value)} value={name} required type="text" id="name" name="name" /><br/><br/>
          <label htmlFor="rollno">Roll No: </label>
          <input onChange={(e)=>setRollNo(e.target.value)} value={rollNo} required type="number" id="rollno" name="rollno" /><br/><br/>
          <button className='save' type='submit'>
            Save
          </button>
        </form>
      </div>

      <div className='data'>
        <div className='d1'>
          Students in school right now: <b>{studentsInside}</b>
        </div>
        <table>
          <tr>
            <th>Roll No</th>
            <th>Name</th>
            <th>Check In</th>
            <th>Check Out</th>
          </tr>
          {data.map((d,i) => (
            <tr key={i}>
              <td>{d.rollNo}</td>
              <td>{d.name}</td>
              <td>{d.checkIn}</td>
              {d.checkOut ?
                <td>{d.checkOut}</td> 
              :
                <td>
                  <div onClick={()=>checkOutFun(i)} className='checkOutBtn'>Click to Check Out</div>
                </td>
              }
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}

export default App;
