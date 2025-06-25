import { ChangeEvent, Dispatch, FormEvent, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { categories } from '../data/categories';
import { Activity } from '../models/index';
import { ActivityActions } from '../reducers/activity/activity-actions.interface';
import { ActivityState } from '../reducers/activity/activity-state.interface';

interface FormProps {
    dispatch: Dispatch<ActivityActions>;
    state: ActivityState
}

export default function Form({dispatch, state}: FormProps) {
    const initialState: Activity = {
        id: uuidv4(),
        category: 1,
        name: '',
        calories: 0
    }

    const [activity, setActivity] = useState<Activity>(initialState);

    useEffect(() => {
        if(state.activeId) {
            const selectedActivity = state.activities.filter(activity => activity.id === state.activeId);
            
            setActivity(selectedActivity[0]);
        }
    }, [state.activeId]);

    function handleChange(e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) {
        const isNumberField = ['category', 'calories'].includes(e.target.id);

        setActivity({
            ...activity, //mantengo lo que ya tengo en el state
            [e.target.id]: isNumberField 
                                ? +e.target.value 
                                : e.target.value //y agrego el nuevo value
        });
    }

    function validForm(): boolean {
        //trim() quita los valores vacios al inicio y al final
        return (activity.name.trim() !== '' || activity.calories > 0);
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        dispatch({
            type: 'save-activity', 
            payload: { newActivity: activity }
        });

        setActivity(initialState);
    }

    return (
        <section className="bg-lime-500 py-20 px-5">
            <div className="max-w-4xl mx-auto">
                <form
                className="space-y-5 bg-white shadow p-10 rounded-lg"
                onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-3">
                        <label htmlFor="category" className='font-bold'>Categoría:</label>
                        <select 
                            className="border border-slate-300 p-2 rounded-lg w-full bg-white" 
                            id="category"
                            value={activity.category}
                            onChange={handleChange}>
                            {
                                categories.map(category => (
                                    <option 
                                        key={category.id} 
                                        value={category.id}>
                                            {category.name}
                                    </option>
                                ))
                            }
                        </select>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                        <label htmlFor="name" className='font-bold'>Actividad:</label>
                        <input 
                            id="name" 
                            type="text"
                            className='border border-slate-300 p-2 rounded-lg'
                            placeholder='Ej. Comida, Jugo de Naranja, Ensalada, Ejercicio, Pesas, Bicicleta'
                            value={activity.name}
                            onChange={handleChange} />
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                        <label htmlFor="calories" className='font-bold'>Calorías:</label>
                        <input 
                            id="calories" 
                            type="number"
                            className='border border-slate-300 p-2 rounded-lg'
                            placeholder='Calorías. Ej. 300, 500'
                            value={activity.calories}
                            onChange={handleChange} />
                    </div>

                    <input 
                        type="submit" 
                        className='bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10'
                        value={
                            activity.category === 1 
                                ? 'Guardar comida' 
                                : 'Guardar ejercicio' 
                        }
                        disabled={!validForm()} />
                </form>
            </div>
        </section>
    )
}