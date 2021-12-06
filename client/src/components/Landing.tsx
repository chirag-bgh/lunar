import { Link } from 'react-router-dom'
import { AuthenticateButton } from "../components/Auth";

const Landing = () => {
  return (
    <div>
      <h1>Landing Page</h1>
      <AuthenticateButton />
      <Link to='dashboard'>Go to Dashboard</Link>
    </div>
  )
}

export default Landing
