import { useParams } from "react-router-dom";
import { useEffect } from "react";
import {getUserJob} from "../helpers/jobs";
import JobList from "../Components/JobList";
import AddJob from "../Components/AddJob";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { open, changeStatus, getJobList} from "../features/jobs/jobSlice";

import JobDetail from "../Components/JobDetail";


// type eventType = {
//   target: HTMLElement,
//   preventDefault: () => void,
// }
const hidden = "fixed inset-0 z-50 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
const status = ['saved', 'applied', 'reject', 'phone interview', 'tech interview', 'final interview', 'offered']

function MainPage() {
  const { userId } = useParams()
  const detailOpen = useAppSelector((state) => state.details.open)
  const openStatus = useAppSelector((state) => state.jobs.open)
  const curJob = useAppSelector((state) => state.details.job)
  const jobs = useAppSelector((state) => state.jobs.joblist)
  const dispatch = useAppDispatch()
  //send request to get jobs

  useEffect(() => {
    if (userId !== undefined){
      console.log('in ', userId);
      getUserJob(userId)
        .then(result => {
          console.log('list!!!', result);
          dispatch(getJobList(result))
        })
    }
  }, [dispatch, userId])


  return (
    <div className="flex flex-grow">
      {openStatus &&
       <div className={hidden}><AddJob status={status} toggleOpen={() => dispatch(open())}/></div>
      }
      {detailOpen &&
      <div className={hidden}><JobDetail job={curJob}/></div>
      }
      <div className="relative flex flex-row top-30 p-5 mx-auto snap-y">
        {status.map((type, i) => {
          type = type.split(" ")[0] || type
          return <JobList key={i} status={type} jobs={jobs[type] || []} toggleOpen={() => dispatch(open())} saveType = {() => dispatch(changeStatus(type))}/>
        }

        )}
      </div>
    </div>

  )
}

export default MainPage;
