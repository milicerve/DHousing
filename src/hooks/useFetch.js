import { useEffect, useState } from 'react'

export default function useFetch(url) {
    const [data, setData] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [err, setErr] = useState(null)

    useEffect(() => {
        fetch(url)
        .then((response) =>{
            if(!response.ok) {
                throw (response.status);
            }
            return response.json()
        }).then(data =>{
            setData(data)
            setIsLoaded(true)
            console.log(data);
        }).catch((e)=> {
            setErr(e)
            setIsLoaded(true)
        })
    }, []);
    
    return [data, err, isLoaded];
    
}



