import './App.css';
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [studentsInside, setStudentsInside] = useState(0);

  function isBefore(tm){
    var timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit", hour12: false });
    if( timeNow >= tm ) 
        return true 
    else
        return false
  }

  useEffect(() => {
    const interval = setInterval(() => setStudentsInside(()=>{
      var i = 0;
      data.forEach(d=>{
        if(isBefore(d.checkIn) && !isBefore(d.checkOut)){
          i++;
        }
      })
      return i;
    }), 1000);
    return () => {
      clearInterval(interval);
    };
  }, [data]);

  const onSubmit = (e) => {
    e.preventDefault();
    setData(d=>[...d, {
      name, rollNo, checkIn, checkOut
    }]);
    setName('');
    setRollNo('');
    setCheckIn('');
    setCheckOut('');
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
          <label htmlFor="checkin">Check In: </label>
          <input onChange={(e)=>setCheckIn(e.target.value)} value={checkIn} required type="time" id="checkin" name="checkin" /><br/><br/>
          <label htmlFor="checkout">Check Out: </label>
          <input onChange={(e)=>setCheckOut(e.target.value)} value={checkOut} required type="time" id="checkout" name="checkout" /><br/><br/>
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
              <td>{d.checkOut}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}

export default App;
