import React from "react"
import { useState, useEffect, Fragment } from 'react'

import { Container } from 'semantic-ui-react'
import axios from 'axios';
import { IActivity } from '../models/activity';
import NavBar from "../../features/NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";

export const App = () =>  {

 const [ activities, setAtivities ] = useState<IActivity[]>([]);
 const [selectedActivity, setSelectedActivity] = useState<IActivity | null >(null);
 const [editMode, setEditMode] = useState(false);

 const handleselectedActivity = (id:string) => {   
  setSelectedActivity( activities.filter( a => a.id === id )[0] )
  setEditMode(false);
 }

 const handleOpenCreateForm = () => {
  setSelectedActivity(null);
  setEditMode(true);
}

const handleCreateActivity = (activity : IActivity) => {
  setAtivities([...activities, activity]);
  setSelectedActivity(activity);
  setEditMode(false);
}

const handleEditActivity = (activity : IActivity) => {
  setAtivities([...activities.filter( a => a.id !== activity.id ), activity]);
  setSelectedActivity(activity);
  setEditMode(false);

}

const handleDeleteActivity = (id:string) => {
  setAtivities([...activities.filter( a => a.id !== id) ])
}

 useEffect( () => {
       axios.get<IActivity[]>('http://localhost:5000/api/activities')
      .then((response) => { 
        let activities: IActivity[] = [];
        response.data.forEach( activity => {
          activity.date = activity.date.split('.')[0];
          activities.push(activity);
        })
        setAtivities(activities) ;             
      } )
 }, [])
 
    return (
      <Fragment>
        <NavBar openCreateForm={handleOpenCreateForm} ></NavBar>
        <Container style={{marginTop:'7em'}}>
            <ActivityDashboard 
              activities={activities} 
              selectActivity={handleselectedActivity} 
              selectedActivity={selectedActivity} 
              editMode={editMode}
              setEditMode={setEditMode}
              setSelectedActivity={setSelectedActivity}
              createActivity={handleCreateActivity}
              editActivity={handleEditActivity}
              deleteActivity={handleDeleteActivity}
            />
        </Container>
      </Fragment> 
    )
}

export default App
