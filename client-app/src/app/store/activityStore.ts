import { observable, action, computed, configure, runInAction } from 'mobx';
import { createContext, SyntheticEvent } from 'react';
import { IActivity } from '../models/activity';
import agent from '../api/agent';

configure({enforceActions:'always'});

class ActivityStore{

    @observable activityRegistry = new Map();
    @observable activity : IActivity | null = null; 
    @observable loadingInitial = false;
    @observable submitting = false;
    @observable target = '';

    @computed get activitiesByDate(){

        return this.groupActivitiesByDate( Array.from(this.activityRegistry.values()) )
        
    }

    groupActivitiesByDate(activities: IActivity[]){
        
        const sortedActivitie = activities.sort(
            (a,b) => Date.parse(a.date)- Date.parse(b.date)
        )
        return Object.entries(sortedActivitie.reduce( (activities, activity) => {
            const date = activity.date.split('T')[0];
            activities[date] = activities[date] ? [...activities[date], activity] : [activity];
            return activities;
        }, {} as {[key:string]:IActivity[]} ) );
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

    @action loadActivity = async (id:string) => {

        let activity = this.getActivity(id);
        if(activity){
            this.activity = activity;
        } else{
            this.loadingInitial = true;

            try{           
                await agent.Activities.details(id);   
                runInAction( 'getting activity', () => {       
                    this.activity = activity;
                    this.loadingInitial = false;
                })
            }catch(error){
                runInAction( 'getting activity error', () => {
                    console.log(error);
                    this.loadingInitial = false;
                })
            }
        }

        
    }

    @action clearActivity = () => {
        this.activity = null;
    }

    getActivity = (id:string) => {
       return this.activityRegistry.get(id);
    }

    
    @action createActivity = async (activity : IActivity) => {
        this.submitting = true;
        try{
            await agent.Activities.create(activity);
            
            runInAction( 'creating activities error', () => {
                this.activityRegistry.set(activity.id, activity);          
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
        this.activity = this.activityRegistry.get(id);
        
    }
    
    @action editActivity = async (activity : IActivity) =>{
        this.submitting = true;
        try{
            await agent.Activities.update(activity);   
            runInAction( 'editing activities error', () => {       
                this.activityRegistry.set(activity.id, activity);
                this.activity = activity;
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

}

export default createContext(new ActivityStore()) 