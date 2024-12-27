export default {
	workoutItemDTO: {
		id: null,
		created_at: null,
		updated_at: null,
		workout_plan_id: null,
		exercise_id: null,
		reps: null,
		sets: null,
		restpause: null,
		load: null,
		incline: null,
		condition: null,
		order: null,
		duration: null
	},

	loadData(queryResult) {
		this.workoutItemDTO.id =  queryResult.id;
		this.workoutItemDTO.created_at =  queryResult.created_at;
		this.workoutItemDTO.updated_at =  queryResult.updated_at;
		this.workoutItemDTO.workout_plan_id =  queryResult.workout_plan_id;
		this.workoutItemDTO.exercise_id =  queryResult.exercise_id;
		this.workoutItemDTO.reps =  queryResult.reps;
		this.workoutItemDTO.sets =  queryResult.sets;
		this.workoutItemDTO.restpause =  queryResult.restpause;
		this.workoutItemDTO.load =  queryResult.load;
		this.workoutItemDTO.incline =  queryResult.incline;
		this.workoutItemDTO.condition =  queryResult.condition;
		this.workoutItemDTO.order =  queryResult.order;
		this.workoutItemDTO.duration =  queryResult.duration;
	},

	saveDataFromUI(
		id,
		workout_plan_id,
		exercise_id,
		reps,
		sets,
		restpause,
		load,
		incline,
		condition,
		order,
		duration
	)
	{
		this.workoutItemDTO.id =  id;
		this.workoutItemDTO.workout_plan_id =  workout_plan_id;
		this.workoutItemDTO.exercise_id =  exercise_id;
		this.workoutItemDTO.reps =  reps;
		this.workoutItemDTO.sets =  sets;
		this.workoutItemDTO.restpause =  restpause;
		this.workoutItemDTO.load =  load;
		this.workoutItemDTO.incline =  incline;
		this.workoutItemDTO.condition =  condition;
		this.workoutItemDTO.order =  order;
		this.workoutItemDTO.duration =  duration
	},

	clearData() {
		this.workoutItemDTO.id =  null;
		this.workoutItemDTO.created_at =  null;
		this.workoutItemDTO.updated_at =  null;
		this.workoutItemDTO.workout_plan_id =  null;
		this.workoutItemDTO.exercise_id =  null;
		this.workoutItemDTO.reps =  null;
		this.workoutItemDTO.sets =  null;
		this.workoutItemDTO.restpause =  null;
		this.workoutItemDTO.load =  null;
		this.workoutItemDTO.incline =  null;
		this.workoutItemDTO.condition =  null;
		this.workoutItemDTO.order =  null;
		this.workoutItemDTO.duration =  null;
	},

	async save() {
		await CreateWorkoutItem.run({
			workout_plan_id:this.workoutItemDTO.workout_plan_id,
			exercise_id:this.workoutItemDTO.exercise_id,
			reps:this.workoutItemDTO.reps,
			sets:this.workoutItemDTO.sets,
			restpause:this.workoutItemDTO.restpause,
			load:this.workoutItemDTO.load,
			incline:this.workoutItemDTO.incline,
			condition:this.workoutItemDTO.condition,
			order:this.workoutItemDTO.order,
			duration:this.workoutItemDTO.duration
		});
	},
	
	async update() {
		await UpdateWorkoutItem.run({
			id: this.workoutItemDTO.id,
			workout_plan_id: this.workoutItemDTO.workout_plan_id,
			exercise_id:this.workoutItemDTO.exercise_id,
			reps:this.workoutItemDTO.reps,
			sets:this.workoutItemDTO.sets,
			restpause:this.workoutItemDTO.restpause,
			load:this.workoutItemDTO.load,
			incline:this.workoutItemDTO.incline,
			condition:this.workoutItemDTO.condition,
			order:this.workoutItemDTO.order,
			duration:this.workoutItemDTO.duration
		});
	},

	async delete(id) {
		await DeleteWorkoutItem.run({
			id: id
		});
	}

}