import React from 'react'
import { Item, Button, Segment, Icon } from 'semantic-ui-react';
//import ActivityStore from '../../../app/store/activityStore';
import { IActivity } from '../../../app/models/activity';
import { Link } from 'react-router-dom';
import {format} from 'date-fns';

const ActivityListItem : React.FC<{activity:IActivity}> = ({activity}) => {

    //const activityStore =useContext(ActivityStore);
   // const {activitiesByDate, deleteActivity, submitting, target } = activityStore;

    return (

        <Segment.Group key={activity.id}>
            <Segment>
                <Item.Group>
                    <Item>      
                        <Item.Image size='tiny' circular src='/assets/user.png' />     
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>                            
                            <Item.Description>
                                Hosted by Bob               
                            </Item.Description>                        
                        </Item.Content>
                    </Item>
                </Item.Group>                
            </Segment>

            <Segment>
                <Icon name='clock'/> {format(activity.date, 'h:mm a')}
                <Icon name='marker'/>{activity.venue}{activity.city}
            </Segment>
            <Segment secondary>
                Attendees will go here
            </Segment>

            <Segment clearing>
                <span>{activity.description}</span>
                <Button 
                    as={Link} to={`/activities/${activity.id}`}
                    floated='right' 
                    content='View' 
                    color='blue' 
                />
            </Segment>
        </Segment.Group>

        
    )
}

export default ActivityListItem
