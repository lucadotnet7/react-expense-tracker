import { useMemo } from "react";
import { Activity } from "../models";
import CaloriesDisplay from "./CaloriesDisplay";

interface CaloriesTrackerProps {
    activities: Activity[]
}

export default function CaloriesTracker({activities}: CaloriesTrackerProps) {
   
    const consumedCalories = useMemo(() => 
        activities.reduce((total, activity) => 
            activity.category === 1 
                ? total + activity.calories 
                : total
            ,0)
    ,[activities]);

    const burnedCalories = useMemo(() => 
        activities.reduce((total, activity) => 
            activity.category === 2 
                ? total + activity.calories 
                : total
            ,0)
    ,[activities]);


    const totalCalories = useMemo(() =>
        consumedCalories - burnedCalories 
        ,[activities]);

    return(
        <section className="bg-gray-800 py-10">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl font-black text-white text-center">
                    Resumen de Calorías
                </h2>

                <div className="flex flex-col item-center md:flex-row md:justify-between gap-5 mt-10">
                    <CaloriesDisplay
                        calories={consumedCalories}
                        text={'Consumidas'} />

                    <CaloriesDisplay
                        calories={totalCalories}
                        text={'Total de calorías'} />

                    <CaloriesDisplay
                        calories={burnedCalories}
                        text={'Perdidas'} />
                </div>
            </div>
        </section>
    );
}