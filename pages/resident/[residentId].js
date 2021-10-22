import {useLocation} from 'react-router'

function DetailPage() {

    const thisUrl = useLocation()

    return <h1>Unique ID {thisUrl.pathname}</h1>
}

export default DetailPage