import React, { useState } from "react";
import Notecontext from "./Notecontext";


const Notestate =(props)=>{


    const notesinitial=
        
            [
              {
                "_id": "64b1263dfa4b3de8e4ef739b",
                "user": "64b05b3d27745605900e8f94",
                "title": "my note1",
                "description": "my first description",
                "tag": "personal",
                "date": "2023-07-14T10:41:01.208Z",
                "__v": 0
              },
              {
                "_id": "64b12655efb8c2758c85a3b2",
                "user": "64b05b3d27745605900e8f94",
                "title": "my note1",
                "description": "my first description",
                "tag": "personal",
                "date": "2023-07-14T10:41:25.652Z",
                "__v": 0
              },
              {
                "_id": "64b12655efb8c2758c85a3b2",
                "user": "64b05b3d27745605900e8f94",
                "title": "my note1",
                "description": "my first description",
                "tag": "personal",
                "date": "2023-07-14T10:41:25.652Z",
                "__v": 0
              },
              {
                "_id": "64b12655efb8c2758c85a3b2",
                "user": "64b05b3d27745605900e8f94",
                "title": "my note1",
                "description": "my first description",
                "tag": "personal",
                "date": "2023-07-14T10:41:25.652Z",
                "__v": 0
              },
              {
                "_id": "64b12655efb8c2758c85a3b2",
                "user": "64b05b3d27745605900e8f94",
                "title": "my note1",
                "description": "my first description",
                "tag": "personal",
                "date": "2023-07-14T10:41:25.652Z",
                "__v": 0
              },
              {
                "_id": "64b12655efb8c2758c85a3b2",
                "user": "64b05b3d27745605900e8f94",
                "title": "my note1",
                "description": "my first description",
                "tag": "personal",
                "date": "2023-07-14T10:41:25.652Z",
                "__v": 0
              },
              {
                "_id": "64b12655efb8c2758c85a3b2",
                "user": "64b05b3d27745605900e8f94",
                "title": "my note1",
                "description": "my first description",
                "tag": "personal",
                "date": "2023-07-14T10:41:25.652Z",
                "__v": 0
              },
              {
                "_id": "64b12655efb8c2758c85a3b2",
                "user": "64b05b3d27745605900e8f94",
                "title": "my note1",
                "description": "my first description",
                "tag": "personal",
                "date": "2023-07-14T10:41:25.652Z",
                "__v": 0
              },
              {
                "_id": "64b12655efb8c2758c85a3b2",
                "user": "64b05b3d27745605900e8f94",
                "title": "my note1",
                "description": "my first description",
                "tag": "personal",
                "date": "2023-07-14T10:41:25.652Z",
                "__v": 0
              }
            ]
          
   const [notes, setnotes] = useState(notesinitial) 




    return (

        <Notecontext.Provider value={{notes,setnotes}}>
        {props.children}
        </Notecontext.Provider>

    )
    
}


export default Notestate