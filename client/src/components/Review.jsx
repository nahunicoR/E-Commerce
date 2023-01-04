import React from 'react'

function Review() {

     const reviews =[
        {
            description: "es un buen producto lo recomiendo",
            rating: 5,
            
        },
        {
            description : "no es lo que esperaba",
            rating   : 2,
            
        },
        {
            description: "Estéticamente es hermoso y cumple perfectamente lo que promete",
            rating: 4,
            
        },
        {
            description: "Brutal , altamente recomendable",
            rating: 5,
            
        }
    ]

  return (
    <div>{
        reviews && reviews.map((rev) => {
            return <div>
                <p>{rev.description}</p>
                <p>{rev.rating}</p>
            </div>
        })
        }
    </div>
  )
}

export default Review