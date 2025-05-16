import ITrainer from "@/types/ITrainer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TrainerState {
    trainerInfo: ITrainer[];   
}

const initialState: TrainerState = {
    trainerInfo: [],
};

const trainerSlice = createSlice({
    name: "trainer",
    initialState,
    reducers: {
        addTrainer: (state, action: PayloadAction<ITrainer>) => {
            state.trainerInfo.push(action.payload);
        }
    }
})


export const { addTrainer } = trainerSlice.actions;
export default trainerSlice.reducer