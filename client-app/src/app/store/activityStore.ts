import { observable, action, computed, configure, runInAction } from 'mobx';
import { createContext, SyntheticEvent } from 'react';
import { IActivity } from '../models/activity';
import agent from '../api/agent';

configure({enforceActions:'always'});

class ActivityStore{

    @observable activityRegistry = new Map();
    @observable activities:IActivity [] = [];
    @observable selectedActivity : IActivity | undefined; 
    @observable loadingInitial = false;
    @observable editMode = false;
    @observable submitting = false;
    @observable target = '';

    @computed get activitiesByDate(){
        return Array.from(this.activityRegistry.values()).sort((a,b) => Date.parse(a.date)- Date.parse(b.date));
        //return this.activities.sort( (a,b) => Date.parse(a.date)- Date.parse(b.date) )
    }

    @action loadActivities = async () => {

        this.loadingInitial =  true;
        try{
            const activities = await agent.Activities.list();

            runInAction( 'loading activities', () => {
                activities.forEach( (activity) => {
                    activity.date = activity.date.split('.')[0];
                    //this.activities.push(activity);
                    this.activityRegistry.set(activity.id, activity);
                })   
                this.loadingInitial = false;
            })            
        }
        catch(error){
            runInAction( 'loading activities error', () => {
                console.log(error);
            this.loadingInitial = false;
            })            
        }
/*
      agent.Activities.list()    
      .then((activities) => { 
       
        activities.forEach( (activity) => {
          activity.date = activity.date.split('.')[0];
          this.activities.push(activity);
        })           
      } )
      .catch( error => console.log(error) )
      .finally( () => this.loadingInitial = false ) 
*/

    }

    
    @action createActivity = async (activity : IActivity) => {
        this.submitting = true;
        try{
            await agent.Activities.create(activity);
            
            runInAction( 'creating activities error', () => {
                this.activityRegistry.set(activity.id, activity);
                this.editMode = false;
                this.submitting = false;
            })
        }catch(error){
            runInAction( 'creating activities error', () => {
                console.log(error);
                this.submitting = false;
            })
        }
    }

    @action selectActivity = (id:string) =>{
        //this.selectedActivity = this.activities.find( a => a.id === id );
        this.selectedActivity = this.activityRegistry.get(id);
        this.editMode = false
    }
    
    @action editActivity = async (activity : IActivity) =>{
        this.submitting = true;
        try{
            await agent.Activities.update(activity);   
            runInAction( 'editing activities error', () => {       
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.submitting = false;
            })
        }catch(error){
            runInAction( 'editing activities error', () => {
                console.log(error);
                this.submitting = false;
            })
        }
    }

    @action deleteActivity = async (event:SyntheticEvent<HTMLButtonElement>, id:string) =>{ 
        this.submitting = true;
        this.target = event.currentTarget.name;

        try{
            await agent.Activities.delete(id);
            runInAction( 'deleting activities error', () => {
                this.activityRegistry.delete(id);
                this.submitting = false;
                this.target = '';
            })
        }catch(error){
            runInAction( 'deleting activities error', () => {
                console.log(error);
                this.submitting = false;
                this.target = '';
            })
        }
    }

    @action openEditForm = (id:string) =>{                
        this.selectedActivity = this.activityRegistry.get(id);
        this.editMode = true;
    }

    @action cancelSelectedActivity = () =>{                
        this.selectedActivity = undefined;        
    }

    @action cancelOpenForm = () =>{                        
        this.editMode = false;
    }


    @action openCreateForm = () =>{
        debugger;
        this.editMode = true;
        this.selectedActivity = undefined;
    }


    


}

export default createContext(new ActivityStore()) 