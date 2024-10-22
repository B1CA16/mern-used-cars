import { FaCarCrash } from "react-icons/fa"
import NotFound from "../components/NotFound"

const NotExist = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh]">
        <NotFound title="Page Not Found" message="We couldn't find the page you're looking for." buttonText="Back to Start" link="/" />
      </div>
  )
}

export default NotExist
