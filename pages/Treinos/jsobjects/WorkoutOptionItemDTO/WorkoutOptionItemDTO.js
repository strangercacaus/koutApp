export default {
	workoutOptionItemDTO: {
		id: null,
		created_at: null,
		updated_at: null,
		workout_option_id: null,
		exercise_id: null,
		exercise_name: null,
		exercise_image_url: null,
		exercise_type: null,
		equipment_name: null,
		reps: null,
		sets: null,
		restpause: null,
		load: null,
		incline: null,
		condition: null,
		order: null,
		duration: null,
		active: null
	},

	loadData(queryResult) {
		this.workoutOptionItemDTO.id =  queryResult.id;
		this.workoutOptionItemDTO.created_at =  queryResult.created_at;
		this.workoutOptionItemDTO.updated_at =  queryResult.updated_at;
		this.workoutOptionItemDTO.workout_option_id =  queryResult.workout_option_id;
		this.workoutOptionItemDTO.exercise_id =  queryResult.exercise_id;
		this.workoutOptionItemDTO.exercise_name =  queryResult.exercise_name;
		this.workoutOptionItemDTO.exercise_image_url =  queryResult.exercise_image_url;
		this.workoutOptionItemDTO.exercise_type =  queryResult.exercise_type;
		this.workoutOptionItemDTO.equipment_name =  queryResult.equipment_name;
		this.workoutOptionItemDTO.reps =  queryResult.reps;
		this.workoutOptionItemDTO.sets =  queryResult.sets;
		this.workoutOptionItemDTO.restpause =  queryResult.restpause;
		this.workoutOptionItemDTO.load =  queryResult.load;
		this.workoutOptionItemDTO.incline =  queryResult.incline;
		this.workoutOptionItemDTO.condition =  queryResult.condition;
		this.workoutOptionItemDTO.order =  queryResult.order;
		this.workoutOptionItemDTO.duration =  queryResult.duration;
		this.workoutOptionItemDTO.active =  queryResult.active
	},

	saveDataFromUI(
		id,
		created_at,
		updated_at,
		workout_option_id,
		exercise_id,
		exercise_name,
		exercise_image_url,
		exercise_type,
		equipment_name,
		reps,
		sets,
		restpause,
		load,
		incline,
		condition,
		order,
		duration,
		active
	)
	{
		this.workoutOptionItemDTO.id =  id;
		this.workoutOptionItemDTO.created_at =  created_at;
		this.workoutOptionItemDTO.updated_at =  updated_at;
		this.workoutOptionItemDTO.workout_option_id =  workout_option_id;
		this.workoutOptionItemDTO.exercise_id =  exercise_id;
		this.workoutOptionItemDTO.exercise_name =  exercise_name;
		this.workoutOptionItemDTO.exercise_image_url =  exercise_image_url;
		this.workoutOptionItemDTO.exercise_type =  exercise_type;
		this.workoutOptionItemDTO.equipment_name =  equipment_name;
		this.workoutOptionItemDTO.reps =  reps;
		this.workoutOptionItemDTO.sets =  sets;
		this.workoutOptionItemDTO.restpause =  restpause;
		this.workoutOptionItemDTO.load =  load;
		this.workoutOptionItemDTO.incline =  incline;
		this.workoutOptionItemDTO.condition =  condition;
		this.workoutOptionItemDTO.order =  order;
		this.workoutOptionItemDTO.duration =  duration;
		this.workoutOptionItemDTO.active =  active
	},

	clearData() {
		this.workoutOptionItemDTO.id =  null;
		this.workoutOptionItemDTO.created_at =  null;
		this.workoutOptionItemDTO.updated_at =  null;
		this.workoutOptionItemDTO.workout_option_id =  null;
		this.workoutOptionItemDTO.exercise_id =  null;
		this.workoutOptionItemDTO.exercise_name =  null;
		this.workoutOptionItemDTO.exercise_image_url =  null;
		this.workoutOptionItemDTO.exercise_type =  null;
		this.workoutOptionItemDTO.equipment_name =  null;
		this.workoutOptionItemDTO.reps =  null;
		this.workoutOptionItemDTO.sets =  null;
		this.workoutOptionItemDTO.restpause =  null;
		this.workoutOptionItemDTO.load =  null;
		this.workoutOptionItemDTO.incline =  null;
		this.workoutOptionItemDTO.condition =  null;
		this.workoutOptionItemDTO.order =  null;
		this.workoutOptionItemDTO.duration =  null;
		this.workoutOptionItemDTO.active =  null
	},

	async save() {
		await CreateWorkoutOptionItem.run({
			workout_option_id:this.workoutOptionItemDTO.workout_option_id,
			exercise_id:this.workoutOptionItemDTO.exercise_id,
			exercise_name:this.workoutOptionItemDTO.exercise_name,
			exercise_image_url:this.workoutOptionItemDTO.exercise_image_url,
			exercise_type:this.workoutOptionItemDTO.exercise_type,
			equipment_name:this.workoutOptionItemDTO.equipment_name,
			reps:this.workoutOptionItemDTO.reps,
			sets:this.workoutOptionItemDTO.sets,
			restpause:this.workoutOptionItemDTO.restpause,
			load:this.workoutOptionItemDTO.load,
			incline:this.workoutOptionItemDTO.incline,
			condition:this.workoutOptionItemDTO.condition,
			order:this.workoutOptionItemDTO.order,
			duration:this.workoutOptionItemDTO.duration,
			active:this.workoutOptionItemDTO.active
		});
	},

	async update() {
		await UpdateWorkoutOptionItem.run({
			id:this.workoutOptionItemDTO.id,
			workout_option_id:this.workoutOptionItemDTO.workout_option_id,
			exercise_id:this.workoutOptionItemDTO.exercise_id,
			exercise_name:this.workoutOptionItemDTO.exercise_name,
			exercise_image_url:this.workoutOptionItemDTO.exercise_image_url,
			exercise_type:this.workoutOptionItemDTO.exercise_type,
			equipment_name:this.workoutOptionItemDTO.equipment_name,
			reps:this.workoutOptionItemDTO.reps,
			sets:this.workoutOptionItemDTO.sets,
			restpause:this.workoutOptionItemDTO.restpause,
			load:this.workoutOptionItemDTO.load,
			incline:this.workoutOptionItemDTO.incline,
			condition:this.workoutOptionItemDTO.condition,
			order:this.workoutOptionItemDTO.order,
			duration:this.workoutOptionItemDTO.duration,
			active:this.workoutOptionItemDTO.active
		});
	},

	async delete(id) {
		await DeleteWorkoutPlan.run({
			id: id
		});
	}

}
