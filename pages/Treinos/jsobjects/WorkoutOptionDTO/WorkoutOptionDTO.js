export default {
  workoutOptionDTO: {
		id: null,
		created_at: null,
		updated_at: null,
    title: null,
		active: null,
		workout_plan_id: null
  },
	
  loadData(queryResult) {
    this.workoutOptionDTO.id = queryResult.id;
		this.workoutOptionDTO.title = queryResult.title;
		this.workoutOptionDTO.active = queryResult.active;
		this.workoutOptionDTO.workout_plan_id = queryResult.workout_plan_id;
  },

  saveDataFromUI(id, title, active, workout_plan_id) {
    this.workoutOptionDTO.id = id;
		this.workoutOptionDTO.title = title;
		this.workoutOptionDTO.active = active;
		this.workoutOptionDTO.workout_plan_id = workout_plan_id
  },

  clearData() {
    this.workoutOptionDTO.id = null;
		this.workoutOptionDTO.title = null;
		this.workoutOptionDTO.active = null;
		this.workoutOptionDTO.workout_plan_id = null;
  },

  async save() {
    await CreateWorkoutOption.run({
			title: this.workoutOptionDTO.title,
			active: this.workoutOptionDTO.active,
			workout_plan_id: this.workoutOptionDTO.workout_plan_id
    });
  },
	
	  async update() {
    await UpdateWorkoutOption.run({
			id: this.workoutOptionDTO.id,
			title: this.workoutOptionDTO.title,
			active: this.workoutOptionDTO.active,
			workout_plan_id: this.workoutOptionDTO.workout_plan_id
    });
  },
	
		  async delete(id) {
    await DeleteWorkoutOption.run({
			id: id
    });
  }
	
}
