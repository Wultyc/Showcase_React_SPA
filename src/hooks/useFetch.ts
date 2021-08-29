import { useEffect, useState } from "react"

function useFetch<Type>(url: string) {

    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState<Type>()
    const [headers, setHeaders] = useState<any>([])
    const [errors, setErrors] = useState<string | null>(null)

    useEffect(() => {
        const abortCont = new AbortController();

        const fetchData = async () => {

            //await setIsLoading(true)

            const res = await fetch(url, { signal: abortCont.signal })

            if (!res.ok)
                setErrors('Error fetching data from server')

            const resBody = await res.json()
            let resHeaders:any = {}
            Array.from(res.headers.entries())
                 .map(arr => {
                     const key:string = arr[0]
                     const val:string = arr[1]
                     resHeaders[key] = val
                 })

            await setData(resBody)
            await setHeaders(resHeaders)
            await setIsLoading(false)
            await setErrors(null)
        }

        setIsLoading(true)
        
        setTimeout(() => {
            fetchData()
        }, 1000)

        // abort the fetch
        return () => abortCont.abort();
    }, [url])

    return { data, headers, isLoading, errors }
}

export default useFetch