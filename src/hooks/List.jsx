import React, { useMemo, useState } from 'react'

//useMemo is a react hook that can be used to calculate data.
//use case--it can be to filter large list of items
const List = () => {
    const [search, setSearch] = useState('');
    const [count, setCount] = useState(0)
    const students = [
        'Joshua',
        "Tayo",
        "Taiwo",
        "Femi",
        "Anjola",
        "Demi",
        "Esther",
        "Timileyin"
    ];

    const filteredStudent = useMemo(()=>{
        console.log('fethcing....');

        return students.filter(student => 
            student.toLowerCase().includes(search.toLowerCase())
        );
        
    }, [search]);

    // const searching = ()=>{
    //     setSearch(search)
    // }

  return (
    <div>

        <input type="text"
        placeholder="search student"
        value={search}      
        onChange={(e)=> setSearch(e.target.value)} 
        style={{marginBottom: "20px"}} 
        />

        {/* <button onClick={()=> setSearch(search)}>search</button> */}

        {/* <button onClick={()=> setCount(count + 1)}>counter: {count}</button> */}

        {filteredStudent.map((student, index)=> (
            <p key={index}>{student}</p>
        ))}
    </div>
  )
}

export default List