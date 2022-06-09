/* eslint-disable @next/next/no-img-element */
import {CalendarComponent} from '@syncfusion/ej2-react-calendars';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { CalendarService } from '../../../pages/api/services/CalendarService';
import { useEffect, useState } from 'react';
import moment from 'moment';
import Skeleton from 'react-loading-skeleton';

export default function RightSidebar(): JSX.Element {
  const dateValue: Date = new Date(new Date().getFullYear(), new Date().getMonth(), 10);
  const minDate: Date = new Date(new Date().getFullYear(), new Date().getMonth(), 6);
  const maxDate: Date = new Date(new Date().getFullYear(), new Date().getMonth(), 25);
  

  let timelineData = [
    {
      activity: `0 Checkout(s)`,
      description: 'Items given to staff'

    },

    {
      activity: `0 Checkin(s)`,
      description: 'Items borrowed back from staff'

    },

    {
      activity: `0 Transfer(s)`,
      description: 'Items given to other org.'

    },

    {
      activity: `0 Asset(s)`,
      description: 'Total items owned'

    },

    {
      activity: `0 Purchase Order(s)`,
      description: 'Total orders made by this org.'

    }
  ]

  const [timeline, setTimeLine] = useState<any>(timelineData)
  const [timelineLoader, setTimelineLoader] = useState(true)
  
  useEffect(() => {
    const loadTimeline = async() => {
      let date = moment(new Date()).format('YYYY-MM-DD')
      const calendarService = new CalendarService()
      let dates: any = await calendarService.getDateStatistics(date)
      setTimeLine([
        {
          activity: `${dates.asset_checkouts.total} Checkout(s)`,
          description: 'Items given to staff'
        },

        {
          activity: `${dates.asset_checkins.total} Checkin(s)`,
          description: 'Items borrowed back from staff'

        },

        {
          activity: `${dates.asset_transfers.total} Transfer(s)`,
          description: 'Items given to other org.'

        },

        {
          activity: `${dates.assets.total} Asset(s)`,
          description: 'Were created'

        },

        {
          activity: `${dates.purchase_orders.total} Purchase Order(s)`,
          description: 'Were made by this org.'

        }
      ])

    setTimelineLoader(false)

    }

    loadTimeline()
  },[timelineLoader])


  const displayDateStats = async (value: any) => {
    setTimelineLoader(true)
    let date = moment(value).format('YYYY-MM-DD')
    const calendarService = new CalendarService()
    let dates: any = await calendarService.getDateStatistics(date)
    setTimeLine([
      {
        activity: `${dates.asset_checkouts.total} Checkout(s)`,
        description: 'Items given to staff'
      },

      {
        activity: `${dates.asset_checkins.total} Checkin(s)`,
        description: 'Items borrowed back from staff'

      },

      {
        activity: `${dates.asset_transfers.total} Transfer(s)`,
        description: 'Items given to other org.'

      },

      {
        activity: `${dates.assets.total} Asset(s)`,
        description: 'Were created'

      },

      {
        activity: `${dates.purchase_orders.total} Purchase Order(s)`,
        description: 'Were made by this org.'

      }
    ])

    setTimelineLoader(false)
    console.log(dates)
  }

    return (
        <div className="bg-white md:h-screen overflow-y-auto top-0 md:sticky p-5 w-full">
           <div>
           <CalendarComponent
             onChange={(e: any)=> displayDateStats(e.value)} cssClass="calendar"></CalendarComponent>
           </div>
           <div>
           <Timeline position="right">
          {
            
          timeline.map((item:any,index:any)=> (

          <TimelineItem key={index}>
            <TimelineSeparator>
              <TimelineDot variant="outlined" color="primary" />
              {
                index !== timeline.length-1 && (
                  <TimelineConnector />
                )
              }
            </TimelineSeparator>
            <TimelineContent>
                  {
                  timelineLoader ? (
                     <div className='flex flex-col'>
                      <Skeleton width={200} height={15}/>
                      <Skeleton width={200} height={15} />
                     </div>

                  ) : (
                    <div>
                    <h6 className="text-primary text-sm">{item.activity}</h6>
                    <p className="text-xs text-gray-500">{item.description}</p>
                    </div>
                    )
                  }
                
            </TimelineContent>
          </TimelineItem>
          )) 
        }
     
    </Timeline>
           </div>
        </div>
    )
}