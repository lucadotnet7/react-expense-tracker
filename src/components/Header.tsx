import { Dispatch } from "react";
import { Activity } from "../models"
import { ActivityActions } from "../reducers/activity/activity-actions.interface";

interface HeaderProps {
    activities: Activity[],
    dispatch: Dispatch<ActivityActions>
}

export default function Header({activities, dispatch}: HeaderProps) {
    const canRestartApp = (): boolean => {
        return activities.length > 0;
    }

    return(
        <header className="bg-lime-600 py-3">
            <div className="max-w-4xl mx-auto flex justify-between items-center">
                <h1 className="text-center text-lg font-bold text-white uppercase">
                Contador de calorías
                </h1>

                <button
                    className="bg-gray-800 hover:bg-gray-900 py-2 px-4 font-bold uppercase text-white cursor-pointer rounded-lg text-sm disabled:opacity-10"
                    disabled={!canRestartApp()}
                    onClick={() => dispatch({type: 'reset-activities', payload: {id: ''}})}>
                    Reiniciar aplicación
                </button>
            </div>
        </header>
    )
};