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
		this.workoutOptionDTO.created_at = queryResult.created_at;
		this.workoutOptionDTO.updated_at = queryResult.updated_at;
		this.workoutOptionDTO.title = queryResult.title;
		this.workoutOptionDTO.active = queryResult.active;
		this.workoutOptionDTO.workout_plan_id = queryResult.workout_plan_id;
  },

  saveDataFromUI(id, created_at, updated_at, title, active, workout_plan_id) {
    this.workoutOptionDTO.id = id;
		this.workoutOptionDTO.created_at = created_at;
		this.workoutOptionDTO.updated_at = updated_at;
		this.workoutOptionDTO.title = title;
		this.workoutOptionDTO.active = active;
		this.workoutOptionDTO.workout_plan_id = workout_plan_id
  },

  clearData() {
    this.workoutOptionDTO.id = null;
		this.workoutOptionDTO.created_at = null;
		this.workoutOptionDTO.updated_at = null;
		this.workoutOptionDTO.title = null;
		this.workoutOptionDTO.active = null;
		this.workoutOptionDTO.workout_plan_id = null;
  },

  async save() {
    await CreateWorkoutPlan.run({
			title: this.workoutOptionDTO.title,
			active: this.workoutOptionDTO.active,
			workout_plan_id: this.workoutOptionDTO.workout_plan_id
    });
  },
	
	  async update() {
    await UpdateWorkoutPlan.run({
			id: this.workoutOptionDTO.id,
			title: this.workoutOptionDTO.title,
			active: this.workoutOptionDTO.active,
			workout_plan_id: this.workoutOptionDTO.workout_plan_id
    });
  },
	
		  async delete(id) {
    await DeleteWorkoutPlan.run({
			id: id
    });
  }
	
}
